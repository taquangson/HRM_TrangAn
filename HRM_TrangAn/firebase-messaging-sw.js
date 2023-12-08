importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDuMJUVgt8M-Y9fL9v48y1SXxRt-6x1Ei4",
    authDomain: "hrm-trangan.firebaseapp.com",
    projectId: "hrm-trangan",
    storageBucket: "hrm-trangan.appspot.com",
    messagingSenderId: "413438990520",
    appId: "1:413438990520:web:309d76cded0a9dc102bc4d",
    measurementId: "G-K3L0PS9BPE"
};

//const firebaseConfig = {
//    apiKey: "AIzaSyBR6M1t6FQ4WUHLL-aoQ2lNqRNTl-rsUOI",
//    authDomain: "lscloud-9e8a4.firebaseapp.com",
//    projectId: "lscloud-9e8a4",
//    storageBucket: "lscloud-9e8a4.appspot.com",
//    messagingSenderId: "890857056215",
//    appId: "1:890857056215:web:53cd2c55e637af1e0a0d92",
//    measurementId: "G-L0ZZ0CLGWB"
//};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener('push', function (event) {
    console.log("event:push")
    let messageTitle = "MESSAGETITLE"
    let messageBody = "MESSAGEBODY"
    let messageTag = "MESSAGETAG"

    const notificationPromise = self.registration.showNotification(
        messageTitle,
        {
            body: messageBody,
            tag: messageTag
        });

    event.waitUntil(notificationPromise);

}, false);

// If the web application is in the background, setBackGroundMessageHandler is called.
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});


const CACHE_NAME = 'cool-cache';
// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/Assets/',
    '/Content/',
    '/Images/',
    '/Scripts/'
]

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
})