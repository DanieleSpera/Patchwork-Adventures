import * as firebase from 'firebase';

// Initialize Firebase
// Local Config
// const config = {
//     apiKey: "AIzaSyAp6Vrbl3KW8E2fE-A-tI7xCi_ayJm8V5M",
//     authDomain: "multiplayer-8a16f.firebaseapp.com",
//     databaseURL: "https://multiplayer-8a16f.firebaseio.com",
//     projectId: "multiplayer-8a16f",
//     storageBucket: "",
//     messagingSenderId: "961408134887"
// };

// Initialize Firebase
//PatchWork Adventure Config
const config = {
    apiKey: "AIzaSyBtncUNaAPdN06BInqzb-F1EgkxmCdIpYI",
    authDomain: "patchworkadventures-d8270.firebaseapp.com",
    databaseURL: "https://patchworkadventures-d8270.firebaseio.com",
    projectId: "patchworkadventures-d8270",
    storageBucket: "patchworkadventures-d8270.appspot.com",
    messagingSenderId: "444583457218"
};

export const firebaseApp = firebase.initializeApp(config);
export const dbstore = firebase.firestore(firebaseApp);
dbstore.settings({ timestampsInSnapshots: true });
export const  gameSessionCollection = dbstore.collection("gameSessions");


export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');
export const gameSessionsRef = firebase.database().ref('gameSessions');
export const patchWorkDb = firebase.database().ref('patchWorkDb');
export const questionGame = firebase.database().ref('questionGame');
