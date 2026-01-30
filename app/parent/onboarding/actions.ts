'use server'

import { prisma } from '@/lib/prisma'
import { getOrCreateUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function createChildProfile(formData: FormData) {
  const user = await getOrCreateUser()

  const name = formData.get('name') as string
  const age = parseInt(formData.get('age') as string)
  const avatar = formData.get('avatar') as string

  // Validate input
  if (!name || name.length > 50) {
    throw new Error('Name is required and must be less than 50 characters')
  }

  if (!age || age < 4 || age > 17) {
    throw new Error('Age must be between 4 and 17')
  }

  if (!avatar) {
    throw new Error('Please select an avatar')
  }

  // Generate random 4-digit PIN
  const pinCode = Math.floor(1000 + Math.random() * 9000).toString()

  // Create child profile
  const childProfile = await prisma.childProfile.create({
    data: {
      parentId: user.id,
      name,
      age,
      avatar,
      pinCode,
    },
  })

  // Create default activity templates
  const defaultActivities = [
    { name: 'Reading', category: 'READING', tokenValuePerUnit: 5, unitType: 'TIME_BASED' },
    { name: 'Outdoor Play', category: 'OUTDOOR', tokenValuePerUnit: 8, unitType: 'TIME_BASED' },
    { name: 'Creative Time', category: 'CREATIVE', tokenValuePerUnit: 6, unitType: 'TIME_BASED' },
    { name: 'Helping Family', category: 'HELPING', tokenValuePerUnit: 10, unitType: 'TASK_BASED' },
    { name: 'Learning Something New', category: 'LEARNING', tokenValuePerUnit: 12, unitType: 'TIME_BASED' },
  ]

  for (const activity of defaultActivities) {
    await prisma.activityTemplate.create({
      data: {
        childId: childProfile.id,
        name: activity.name,
        category: activity.category as any,
        tokenValuePerUnit: activity.tokenValuePerUnit,
        unitType: activity.unitType as any,
        isCustom: false,
      },
    })
  }

  // Create default rewards
  const defaultRewards = [
    { name: '15 Min Bonus Screen Time', tokenCost: 10, rewardType: 'SCREEN_TIME', screenTimeMinutes: 15 },
    { name: '30 Min Bonus Screen Time', tokenCost: 20, rewardType: 'SCREEN_TIME', screenTimeMinutes: 30 },
    { name: '60 Min Bonus Screen Time', tokenCost: 35, rewardType: 'SCREEN_TIME', screenTimeMinutes: 60 },
  ]

  for (const reward of defaultRewards) {
    await prisma.reward.create({
      data: {
        childId: childProfile.id,
        name: reward.name,
        tokenCost: reward.tokenCost,
        rewardType: reward.rewardType as any,
        screenTimeMinutes: reward.screenTimeMinutes,
        isDefault: true,
      },
    })
  }

  // Create token balance
  await prisma.tokenBalance.create({
    data: {
      childId: childProfile.id,
      currentBalance: 0,
      lifetimeEarned: 0,
    },
  })

  redirect('/parent/dashboard')
}
