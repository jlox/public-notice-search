import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './db'; // Import this line to use the Firestore database connection
import { collection, query, where, getDocs } from "firebase/firestore";
import { getData, getSearchResults } from './helpers';
import { Pagination } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  useEffect(() => {
    async function initData() {
      const initialData = await getData();
      setData(initialData);
    }
    initData();
  }, []);
  
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const onSearchClick = () => {
    getSearchResults(searchInput);
  };

  return (
    <p>
      <h1>Public Notice Search Page</h1>

      <form>
        <input type='search' results={5} placeholder={'Search notices'} onChange={handleChange} />
        <button type="submit" onClick={onSearchClick}>Search</button>
      </form>

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

      <Pagination />
    </p>
  );
}

export default App;
