import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch Stats
  const { count: studentCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: courseCount } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true });

  const { count: lessonsCompleted } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('completed', true);

  // Fetch Recent Courses
  const { data: recentCourses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Overview of your academy's performance</p>
        </div>
        <a href="/admin/courses/new" className="btn-primary">+ Create New Course</a>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Total Students</p>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{studentCount || 0}</h2>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Active Courses</p>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{courseCount || 0}</h2>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Lessons Completed</p>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{lessonsCompleted || 0}</h2>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>Revenue</p>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>$0</h2>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Courses</h3>
        {recentCourses && recentCourses.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentCourses.map((course) => (
              <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{course.title}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Created on {new Date(course.created_at).toLocaleDateString()}</p>
                </div>
                <a href={`/admin/courses/${course.id}/lessons`} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Manage Lessons</a>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>
            No courses found. Click the button above to create your first course!
          </p>
        )}
      </div>
    </div>
  );
}

