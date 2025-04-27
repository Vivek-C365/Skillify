import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const addDocument = async (db, collectionName, data) => {
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

export const readDocument = async (
  db,
  collectionName,
  fieldName,
  fieldValue
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", fieldValue)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents.");
    return [];
  } else {
    let results = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id,  doc.data());
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  }
};
