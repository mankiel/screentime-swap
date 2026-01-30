'use client'

import { useState } from 'react'
import { createChildProfile } from './actions'

const AVATARS = [
  { id: 'bear', emoji: '🐻', name: 'Bear' },
  { id: 'cat', emoji: '🐱', name: 'Cat' },
  { id: 'dog', emoji: '🐶', name: 'Dog' },
  { id: 'fox', emoji: '🦊', name: 'Fox' },
  { id: 'lion', emoji: '🦁', name: 'Lion' },
  { id: 'panda', emoji: '🐼', name: 'Panda' },
  { id: 'rabbit', emoji: '🐰', name: 'Rabbit' },
  { id: 'unicorn', emoji: '🦄', name: 'Unicorn' },
]

export function OnboardingForm() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      await createChildProfile(formData)
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Failed to create profile. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Child Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Child's Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={50}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your child's name"
        />
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          required
          min={4}
          max={17}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter age (4-17)"
        />
      </div>

      {/* Avatar Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose an Avatar
        </label>
        <div className="grid grid-cols-4 gap-3">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.id}
              type="button"
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAvatar === avatar.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-1">{avatar.emoji}</div>
              <div className="text-xs text-gray-600">{avatar.name}</div>
            </button>
          ))}
        </div>
        <input type="hidden" name="avatar" value={selectedAvatar} required />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !selectedAvatar}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
      </button>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
          <li>We'll create your child's profile with a secure PIN</li>
          <li>Set up default activities (reading, outdoor play, etc.)</li>
          <li>Add starter rewards (bonus screen time)</li>
          <li>You'll see the PIN on the next screen to share with your child</li>
        </ol>
      </div>
    </form>
  )
}
