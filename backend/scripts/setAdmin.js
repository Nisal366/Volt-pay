const { auth, db, FieldValue } = require("../src/config/firebase");

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error("Usage: npm run set-admin -- admin@email.com");
    process.exit(1);
  }

  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, { admin: true });

  await db.collection("users").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    role: "admin",
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });

  console.log(`${email} is now an admin.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
