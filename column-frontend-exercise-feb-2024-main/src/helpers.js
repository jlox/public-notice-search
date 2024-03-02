import { db } from './db'; // Import this line to use the Firestore database connection
import { collection, query, getDocs, where, startAt, limit, orderBy, endAt, offset } from "firebase/firestore";

// Attempt #1 for pagination: DB side
// export async function getData(start) {
//   let q;
//   if (start) {
//     q = query(collection(db, "notices"), orderBy('publicationDate', 'desc'), startAt(start * 10), limit(10));
//   }
//   else {
//     q = query(collection(db, "notices"), orderBy('publicationDate', 'desc'), limit(10));
//   }
//   const documents = await getDocs(q);
//   const lastVisible = documents.docs[documents.docs.length-1];
//   let sortedDataArray = [];
//   documents.forEach(doc => {
//     sortedDataArray.push(doc.data());
//   })
//   return { lastVisible, sortedDataArray };
// };

export async function getSearchResults(searchTerm) {
  try {
    const noticesRef = collection(db, "notices");
    // this returns only notices starting with the search term
    const searchResultsQuery = query(noticesRef, where('content', '>=', searchTerm), where('content', '<=', searchTerm+ '\uf8ff'), orderBy('publicationDate', 'desc'));
    const searchResults = await getDocs(searchResultsQuery);
    let searchResultArray = [];
    searchResults.forEach(doc => {
      searchResultArray.push(doc.data());
    })
    return searchResultArray;
  }
  catch (e) {
    console.error(`Error retrieving search results from database with search term ${searchTerm}: `, e);
    return [];
  }
};


export async function getAllDocs() {
  try {
    const q = query(collection(db, "notices"), orderBy('publicationDate', 'desc'));
    const allDocs = await getDocs(q)
    let sortedDataArray = [];
    allDocs.forEach(doc => {
      sortedDataArray.push(doc.data());
    })
    return { count: sortedDataArray.length, sortedDataArray };
  }
  catch (e) {
    console.error('Error fetching all documents: ', e);
    return { count: 0, sortedDataArray: [] };
  }
}