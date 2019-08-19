import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = functions.config().sa.key;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
  storageBucket: JSON.parse(process.env.FIREBASE_CONFIG).storageBucket,
});

export const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
export const firebaseAuth = admin.auth();
export const storage = admin.storage();
export const messaging = admin.messaging();
