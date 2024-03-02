import { render, screen } from '@testing-library/react';
import App from './App';
import { getAllDocs, getSearchResults } from './helpers';

test('renders header text', () => {
  render(<App />);
  screen.getByText('Public Notice Search Page');
});

test('getSearchResults', () => {
  // unsure how to mock firestore, so adding pseudocode tests
  // would mock data of course
  // id attemp to mock results of searchResultsQuery to make sure
    // what I am getting from getDocs is expected
  // testing the formatting seems trivial
});

test('getAllDocs', () => {
  // this is basically just getting all documents from the database
  // and formatting - this also seems trivial
});
