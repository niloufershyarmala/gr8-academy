import CourseForm from '@/components/courses/CourseForm';

export default function NewCoursePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Create New Course</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Set up the foundation for your new course recordings.</p>
      </div>

      <CourseForm />
    </div>
  );
}
