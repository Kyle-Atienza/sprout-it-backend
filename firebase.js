const { response } = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-acccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sprout-it-43e51-default-rtdb.firebaseio.com/",
});

const sendMulticastNotification = function (payload) {
  console.log(payload);
  const message = {
    notification: {
      title: payload.title,
      body: payload.body,
      ...payload.data,
    },
    data: {
      title: payload.title,
      body: payload.body,
    },
    apns: {
      payload: {
        aps: {
          sound: "default",
        },
      },
    },
    tokens: payload.tokens,
  };

  return admin.messaging().sendMulticast(message);
};

const firebaseAdmin = { sendMulticastNotification };

module.exports = firebaseAdmin;
