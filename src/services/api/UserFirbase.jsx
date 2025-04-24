import { collection, addDoc } from "firebase/firestore";

export const addTeacher = async (db, collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      data,
    });

    console.log("Document written with ID: ", docRef.id);
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
