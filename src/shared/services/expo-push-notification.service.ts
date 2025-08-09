// import { config } from '@config/config';
// import { Injectable } from '@nestjs/common';
// import { Expo, ExpoPushTicket } from 'expo-server-sdk';

// export const expo = new Expo({
//   useFcmV1: true,
//   accessToken: config.pushNotification.token,
// });

// export interface ExpoPushMessage {
//   to: string;
//   sound: string;
//   body: string;
//   data: any;
//   title: string;
// }

// const defaultExpoPushMessage: ExpoPushMessage = {
//   to: '',
//   sound: 'default',
//   body: '',
//   data: {},
//   title: '',
// };

// @Injectable()
// export class ExpoSendPushNotification {
//   private tickets: ExpoPushTicket[];

//   constructor() {
//     this.tickets = [];
//   }

//   async preparePushNotification(
//     tokens: string[],
//     message: Partial<ExpoPushMessage>,
//   ): Promise<ExpoPushMessage[]> {
//     const messages = [];

//     for (const pushToken of tokens) {
//       if (!Expo.isExpoPushToken(pushToken)) {
//         continue;
//       }

//       // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
//       messages.push({
//         ...defaultExpoPushMessage,
//         ...message,
//         to: pushToken,
//       });
//     }

//     return messages;
//   }

//   async sendPushNotification(messages: ExpoPushMessage[]) {
//     const chunks = expo.chunkPushNotifications(messages);
//     const tickets = [];

//     for (const chunk of chunks) {
//       try {
//         const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//         tickets.push(...ticketChunk);
//       } catch (error: unknown) {
//         // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
//         console.error(error);
//       } finally {
//         this.tickets = tickets;
//       }
//     }
//   }
// }

// const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
// (async () => {
//   // Like sending notifications, there are different strategies you could use
//   // to retrieve batches of receipts from the Expo service.
//   for (const chunk of receiptIdChunks) {
//     try {
//       const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
//       console.log(receipts);

//       // The receipts specify whether Apple or Google successfully received the
//       // notification and information about an error, if one occurred.
//       for (const receiptId in receipts) {
//         const { status, message, details } = receipts[receiptId];
//         if (status === 'ok') {
//           continue;
//         } else if (status === 'error') {
//           console.error(
//             `There was an error sending a notification: ${message}`,
//           );
//           if (details && details.error) {
//             // The error codes are listed in the Expo documentation:
//             // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
//             // You must handle the errors appropriately.
//             console.error(`The error code is ${details.error}`);
//           }
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// })();
