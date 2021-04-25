const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const dbServer = admin.firestore();

export { dbServer };
