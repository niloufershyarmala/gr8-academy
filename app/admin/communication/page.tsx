import { createClient } from '@/lib/supabase/server';

export default async function AdminCommunicationPage() {
  const supabase = await createClient();

  const { count: studentCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { data: students } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('full_name', { ascending: true });

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Communication Hub</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Send announcements and emails to your {students?.length || 0} students.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Create New Announcement</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>Select Recipients</label>
              <div style={{ 
                maxHeight: '200px', 
                overflowY: 'auto', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                padding: '0.5rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.5rem', borderBottom: '1px solid #eee', cursor: 'pointer', fontWeight: 600 }}>
                  <input type="checkbox" defaultChecked /> Select All Students
                </label>
                {students?.map((student) => (
                  <label key={student.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" value={student.id} />
                    <span>{student.full_name} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({student.email})</span></span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Subject</label>
              <input 
                type="text" 
                placeholder="e.g. New Live Session Added!" 
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
            </div>
            {/* ... rest of the form ... */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message Type</label>
              <select style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ddd', background: 'white' }}>
                <option>Email (All Students)</option>
                <option>Dashboard Announcement</option>
                <option>Both</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message Content</label>
              <textarea 
                rows={8} 
                placeholder="Write your message here..." 
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" className="btn-secondary">Save Draft</button>
              <button type="button" className="btn-primary">Send Now 🚀</button>
            </div>
          </form>
        </div>

        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>Quick Tip</h3>
          <div className="card" style={{ background: 'var(--bg-soft)', border: 'none' }}>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <strong>Personalize your messages!</strong> 🎨<br/><br/>
              Students are 40% more likely to open an email that feels personal. Use their excitement for the next lesson to keep them engaged. 
            </p>
          </div>
          
          <h3 style={{ margin: '2rem 0 1rem 0' }}>Recent History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Welcome to Gr8 Academy!</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sent to 2 students • March 12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
