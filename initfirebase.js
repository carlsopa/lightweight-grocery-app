import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyAbjjJBn9tfTlnqalffkcpyc1hJyzB0XUE",
    authDomain: "mobile-grocery-app.firebaseapp.com",
    databaseURL: "https://mobile-grocery-app.firebaseio.com",
    projectId: "mobile-grocery-app",
    storageBucket: "mobile-grocery-app.appspot.com",
    messagingSenderId: "269033476503",
    appId: "1:269033476503:web:063468eb4e4d14e349b4d2"
});
export default firebaseConfig