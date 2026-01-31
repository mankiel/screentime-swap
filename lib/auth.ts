import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

/**
 * Gets or creates a user in the database based on Clerk authentication
 * This syncs Clerk users with our Prisma database
 */
export async function getOrCreateUser() {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    throw new Error('User not found')
  }

  // Check if user exists in our database
  let user = await prisma.user.findUnique({
    where: { id: userId },
  })

  // Create user if doesn't exist
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        passwordHash: '', // Not needed with Clerk
        subscriptionTier: 'FREE',
      },
    })
  }

  return user
}

/**
 * Gets the current authenticated user from the database
 */
export async function getCurrentUser() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      childProfiles: true,
    },
  })
}
