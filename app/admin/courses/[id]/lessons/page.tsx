import { createClient } from '@/lib/supabase/server';
import LessonForm from '@/components/courses/LessonForm';

export default async function ManageLessonsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.id)
    .single();

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', params.id)
    .order('order_index', { ascending: true });

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <a href="/admin/courses" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          ← Back to Courses
        </a>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{course.title}</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Manage and organize your recordings for this course.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>Course Content</h3>
          {lessons && lessons.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {lessons.map((lesson: any, index: number) => (
                <div key={lesson.id} className="card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: 'var(--bg-soft)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem' }}>{lesson.title}</h4>
                  </div>
                  <form action={async () => {
                    'use server'
                    const { deleteLesson } = await import('@/app/auth/actions');
                    await deleteLesson(lesson.id, params.id);
                  }}>
                    <button style={{ background: 'none', color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', border: 'none' }}>Delete</button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="card" 
              style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem', 
                border: '2px dashed #ddd', 
                background: 'transparent',
                boxShadow: 'none'
              }}
            >
              <p style={{ color: 'var(--text-muted)' }}>No lessons added yet. Use the form on the right to start adding recordings.</p>
            </div>
          )}
        </div>

        <LessonForm courseId={params.id} />
      </div>
    </div>
  );
}
