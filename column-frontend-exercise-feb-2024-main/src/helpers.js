import { db } from './db'; // Import this line to use the Firestore database connection
import { collection, query, getDocs, startAt, limit, orderBy } from "firebase/firestore";

export async function getData(start) {
  let q;
  if (start) {
    q = query(collection(db, "notices"), orderBy('publicationDate', 'desc'), startAt(start * 10), limit(10));
  }
  else {
    q = query(collection(db, "notices"), orderBy('publicationDate', 'desc'), limit(10));
  }
  const documents = await getDocs(q);
  let sortedDataArray = [];
  documents.forEach(doc => {
    sortedDataArray.push(doc.data());
  })
  return sortedDataArray;
};

export async function getSearchResults() {

};