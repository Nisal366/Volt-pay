const { db, FieldValue } = require("../src/config/firebase");

async function seedCollection(collectionName, records) {
  const batch = db.batch();

  records.forEach((record) => {
    const ref = db.collection(collectionName).doc(record.id);
    const { id, ...data } = record;
    batch.set(ref, {
      ...data,
      createdAt: FieldValue.serverTimestamp()
    }, { merge: true });
  });

  await batch.commit();
  console.log(`Seeded ${records.length} records into ${collectionName}.`);
}

async function main() {
  await seedCollection("offices", [
    {
      id: "colombo-city",
      name: "CEB Colombo City Office",
      province: "Western",
      district: "Colombo",
      address: "Colombo, Sri Lanka",
      phone: "+94 11 000 0000",
      latitude: 6.9271,
      longitude: 79.8612
    },
    {
      id: "kandy",
      name: "CEB Kandy Office",
      province: "Central",
      district: "Kandy",
      address: "Kandy, Sri Lanka",
      phone: "+94 81 000 0000",
      latitude: 7.2906,
      longitude: 80.6337
    },
    {
      id: "galle",
      name: "CEB Galle Office",
      province: "Southern",
      district: "Galle",
      address: "Galle, Sri Lanka",
      phone: "+94 91 000 0000",
      latitude: 6.0535,
      longitude: 80.2210
    }
  ]);

  await seedCollection("news", [
    {
      id: "solar-tariffs",
      title: "CEB introduces new solar tariffs",
      description: "New solar tariff support for small installations.",
      imageUrl: "/images/solar-banner.png",
      isPublished: true,
      publishedAt: FieldValue.serverTimestamp()
    },
    {
      id: "smart-meter-rollout",
      title: "Smart meter rollout update",
      description: "VOLTPAY smart meter services are prepared for customer account linking and usage monitoring.",
      imageUrl: null,
      isPublished: true,
      publishedAt: FieldValue.serverTimestamp()
    }
  ]);

  console.log("Firestore seed completed.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
