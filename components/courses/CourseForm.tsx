'use client';

import { useFormStatus } from 'react-dom';
import { createCourse } from '@/app/auth/actions';

function SubmitButton({ initialData }: { initialData?: any }) {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      className="btn-primary" 
      disabled={pending}
    >
      {pending ? 'Saving...' : initialData ? 'Update Course' : 'Create Course'}
    </button>
  );
}

export default function CourseForm({ initialData }: { initialData?: any }) {
  return (
    <form action={createCourse} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Basic Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Course Title</label>
            <input 
              name="title" 
              type="text" 
              required 
              defaultValue={initialData?.title}
              placeholder="e.g. Master Your Communication Skills"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
            <textarea 
              name="description" 
              rows={4}
              defaultValue={initialData?.description}
              placeholder="Tell your students what they will learn..."
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Course Media</h3>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Thumbnail Image URL</label>
          <input 
            name="thumbnail" 
            type="text" 
            defaultValue={initialData?.thumbnail_url}
            placeholder="https://example.com/image.jpg"
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Enter a URL for your course cover image.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <a href="/admin/courses" className="btn-secondary">Cancel</a>
        <SubmitButton initialData={initialData} />
      </div>
    </form>
  );
}
