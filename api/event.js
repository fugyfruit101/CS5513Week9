import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc, 
setDoc,
} from "firebase/firestore";
const addEvent = async ({ userId, title, deadline, status }) => {
try {
await addDoc(collection(db, "event"), {
user: userId,
title: title,
deadline: deadline,
status: status,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const toggleEventStatus = async ({ docId, status }) => {
try {
const eventRef = doc(db, "event", docId);
await updateDoc(eventRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteEvent = async (docId) => {
try {
const eventRef = doc(db, "event", docId);
await deleteDoc(eventRef);
} catch (err) {
console.log(err);
}
};

const editEvent = async (docId) => {
    const docRef = doc(db, 'event', docId);

    const data = {
        user: "user 0",
        title: "Project 0",
        deadline: "0/0/00",
      };

    setDoc(docRef, data, {merge:true})
    .then(docRef => {
        console.log("Edit successful");
    })
    .catch(error => {
        console.log("error")
    })
    };

export { addEvent, toggleEventStatus, deleteEvent, editEvent };