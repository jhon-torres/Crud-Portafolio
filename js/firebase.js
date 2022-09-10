// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { 
        getFirestore,
        collection, 
        addDoc,
        getDocs,
        deleteDoc,
        onSnapshot,
        doc,
        getDoc,
        updateDoc
    } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBUTv85yOdxY9g-9H6Riw30NLcb2VFhOas",
authDomain: "contact-form-efab5.firebaseapp.com",
projectId: "contact-form-efab5",
storageBucket: "contact-form-efab5.appspot.com",
messagingSenderId: "571068697699",
appId: "1:571068697699:web:f7bce10e0b4f9b9ee97c56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveContact = ( nombre, email, phone, message) => {
    addDoc(collection(db, 'contacts'), {nombre, email, phone, message});
}

export const getContacts = () => getDocs(collection(db,'contacts'));

export const onGetContacts = (callback) => onSnapshot(collection(db, 'contacts'), callback);

export const deleteContacts = (id) => deleteDoc(doc(db, 'contacts', id));

export const getContact = (id) => getDoc(doc(db, 'contacts',id));

export const updateContact = (id, newFields) => updateDoc(doc(db, 'contacts', id), newFields);
