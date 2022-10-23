import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
setDoc,
} from "firebase/firestore";
const addTodo = async ({ userId, title, description, status }) => {
try {
await addDoc(collection(db, "todo"), {
user: userId,
title: title,
description: description,
status: status,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const toggleTodoStatus = async ({ docId, status }) => {
try {
const todoRef = doc(db, "todo", docId);
await updateDoc(todoRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteTodo = async (docId) => {
try {
const todoRef = doc(db, "todo", docId);
await deleteDoc(todoRef);
} catch (err) {
console.log(err);
}
};


const editTodo = async (docId) => {
    const docRef = doc(db, 'todo', docId);

    const data = {
        user: "userId",
        title: "title",
        description: "description",
        status: true,
      };

    setDoc(docRef, data, {merge:true})
    .then(docRef => {
        console.log("Edit successful");
    })
    .catch(error => {
        console.log("error")
    })
    };

export { addTodo, toggleTodoStatus, deleteTodo, editTodo };