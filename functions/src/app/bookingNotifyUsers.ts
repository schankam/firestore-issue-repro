import { db } from './config';

export default async function bookingNotifyUsers(context: any) {
  const now = new Date().getTime();
  const bookingToNotifyOneHourSnapshot = await db.collection(`bookings`)
  .where('offer.time', '>=', now)
  .where('offer.time', '<=', (now + 3660000)) // +61 minutes
  .where('userNotified', '==', false)
  .where('canceled', '==', null)
  .where('lateCancel', '==', null)
  .get();

  const bookingToNotify24HourSnapshot = await db.collection(`bookings`)
  .where('offer.time', '>=', now)
  .where('offer.time', '<=', (now + 86400000))
  .where('userNotified', '==', false)
  .where('canceled', '==', null)
  .where('lateCancel', '==', null)
  .get();

  bookingToNotifyOneHourSnapshot.forEach(async (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
    await db.runTransaction(async (transaction) => {
      const bookingRef = db.doc(`bookings/${doc.id}`);
      const bookingSnapshot = await transaction.get(bookingRef);
      if (bookingSnapshot.exists) {
        await transaction.set(bookingRef, {
          userNotified: true,
        }, { merge: true });
      }
      return new Promise((resolve) => { resolve(); });
    });
  });

  bookingToNotify24HourSnapshot.forEach(async (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
    await db.runTransaction(async (transaction) => {
      const bookingRef = db.doc(`bookings/${doc.id}`);
      const bookingSnapshot = await transaction.get(bookingRef);
      if (bookingSnapshot.exists) {
        await transaction.set(bookingRef, {
          userNotified: true,
        }, { merge: true });
      }
      return new Promise((resolve) => { resolve(); });
    });
  });

  return new Promise((resolve) => { resolve(); });
}
