import { getOrCreateUser } from '@/lib/auth'
import { OnboardingForm } from './onboarding-form'

export default async function OnboardingPage() {
  const user = await getOrCreateUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ScreenTime Swap! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Let's set up your first child profile and get started.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Create Child Profile</h2>
            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
