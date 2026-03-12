import type { Metadata } from 'next';
import './globals.css';
import { createClient } from '@/lib/supabase/server';
import { logout } from './auth/actions';

export const metadata: Metadata = {
  title: 'Gr8 Impressions Academy | Premium LMS',
  description: 'Learn and grow with Gr8 Impressions Academy courses.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = user ? await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single() : { data: null };

  return (

    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <nav style={{ 
          padding: '1.5rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          background: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            Gr8 <span style={{ color: 'var(--accent)' }}>Academy</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="/" style={{ fontWeight: 500 }}>Home</a>
            <a href="/courses" style={{ fontWeight: 500 }}>Courses</a>
            {user ? (
              <>
                <a href="/dashboard" style={{ fontWeight: 500 }}>My Learning</a>
                {profile?.role === 'admin' && (
                  <a href="/admin" style={{ fontWeight: 500, color: 'var(--accent)' }}>Admin</a>
                )}
                <form action={logout}>
                  <button className="btn-secondary" style={{ padding: '0.5rem 1.2rem' }}>Logout</button>
                </form>
              </>
            ) : (
              <>
                <a href="/login" className="btn-secondary" style={{ padding: '0.5rem 1.2rem' }}>Login</a>
                <a href="/signup" className="btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Join Now</a>
              </>
            )}
          </div>

        </nav>
        <main>{children}</main>
        <footer style={{ 
          padding: '4rem 2rem', 
          textAlign: 'center', 
          background: 'var(--bg-soft)',
          marginTop: '4rem'
        }}>
          <p>© {new Date().getFullYear()} Gr8 Impressions Academy. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Powered by academy.gr8impressions.com
          </p>
        </footer>
      </body>
    </html>
  );
}
