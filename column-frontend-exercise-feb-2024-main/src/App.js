import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './db'; // Import this line to use the Firestore database connection
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const q = query(collection(db, "notices"));
      const documents = await getDocs(q);
      let blah = [];
      documents.forEach(doc => {
        blah.push(doc.data());
      })
      setData(blah);
    };
    getData();
  }, []);
  console.log('data: ', data);
  

  return (
    <p>
      <h1>Public Notice Search Page</h1>
      <input type='search' results={3} placeholder={'Search notices'}></input>
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Publication Date</th>
        </tr>
        </thead>
        <tbody>
          {data.map(doc => {
            console.log('doc.publicationDate: ', doc.publicationDate.toDate());
            return (
              <tr>
                <td>{doc.title}</td>
                <td>{doc.content}</td>
                <td>{doc.publicationDate.toDate().toDateString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </p>
  );
}

export default App;
