import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addDate = async ({ userId, project, deadline, status }) => {
try {
await addDoc(collection(db, "date"), {
user: userId,
project: project,
deadline: deadline,
status: status,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const toggleDateStatus = async ({ docId, status }) => {
try {
const dateRef = doc(db, "date", docId);
await updateDoc(dateRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteDate = async (docId) => {
try {
const dateRef = doc(db, "date", docId);
await deleteDoc(dateRef);
} catch (err) {
console.log(err);
}
};
export { addDate, toggleDateStatus, deleteDate };