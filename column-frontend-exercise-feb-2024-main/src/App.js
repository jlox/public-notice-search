import React, { useEffect, useState } from 'react';
import './App.css';
import { getSearchResults, getAllDocs } from './helpers';
import { Pagination } from '@mui/material';
import _ from 'lodash';

function App() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [snapshot, setSnapshot] = useState([]);
  
  useEffect(() => {
    async function initData() {
      const { count, sortedDataArray } = await getAllDocs();
      setData(sortedDataArray);
      setPageCount(Math.ceil(count / 10));
      setSnapshot(sortedDataArray.slice((page - 1) * 10, (page - 1) * 10 + 10));
    }
    initData();
  }, []);

  useEffect(() => {
    setSnapshot(data.slice((page - 1) * 10, (page - 1) * 10 + 10));
  }, [page, data])
  
  const onSearchClick = async (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (e.target.value !== '' || (e.key === 'Backspace')) {
      setTimeout(async () => {
        setData(await getSearchResults(searchInput));
        setPage(1);
        setPageCount(Math.ceil(data.length / 10));
        setSnapshot(data.slice((page - 1) * 10, (page - 1) * 10 + 10))
      }, 500)
    }
    else {
      // having trouble refactoring to one useEffect (along with initData())
      setTimeout(async () => {
        const { count, sortedDataArray } = await getAllDocs();
        setData(sortedDataArray);
        setPageCount(Math.ceil(count / 10));
        setSnapshot(sortedDataArray.slice((page - 1) * 10, (page - 1) * 10 + 10));
      }, 500);
    }
  };

  const handlePaginationChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  }

  return (
    <div>
      <h1>Public Notice Search Page</h1>

      <form>
        <input type='search' results={5} placeholder={'Search notices'} onChange={(e) => onSearchClick(e)} />
      </form>

      <div class='flex-grid'>
        <div class='header-row'>
          <div class='title'><b>Title</b></div>
          <div class='content'><b>Content</b></div>
          <div class='date'><b>Publication Date</b></div>
        </div>
        { snapshot.length > 0
            ?
              snapshot.map(doc => {
                return (
                  <div class='grid-row'>
                    <div class='title cell'>{doc.title}</div>
                    <div class='content cell'>{doc.content}</div>
                    <div class='date cell'>{doc.publicationDate.toDate().toDateString()}</div>
                  </div>
                )
              })
            :
            (
              <div class='grid-row'>
                'Sorry, no results!'
              </div>
            )
          }
      </div>

      <div class='footer'>
        <Pagination onChange={(e, value) => handlePaginationChange(e, value)} count={pageCount}/>
      </div>
    </div>
  );
}

export default App;
