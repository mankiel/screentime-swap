import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

export default async function HomePage() {
  const { userId } = await auth()

  // If not authenticated, redirect to sign-in
  if (!userId) {
    redirect('/sign-in')
  }

  // Get user data
  const user = await getCurrentUser()

  // If user has child profiles, go to parent dashboard
  if (user?.childProfiles && user.childProfiles.length > 0) {
    redirect('/parent/dashboard')
  }

  // Otherwise, go to onboarding
  redirect('/parent/onboarding')
}
