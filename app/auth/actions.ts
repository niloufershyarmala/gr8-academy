'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for simplicity
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check your email to confirm your account.')
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/dashboard/update-password`,
  })

  if (error) {
    redirect('/forgot-password?error=' + encodeURIComponent(error.message))
  }

  redirect('/forgot-password?message=Password reset link sent! Check your email.')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function createCourse(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    thumbnail_url: formData.get('thumbnail') as string,
  }

  const { data: course, error } = await supabase
    .from('courses')
    .insert(data)
    .select()
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/admin/courses')
  revalidatePath('/courses')
  redirect('/admin/courses')
}

export async function updateUserRole(userId: string, newRole: 'admin' | 'student') {
  const supabase = await createClient()
  
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/users')
}

export async function createLesson(formData: FormData) {
  const supabase = await createClient()
  
  const courseId = formData.get('courseId') as string
  const data = {
    course_id: courseId,
    title: formData.get('title') as string,
    video_url: formData.get('video_url') as string,
    order_index: parseInt(formData.get('order_index') as string || '0'),
  }

  const { error } = await supabase
    .from('lessons')
    .insert(data)

  if (error) throw new Error(error.message)

  revalidatePath(`/admin/courses/${courseId}/lessons`)
  revalidatePath(`/course/${courseId}`)
}

export async function deleteCourse(courseId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/courses')
  revalidatePath('/courses')
}

export async function deleteLesson(lessonId: string, courseId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', lessonId)

  if (error) throw new Error(error.message)

  revalidatePath(`/admin/courses/${courseId}/lessons`)
  revalidatePath(`/course/${courseId}`)
}
