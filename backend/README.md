# VOLTPAY Backend

Backend API for the VOLTPAY smart electricity web app.

This backend uses:

- Node.js + Express
- Firebase Admin SDK
- Firebase Authentication ID token verification
- Cloud Firestore
- Cloudinary image upload for issue reports/news
- Optional PayHere payment hash endpoint
- Mock payment endpoint for demo/testing

## 1. Project structure

```bash
voltpay-backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── validators/
├── scripts/
│   ├── seedFirestore.js
│   └── setAdmin.js
├── firestore.rules
├── firestore.indexes.json
├── .env.example
└── package.json
```

## 2. Install and run

```bash
cd voltpay-backend
npm install
cp .env.example .env
npm run dev
```

Default backend URL:

```bash
http://localhost:5000
```

Health check:

```bash
http://localhost:5000/api/health
```

## 3. Firebase setup

### Step 1: Create Firebase project

1. Go to Firebase Console.
2. Click **Add project**.
3. Create a project named something like `voltpay`.
4. Disable Google Analytics if you do not need it for the demo.

### Step 2: Enable Authentication

1. Open **Build > Authentication**.
2. Click **Get started**.
3. Enable:
   - Email/Password
   - Google provider, optional
   - Phone provider, optional for OTP login

For this backend, Firebase login happens from the frontend. The frontend sends the Firebase ID token to the backend in the header:

```bash
Authorization: Bearer <firebase_id_token>
```

### Step 3: Create Firestore database

1. Open **Build > Firestore Database**.
2. Click **Create database**.
3. Select test mode first for local testing, then deploy the provided `firestore.rules` before production.
4. Select the closest region available to your deployment.

### Step 4: Generate Firebase Admin service account

1. Open **Project settings**.
2. Go to **Service accounts**.
3. Click **Generate new private key**.
4. Save it as:

```bash
voltpay-backend/serviceAccountKey.json
```

Then update `.env`:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

Do not upload `serviceAccountKey.json` to GitHub.

### Step 5: Seed demo data

```bash
npm run seed
```

This creates demo offices and news records.

### Step 6: Make a user admin

First create the user through Firebase Authentication, then run:

```bash
npm run set-admin -- admin@email.com
```

## 4. Cloudinary setup

Cloudinary is used for image uploads in:

- Report Issue page
- Admin news creation

Steps:

1. Create a Cloudinary account.
2. Go to the Cloudinary dashboard.
3. Copy:
   - Cloud name
   - API key
   - API secret
4. Add them to `.env`:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Without Cloudinary values, normal JSON endpoints will work, but image uploads will fail.

## 5. Optional PayHere setup

This backend includes a PayHere hash endpoint only. It does not complete the full production payment flow.

Add to `.env`:

```bash
PAYHERE_MERCHANT_ID=your_merchant_id
PAYHERE_MERCHANT_SECRET=your_merchant_secret
PAYHERE_CURRENCY=LKR
PAYHERE_SANDBOX=true
```

Endpoint:

```bash
POST /api/payments/payhere/hash
```

Request body:

```json
{
  "orderId": "VP-ORDER-001",
  "amount": 2500,
  "currency": "LKR"
}
```

For the school/university demo, use `/api/payments/mock` first.

## 6. Main API endpoints

### Auth/profile

```bash
POST /api/auth/profile
GET  /api/auth/me
```

### Smart meters

```bash
POST   /api/meters
GET    /api/meters
GET    /api/meters/:id
PATCH  /api/meters/:id/connect
DELETE /api/meters/:id
```

### Usage

```bash
GET  /api/usage/:meterId
POST /api/usage/:meterId/demo-seed
```

### Bills and payments

```bash
GET  /api/bills
POST /api/payments/mock
POST /api/payments/payhere/hash
```

### Reports

```bash
POST  /api/reports
GET   /api/reports/mine
GET   /api/reports/admin/all
PATCH /api/reports/admin/:id/status
```

### News and offices

```bash
GET  /api/news
POST /api/news
GET  /api/offices
```

### Chat/contact

```bash
POST /api/chat
POST /api/contact
```

## 7. Frontend integration example

After Firebase login on the frontend:

```js
const token = await firebaseUser.getIdToken();

const response = await fetch("http://localhost:5000/api/meters", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const data = await response.json();
```

For image uploads:

```js
const form = new FormData();
form.append("issueType", "meter_fault");
form.append("description", "Meter display is not working.");
form.append("image", file);

await fetch("http://localhost:5000/api/reports", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`
  },
  body: form
});
```

## 8. Recommended Firestore collections

```text
users
meters
usageRecords
bills
payments
reports
news
offices
contactMessages
```

## 9. Production notes

Before production:

- Use Firebase Authentication properly in the frontend.
- Deploy strict Firestore rules.
- Never expose Firebase Admin service account keys.
- Use HTTPS.
- Replace mock payment with a fully approved payment gateway integration.
- Add server-side payment notification verification.
- Add audit logs for admin actions.
- Add real CEB account verification if this is connected to actual CEB systems.
