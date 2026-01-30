import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function ParentDashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // Get the first child (MVP supports single child)
  const child = user.childProfiles?.[0]

  if (!child) {
    redirect('/parent/onboarding')
  }

  // Fetch comprehensive child data
  const childData = await prisma.childProfile.findUnique({
    where: { id: child.id },
    include: {
      tokenBalance: true,
      activityTemplates: {
        where: { isActive: true },
        orderBy: { category: 'asc' }
      },
      rewards: {
        where: { isActive: true },
        orderBy: { tokenCost: 'asc' }
      },
      activityLogs: {
        take: 5,
        orderBy: { loggedAt: 'desc' },
        include: {
          activityTemplate: true
        }
      }
    }
  })

  if (!childData) {
    redirect('/parent/onboarding')
  }

  const categoryColors: Record<string, string> = {
    READING: 'bg-purple-100 text-purple-800',
    OUTDOOR: 'bg-green-100 text-green-800',
    CREATIVE: 'bg-pink-100 text-pink-800',
    HELPING: 'bg-blue-100 text-blue-800',
    LEARNING: 'bg-yellow-100 text-yellow-800',
    CUSTOM: 'bg-gray-100 text-gray-800'
  }

  const rewardTypeColors: Record<string, string> = {
    SCREEN_TIME: 'bg-indigo-100 text-indigo-800',
    CUSTOM_PRIVILEGE: 'bg-orange-100 text-orange-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Parent Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage {childData.name}'s activities and rewards
          </p>
        </div>

        {/* Child Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{childData.avatar}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {childData.name}
              </h2>
              <p className="text-gray-600 mb-4">Age: {childData.age}</p>
              <div className="bg-gray-100 rounded px-4 py-2 inline-block">
                <span className="text-sm text-gray-600">Child PIN: </span>
                <span className="font-mono font-semibold text-gray-900">
                  {childData.pinCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Balance & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Balance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Current Balance
            </h3>
            <p className="text-5xl font-bold text-indigo-600">
              {childData.tokenBalance?.currentBalance || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">tokens</p>
          </div>

          {/* Lifetime Earned */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Lifetime Earned
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {childData.tokenBalance?.lifetimeEarned || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">total tokens</p>
          </div>

          {/* Available Activities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Available Activities
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {childData.activityTemplates.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">activities</p>
          </div>

          {/* Available Rewards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Available Rewards
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {childData.rewards.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">rewards</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recent Activities
          </h2>
          {childData.activityLogs.length === 0 ? (
            <p className="text-gray-500 italic">
              No activities logged yet. Activities will appear here once {childData.name} starts logging.
            </p>
          ) : (
            <div className="space-y-3">
              {childData.activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {log.activityTemplate.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(log.loggedAt).toLocaleString()}
                      {log.timeSpentMinutes && ` • ${log.timeSpentMinutes} minutes`}
                    </p>
                    {log.note && (
                      <p className="text-sm text-gray-500 italic mt-1">
                        "{log.note}"
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-indigo-600">
                      +{log.tokensEarned}
                    </p>
                    <p className="text-xs text-gray-500">tokens</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Templates */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Available Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {childData.activityTemplates.map((activity) => (
              <div
                key={activity.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {activity.name}
                  </h3>
                  {activity.isCustom && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Custom
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${categoryColors[activity.category]}`}>
                    {activity.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {activity.unitType === 'TIME_BASED' ? 'Time-based' : 'Task-based'}
                  </span>
                </div>
                <div className="text-2xl font-bold text-indigo-600">
                  {activity.tokenValuePerUnit} tokens
                </div>
                <p className="text-sm text-gray-500">
                  per {activity.unitType === 'TIME_BASED' ? '30 min' : 'task'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Available Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {childData.rewards.map((reward) => (
              <div
                key={reward.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {reward.name}
                  </h3>
                  {reward.isDefault && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${rewardTypeColors[reward.rewardType]}`}>
                    {reward.rewardType === 'SCREEN_TIME' ? 'Screen Time' : 'Custom Privilege'}
                  </span>
                </div>
                {reward.screenTimeMinutes && (
                  <p className="text-sm text-gray-600 mb-2">
                    {reward.screenTimeMinutes} minutes
                  </p>
                )}
                <div className="text-2xl font-bold text-purple-600">
                  {reward.tokenCost} tokens
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
