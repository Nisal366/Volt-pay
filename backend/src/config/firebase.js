const admin = require("firebase-admin");
const env = require("./env");

function buildCredential() {
  if (env.firebaseServiceAccountBase64) {
    const json = Buffer.from(env.firebaseServiceAccountBase64, "base64").toString("utf8");
    return admin.credential.cert(JSON.parse(json));
  }

  if (env.firebaseProjectId && env.firebaseClientEmail && env.firebasePrivateKey) {
    return admin.credential.cert({
      projectId: env.firebaseProjectId,
      clientEmail: env.firebaseClientEmail,
      privateKey: env.firebasePrivateKey.replace(/\\n/g, "\n")
    });
  }

  // Uses GOOGLE_APPLICATION_CREDENTIALS when it points to serviceAccountKey.json.
  return admin.credential.applicationDefault();
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: buildCredential()
    });
  } catch (error) {
    console.error("\nFirebase Admin SDK failed to initialize.");
    console.error("Set GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json or FIREBASE_SERVICE_ACCOUNT_BASE64.");
    throw error;
  }
}

const db = admin.firestore();
const auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;
const Timestamp = admin.firestore.Timestamp;

module.exports = { admin, db, auth, FieldValue, Timestamp };
