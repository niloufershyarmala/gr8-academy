import { createClient } from '@/lib/supabase/server';
import { updateUserRole } from '@/app/auth/actions';

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name', { ascending: true });

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>User Management</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Change roles and manage access for your students.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-soft)', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Name & Email</th>
              <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Current Role</th>
              <th style={{ padding: '1.2rem 1.5rem', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1.2rem 1.5rem' }}>
                  <div style={{ fontWeight: 600 }}>{user.full_name || 'Anonymous User'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>{user.email}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {user.id.slice(0, 8)}...</div>
                </td>
                <td style={{ padding: '1.2rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: user.role === 'admin' ? 'rgba(228, 0, 127, 0.1)' : 'rgba(0, 190, 231, 0.1)',
                    color: user.role === 'admin' ? 'var(--accent)' : 'var(--primary)',
                    textTransform: 'capitalize'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1.2rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <form action={async (formData: FormData) => {
                      'use server'
                      const { updateUserRole } = await import('@/app/auth/actions');
                      const userId = formData.get('userId') as string;
                      const newRole = formData.get('role') as 'admin' | 'student';
                      await updateUserRole(userId, newRole);
                    }}>
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="role" value={user.role === 'admin' ? 'student' : 'admin'} />
                      <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                        Make {user.role === 'admin' ? 'Student' : 'Admin'}
                      </button>
                    </form>
                    <a href={`/admin/users/${user.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      View Progress
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
