import * as firebase from "firebase";


export const initializeFirebase = () => {
    const config = {
        apiKey: "AIzaSyDbWGGLKPdE1p4vWyoCX8rlK2a1lwacBsE",
        authDomain: "driveline-notification-hub.firebaseapp.com",
        databaseURL: "https://driveline-notification-hub.firebaseio.com",
        projectId: "driveline-notification-hub",
        storageBucket: "driveline-notification-hub.appspot.com",
        messagingSenderId: "408103473999",
        appId: "1:408103473999:web:65a1c3972dfa7301aa2b3a",
        measurementId: "G-ST5MF1RWRX"
    };
    firebase.initializeApp(config);

    const messaging = firebase.messaging();
    messaging.onMessage(payload => {
        navigator.serviceWorker.getRegistration().then((reg) => {
            reg.showNotification('Driveline Notification', payload.notification);
        })
            .catch(console.error)
    })

}


export const askPermissionForNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log("token: ", token);

        localStorage.setItem("notification-token", token);
        return token;
    } catch (errorMsg) {
        console.error(errorMsg);
    }
}