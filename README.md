[README.md](https://github.com/user-attachments/files/29927116/README.md)
# VOLTPAY Frontend - Firebase Connected Version

This is the full VOLTPAY frontend folder.

It includes:

- Next.js frontend
- Firebase Authentication login/register
- Real admin dashboard connected to backend API
- Real registered users table from Firestore
- Customer dashboard UI
- Smart meter UI
- Usage UI
- Easy Pay UI
- Report/contact/news UI

## 1. Install

```bash
cd voltpay-frontend
npm install
```

## 2. Run backend first

Your backend must run at:

```bash
http://localhost:5000
```

Backend command:

```bash
cd voltpay-backend
npm install
npm run dev
```

## 3. Frontend environment

This ZIP already includes `.env.local` with your Firebase web config:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDu9j-EdaiBUc5Tovs0bliWRFSCKfeSQEk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=voltpay-3554d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=voltpay-3554d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=voltpay-3554d.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=10337066450
NEXT_PUBLIC_FIREBASE_APP_ID=1:10337066450:web:6fcfa6e98c89472f437c0b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LKBY48TE2H
```

## 4. Run frontend

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## 5. Firebase setup required

In Firebase Console:

1. Go to Authentication.
2. Enable Email/Password.
3. Optional: enable Google sign-in.
4. Create a normal customer from the app signup page.
5. Create an admin user in Firebase Authentication.

## 6. Make admin user real

Inside backend:

```bash
npm run set-admin -- admin@voltpay.lk
```

Then login from frontend:

```text
/admin/dashboard
```

or normal login page:

```text
/login
```

Admin users will redirect to:

```text
/admin/dashboard
```

Normal customers will redirect to:

```text
/dashboard
```

## 7. Admin dashboard data

The admin dashboard now calls:

```text
GET /api/admin/dashboard
GET /api/admin/users
```

So it shows real data from Firestore:

- Total users
- Active meters
- Open reports
- Unpaid bills
- Registered users table with name, email, NIC, mobile, and role

## 8. Important

This version is no longer using dummy admin credentials. Admin login only works if:

- backend is running,
- Firebase Auth user exists,
- serviceAccountKey.json is configured in backend,
- `npm run set-admin -- admin@email.com` was executed.
