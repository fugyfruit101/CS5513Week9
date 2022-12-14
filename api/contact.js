import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
setDoc,
} from "firebase/firestore";
const addContact = async ({ userId, name, description, phone, email, status }) => {
try {
await addDoc(collection(db, "contact"), {
user: userId,
name: name,
description: description,
phone: phone,
email: email,
status: status,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const toggleContactStatus = async ({ docId, status }) => {
try {
const contactRef = doc(db, "contact", docId);
await updateDoc(contactRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteContact = async (docId) => {
try {
const contactRef = doc(db, "contact", docId);
await deleteDoc(contactRef);
} catch (err) {
console.log(err);
}
};


const editContact = async (docId) => {
    const docRef = doc(db, 'contact', docId);

    const data = {
        user: "userId",
        name: "name",
        description: "description",
        phone: "phone",
        email: "email",
      };

    setDoc(docRef, data, {merge:true})
    .then(docRef => {
        console.log("Edit successful");
    })
    .catch(error => {
        console.log("error")
    })
    };
export { addContact, toggleContactStatus, deleteContact, editContact };