import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <div style={{
      width: '260px',
      background: 'var(--white)',
      borderRight: '1px solid rgba(0,0,0,0.1)',
      height: 'calc(100vh - 72px)',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      position: 'sticky',
      top: '72px'
    }}>
      <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>
        Management
      </h3>
      <Link href="/admin" style={{ padding: '0.8rem 1rem', borderRadius: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,190,231,0.05)', color: 'var(--primary)' }}>
        📊 Dashboard
      </Link>
      <Link href="/admin/courses" style={{ padding: '0.8rem 1rem', borderRadius: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        📚 Courses
      </Link>
      <Link href="/admin/users" style={{ padding: '0.8rem 1rem', borderRadius: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        👥 Students
      </Link>
      <Link href="/admin/communication" style={{ padding: '0.8rem 1rem', borderRadius: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        ✉️ Communication
      </Link>
      
      <div style={{ marginTop: 'auto' }}>
        <Link href="/dashboard" style={{ padding: '0.8rem 1rem', borderRadius: '8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          ⬅️ Back to Student View
        </Link>
      </div>
    </div>
  );
}
