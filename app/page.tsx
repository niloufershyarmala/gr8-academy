export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        padding: '8rem 2rem', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Abstract background elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'var(--primary)',
          opacity: '0.05',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'var(--accent)',
          opacity: '0.05',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>

        <div className="container">
          <h1 style={{ 
            fontSize: '4rem', 
            marginBottom: '1.5rem', 
            lineHeight: 1.1,
            fontWeight: 800
          }}>
            Unlock Your <span style={{ color: 'var(--primary)' }}>Potential</span> <br/>
            with <span style={{ color: 'var(--accent)' }}>Gr8 Impressions</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-muted)', 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            lineHeight: 1.8
          }}>
            The premium academy for professionals. Access world-class recordings, track your progress, and transform your career today.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a href="/signup" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Start Learning Now
            </a>
            <a href="/courses" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
              Browse Courses
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2.5rem' 
          }}>
            <div className="card">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'rgba(0, 190, 231, 0.1)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'var(--primary)',
                fontSize: '1.5rem'
              }}>
                📺
              </div>
              <h3>HD Recordings</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                High-quality video lessons you can watch at your own pace, anytime, anywhere.
              </p>
            </div>
            <div className="card">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'rgba(228, 0, 127, 0.1)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'var(--accent)',
                fontSize: '1.5rem'
              }}>
                📈
              </div>
              <h3>Progress Tracking</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                Keep track of exactly where you left off and see your growth over time.
              </p>
            </div>
            <div className="card">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'rgba(0, 190, 231, 0.1)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'var(--primary)',
                fontSize: '1.5rem'
              }}>
                🎓
              </div>
              <h3>Premium Certificates</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                Earn recognition for your hard work and achievements within the academy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
