import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function CoursePlayerPage({ 
  params,
  searchParams
}: { 
  params: { id: string },
  searchParams: Promise<{ lesson?: string }>
}) {
  const supabase = await createClient();
  const { lesson: activeLessonId } = await searchParams;

  // 1. Get User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/login');

  // 2. Get Course & Lessons
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

  if (!course || !lessons || lessons.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>Course content not found.</h2>
        <a href="/courses" className="btn-secondary" style={{ marginTop: '2rem' }}>Back to Courses</a>
      </div>
    );
  }

  // 3. Determine Active Lesson
  const activeLesson = activeLessonId 
    ? lessons.find(l => l.id === activeLessonId) || lessons[0]
    : lessons[0];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', minHeight: 'calc(100vh - 72px)' }}>
      {/* Video Side */}
      <div style={{ padding: '3rem', background: '#000', display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#111',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '2rem',
          position: 'relative',
          aspectRatio: '16/9'
        }}>
          {activeLesson.video_url ? (
            activeLesson.video_url.includes('youtube.com') || activeLesson.video_url.includes('youtu.be') ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={activeLesson.video_url.replace('watch?v=', 'embed/')} 
                title={activeLesson.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                src={activeLesson.video_url} 
                controls 
                style={{ width: '100%', height: '100%' }}
              ></video>
            )
          ) : (
            <div style={{ color: 'var(--white)', textAlign: 'center' }}>
              <p>No video available for this lesson.</p>
            </div>
          )}
        </div>
        
        <div style={{ color: 'var(--white)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{activeLesson.title}</h1>
          <p style={{ color: '#aaa' }}>Part of {course.title}</p>
        </div>
      </div>

      {/* Playlist Side */}
      <div style={{ background: 'var(--white)', borderLeft: '1px solid rgba(0,0,0,0.1)', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Course Curriculum</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {lessons.map((lesson: any, index: number) => (
            <a 
              key={lesson.id} 
              href={`/course/${course.id}?lesson=${lesson.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '12px',
                background: lesson.id === activeLesson.id ? 'rgba(0,190,231,0.08)' : 'transparent',
                border: lesson.id === activeLesson.id ? '1px solid var(--primary)' : '1px solid transparent',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: lesson.id === activeLesson.id ? 'var(--primary)' : 'var(--bg-soft)',
                color: lesson.id === activeLesson.id ? 'white' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700
              }}>
                {index + 1}
              </div>
              <span style={{ 
                fontSize: '0.95rem', 
                fontWeight: lesson.id === activeLesson.id ? 600 : 400,
                color: lesson.id === activeLesson.id ? 'var(--text-main)' : 'var(--text-muted)'
              }}>
                {lesson.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
