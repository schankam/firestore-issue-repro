import * as functions from 'firebase-functions';
import bookingNotifyUsers from './app/bookingNotifyUsers';

export const runBookingNotifyUsers = functions.region('asia-northeast1').pubsub.schedule('*/30 * * * *').onRun(bookingNotifyUsers);
