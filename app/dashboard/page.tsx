import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function StudentDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Get enrolled courses and their lessons
  const { data: allCourses } = await supabase
    .from('courses')
    .select('*, lessons(id)');

  // Get user progress
  const { data: userProgress } = await supabase
    .from('user_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .eq('completed', true);

  const completedLessonIds = new Set(userProgress?.map(p => p.lesson_id) || []);

  const coursesWithProgress = allCourses?.map(course => {
    const courseLessons = course.lessons || [];
    const completedCount = courseLessons.filter((l: any) => completedLessonIds.has(l.id)).length;
    const percentage = courseLessons.length > 0 ? Math.round((completedCount / courseLessons.length) * 100) : 0;
    return { ...course, percentage };
  }).filter(c => c.percentage > 0) || [];

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            My <span style={{ color: 'var(--primary)' }}>Learning</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user.user_metadata.full_name || 'Student'}!</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>{user.email}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Student Member</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Continue Watching</h3>
          {coursesWithProgress.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {coursesWithProgress.map((course: any) => (
                <div key={course.id} className="card" style={{ display: 'flex', gap: '1.5rem', padding: '1.2rem' }}>
                  <div style={{ width: '120px', height: '80px', background: 'var(--bg-soft)', borderRadius: '8px', overflow: 'hidden' }}>
                    {course.thumbnail_url && <img src={course.thumbnail_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{course.title}</h4>
                    <div style={{ width: '100%', height: '6px', background: '#eee', borderRadius: '10px', marginTop: '0.8rem', position: 'relative' }}>
                      <div style={{ width: `${course.percentage}%`, height: '100%', background: 'var(--primary)', borderRadius: '10px' }}></div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{course.percentage}% Complete</p>
                  </div>
                  <a href={`/course/${course.id}`} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', alignSelf: 'center' }}>Resume</a>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>You haven't started any courses yet.</p>
              <a href="/courses" className="btn-primary" style={{ marginTop: '1.5rem' }}>Browse Catalog</a>
            </div>
          )}
        </div>

        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>Achievements</h3>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem' }}>🏆</span>
              <div>
                <p style={{ fontWeight: 600 }}>First Login</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You've joined the academy!</p>
              </div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-soft)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>More coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
