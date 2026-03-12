import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function StudentProgressPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // Fetch student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!profile) return redirect('/admin/users');

  // Fetch all courses and their lessons
  const { data: courses } = await supabase
    .from('courses')
    .select(`
      id,
      title,
      lessons (
        id,
        title,
        order_index
      )
    `)
    .order('created_at', { ascending: false });

  // Fetch student progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', params.id);

  const completedLessonIds = new Set(progress?.filter(p => p.completed).map(p => p.lesson_id) || []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <a href="/admin/users" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          ← Back to Students
        </a>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{profile.full_name}'s <span style={{ color: 'var(--primary)' }}>Progress</span></h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Detailed breakdown of course completion and activity.</p>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {courses?.map((course) => {
          const courseLessons = course.lessons || [];
          const completedCount = courseLessons.filter(l => completedLessonIds.has(l.id)).length;
          const percentage = courseLessons.length > 0 ? Math.round((completedCount / courseLessons.length) * 100) : 0;

          return (
            <div key={course.id} className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>{course.title}</h3>
                <span style={{ 
                  background: 'var(--bg-soft)', 
                  padding: '0.4rem 1rem', 
                  borderRadius: '20px', 
                  fontSize: '0.9rem', 
                  fontWeight: 700,
                  color: percentage === 100 ? '#166534' : 'var(--primary)'
                }}>
                  {percentage}% Complete
                </span>
              </div>

              <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '10px', marginBottom: '2rem', overflow: 'hidden' }}>
                <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--primary)', transition: 'width 1s ease-in-out' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {courseLessons.map((lesson) => (
                  <div key={lesson.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem', 
                    padding: '0.8rem', 
                    background: 'var(--bg-soft)', 
                    borderRadius: '8px',
                    opacity: completedLessonIds.has(lesson.id) ? 1 : 0.6
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>
                      {completedLessonIds.has(lesson.id) ? '✅' : '⚪'}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{lesson.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
