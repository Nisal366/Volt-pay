const { Timestamp } = require("../config/firebase");

function serializeFirestoreData(data) {
  if (!data || typeof data !== "object") return data;

  if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  }

  if (Array.isArray(data)) {
    return data.map(serializeFirestoreData);
  }

  const output = {};
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      output[key] = value.toDate().toISOString();
    } else if (value && typeof value === "object") {
      output[key] = serializeFirestoreData(value);
    } else {
      output[key] = value;
    }
  }
  return output;
}

function docToJson(doc) {
  if (!doc.exists) return null;
  return {
    id: doc.id,
    ...serializeFirestoreData(doc.data())
  };
}

function snapshotToArray(snapshot) {
  return snapshot.docs.map(docToJson);
}

module.exports = { docToJson, snapshotToArray, serializeFirestoreData };
