import { createClient } from '@/lib/supabase/server';

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="container" style={{ padding: '4rem 2rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
          Explore Our <span style={{ color: 'var(--primary)' }}>Courses</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Start your transformation with our premium recordings.
        </p>
      </div>

      {courses && courses.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {courses.map((course: any) => (
            <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', background: 'var(--bg-soft)', position: 'relative' }}>
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--border)', background: 'linear-gradient(135deg, var(--bg-soft) 0%, #eee 100%)' }}>
                    <span style={{ fontSize: '4rem' }}>📺</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{course.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                  {course.description || 'Master the essential skills for your personal and professional growth.'}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <a href={`/course/${course.id}`} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                    View Course
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>✨</div>
          <h2>Fresh Content Coming Soon!</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto' }}>
            We are currently preparing some incredible course recordings for you. Stay tuned!
          </p>
        </div>
      )}
    </div>
  );
}
