# Waitlist Form Setup Guide

## Quick Start (5 minutes)

### Step 1: Get Your Web3Forms Access Key
1. Go to https://web3forms.com
2. Enter your email (where you want to receive signups)
3. Click "Create Access Key"
4. Copy the access key you receive

### Step 2: Add Access Key to Code
1. Open `app/landing/page.tsx`
2. Find line with: `access_key: 'YOUR_ACCESS_KEY_HERE'`
3. Replace `'YOUR_ACCESS_KEY_HERE'` with your actual key
4. Save the file

### Step 3: Deploy
```bash
git add app/landing/page.tsx
git commit -m "Add Web3Forms waitlist integration"
git push
```

Vercel will auto-deploy in ~2 minutes.

---

## How It Works

**Web3Forms** is a free email forwarding service:
- No backend code needed
- No database required
- Emails go directly to your inbox
- Works with static sites
- Free up to 250 submissions/month

**What happens when someone signs up:**
1. Form submits to Web3Forms API
2. You get an email with their email address
3. User sees success message
4. No page reload/redirect

---

## Testing Locally

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3001/landing

3. Scroll to waitlist form

4. Enter test email and submit

5. Check your email inbox (the one you used to create the access key)

**Note:** Submissions work immediately - no additional setup needed!

---

## COPPA Compliance

The form includes:
- ✅ "For parents only" disclosure
- ✅ Clear consent text
- ✅ Email only (no child data collected)
- ✅ Transparent purpose ("We'll only email about ScreenTime Swap")

---

## Upgrade Options (Later)

Once you have 50+ signups, consider:

**Option 1: Mailchimp**
- Automated welcome emails
- Segmentation by signup date
- Email campaigns

**Option 2: ConvertKit**
- Landing page builder
- Email sequences
- Creator-friendly

**Option 3: Custom Database**
- Full control
- Advanced analytics
- Integration with your app

For now, Web3Forms is perfect for validation!

---

## Troubleshooting

**Form doesn't submit:**
- Check access key is correct
- Check browser console for errors
- Verify email format is valid

**Not receiving emails:**
- Check spam folder
- Verify email used to create access key
- Check Web3Forms dashboard

**Need help?**
Web3Forms support: https://web3forms.com/support

---

## Current Status

✅ Form is mobile-responsive
✅ Accessible (screen reader friendly)
✅ Prevents double submissions
✅ Validates email format
✅ Shows inline success message
✅ Works without JavaScript (basic HTML form fallback)
✅ COPPA-conscious consent text
✅ No backend required
