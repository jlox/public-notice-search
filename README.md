# public-notice-search

### Requirements
### Search UI

- [x]  The dashboard should display a search input and a list of notices
- [ ]  The search input should allow users to search for notices by title. Search input should be debounced by 500ms. (Note that Firestore does not support full-text search, so results will be based on exact matches.)
- [x]  The list of notices should be sorted by date of publication in descending order
- [x]  The list of notices should display the title, date of publication, and content preview
- [ ]  The list of notices should be paginated with 10 notices per page
- [ ]  Handle loading and error states gracefully
- [ ]  Design a visually appealing and responsive layout for the dashboard. You can use any CSS framework or library of your choice, or write your own styles.

### Testing

- [ ]  Write tests for the components and utilities in the application

### Bonus (Optional)

- [ ]  Add a filter to search by date of publication
- [ ]  Add routing to view a single notice
- [ ]  Add a form to add new notices with a title, publication date, and content
