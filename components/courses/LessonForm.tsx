'use client';

import { useState } from 'react';
import { createLesson } from '@/app/auth/actions';

export default function LessonForm({ courseId }: { courseId: string }) {
  const [videoMethod, setVideoMethod] = useState<'upload' | 'embed'>('upload');

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1.5rem' }}>Add New Lesson</h3>
      <form action={createLesson} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <input type="hidden" name="courseId" value={courseId} />
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Lesson Title</label>
          <input 
            name="title" 
            type="text" 
            required 
            placeholder="e.g. Introduction to the Course"
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
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Video Content</label>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={videoMethod === 'upload'} 
                onChange={() => setVideoMethod('upload')} 
              />
              Upload Video
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                checked={videoMethod === 'embed'} 
                onChange={() => setVideoMethod('embed')} 
              />
              Embed Link (YouTube/Vimeo)
            </label>
          </div>

          {videoMethod === 'upload' ? (
            <div style={{ 
              border: '2px dashed #ddd', 
              borderRadius: '12px', 
              padding: '2.5rem', 
              textAlign: 'center',
              background: 'var(--bg-soft)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📤</div>
              <p style={{ fontWeight: 600 }}>Drag and drop your recording here</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem' }}>MP4, MOV up to 500MB</p>
              <button type="button" className="btn-secondary" style={{ marginTop: '1.5rem', padding: '0.5rem 1.5rem' }}>
                Select File
              </button>
            </div>
          ) : (
            <input 
              name="video_url" 
              type="url" 
              placeholder="https://www.youtube.com/watch?v=..."
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Add Lesson'}
          </button>
        </div>
      </form>
    </div>
  );
}
