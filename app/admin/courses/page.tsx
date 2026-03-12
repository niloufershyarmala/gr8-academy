import { createClient } from '@/lib/supabase/server';

export default async function AdminCoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Management Courses</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>View and edit your existing courses</p>
        </div>
        <a href="/admin/courses/new" className="btn-primary">+ Create New Course</a>
      </div>

      {courses && courses.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {courses.map((course: any) => (
            <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '160px', background: 'var(--bg-soft)', position: 'relative' }}>
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', height: '100%', color: 'var(--border)' }}>
                    <span style={{ margin: '0 auto', fontSize: '3rem' }}>📺</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                  {course.description || 'No description provided.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href={`/admin/courses/${course.id}`} className="btn-secondary" style={{ flex: 1, textAlign: 'center', fontSize: '0.9rem', padding: '0.5rem' }}>
                    Edit Details
                  </a>
                  <a href={`/admin/courses/${course.id}/lessons`} className="btn-primary" style={{ flex: 1, textAlign: 'center', fontSize: '0.9rem', padding: '0.5rem' }}>
                    Manage Lessons
                  </a>
                </div>
                <form action={async () => {
                  'use server'
                  const { deleteCourse } = await import('@/app/auth/actions');
                  await deleteCourse(course.id);
                }} style={{ marginTop: '1rem' }}>
                  <button className="btn-secondary" style={{ width: '100%', color: '#dc2626', borderColor: '#fecaca' }}>
                    Delete Course
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📚</div>
          <h3>No courses yet</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', marginBottom: '2rem' }}>
            Get started by creating your very first course recording.
          </p>
          <a href="/admin/courses/new" className="btn-primary">Create Your First Course</a>
        </div>
      )}
    </div>
  );
}
