importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDbWGGLKPdE1p4vWyoCX8rlK2a1lwacBsE",
    authDomain: "driveline-notification-hub.firebaseapp.com",
    databaseURL: "https://driveline-notification-hub.firebaseio.com",
    projectId: "driveline-notification-hub",
    storageBucket: "driveline-notification-hub.appspot.com",
    messagingSenderId: "408103473999",
    appId: "1:408103473999:web:65a1c3972dfa7301aa2b3a",
    measurementId: "G-ST5MF1RWRX"
});

const messaging = firebase.messaging();