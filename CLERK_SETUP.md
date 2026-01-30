# ScreenTime Swap - Clerk Setup Guide

## 🎯 Clerk is Now Configured!

Clerk provides authentication, user management, and session handling for ScreenTime Swap.

## 📝 Setup Steps

### 1. Create a Clerk Account

Visit [https://dashboard.clerk.com](https://dashboard.clerk.com) and create a free account.

### 2. Create a New Application

1. Click "Create Application"
2. Name it "ScreenTime Swap"
3. Select "Email" and "Google" (or other OAuth providers) for sign-in methods
4. Click "Create Application"

### 3. Get Your API Keys

From your Clerk dashboard:

1. Go to **API Keys** in the sidebar
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 4. Update `.env.local`

Replace the placeholder values in `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### 5. Configure Clerk Settings (Optional)

In your Clerk dashboard:

**Paths:**
- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- After sign-in URL: `/parent/dashboard`
- After sign-up URL: `/parent/onboarding`

**Session Settings:**
- Session duration: 7 days (default)
- Require 2FA: Optional

**User & Authentication:**
- Enable: Email addresses
- Optional: Phone numbers, OAuth (Google, Apple, etc.)

## 🏗️ What's Been Set Up

### Files Created/Modified:

1. **`middleware.ts`** - Protects `/parent/*` and `/child/*` routes
2. **`app/layout.tsx`** - Wrapped with `ClerkProvider`
3. **`app/sign-in/[[...sign-in]]/page.tsx`** - Sign-in page
4. **`app/sign-up/[[...sign-up]]/page.tsx`** - Sign-up page  
5. **`lib/auth.ts`** - Helper functions to sync Clerk users with Prisma
6. **`app/page.tsx`** - Home page with smart routing
7. **`app/parent/dashboard/page.tsx`** - Parent dashboard (protected)
8. **`app/parent/onboarding/page.tsx`** - First-time setup flow

### Environment Variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/parent/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/parent/onboarding
```

## 🚀 Testing Authentication

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Visit** [http://localhost:3000](http://localhost:3000)

3. **You'll be redirected to sign-in** (until you add Clerk keys)

4. **After adding keys and signing up:**
   - New users → Redirected to `/parent/onboarding`
   - Existing users with child profiles → `/parent/dashboard`

## 🔐 How Clerk Works with Prisma

1. **User signs up via Clerk** → Clerk creates user account
2. **User is synced to Prisma** → `lib/auth.ts` creates User record with Clerk's `userId`
3. **Child profiles are created** → Linked to Clerk user via foreign key
4. **Authentication flow:**
   - Clerk handles: Sign-up, sign-in, sessions, password reset
   - Prisma stores: User data, child profiles, activities, tokens

## 📚 Key Clerk Features

- ✅ Email/password authentication
- ✅ OAuth (Google, Apple, GitHub, etc.)
- ✅ Session management (automatic token refresh)
- ✅ User profile management UI
- ✅ Password reset emails
- ✅ Email verification
- ✅ 2FA (optional)
- ✅ Organization management (future: family accounts)

## 🔧 Clerk Components You Can Use

```tsx
// User button (profile dropdown)
import { UserButton } from '@clerk/nextjs'
<UserButton afterSignOutUrl="/" />

// Protect client components
import { SignedIn, SignedOut } from '@clerk/nextjs'
<SignedIn>
  <p>This content is visible to signed in users.</p>
</SignedIn>

// Get user in client components
import { useUser } from '@clerk/nextjs'
const { user } = useUser()

// Get user in server components (already implemented)
import { auth, currentUser } from '@clerk/nextjs/server'
const { userId } = await auth()
const user = await currentUser()
```

## 🎨 Customizing Clerk UI

Clerk provides beautiful pre-built components. To customize:

1. Go to **Customization** in Clerk dashboard
2. Upload your logo
3. Choose colors matching your brand
4. Preview changes in real-time

## 🔗 Useful Links

- [Clerk Docs](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Dashboard](https://dashboard.clerk.com)

## ✅ Next Steps

1. **Add Clerk API keys** to `.env.local`
2. **Test sign-up flow** at http://localhost:3000/sign-up
3. **Build onboarding form** in `/app/parent/onboarding/page.tsx`
4. **Create child profile form** with activity/reward setup
5. **Build parent dashboard** with child management

---

**Your database is ready, Clerk is configured, and you're ready to build! 🚀**
