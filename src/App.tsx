// import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import StickyHeadTable from './components/books/books';
import MediaControlCard from './components/booksmarks';
import { useState } from 'react';

function App() {
  const [view, setView] = useState('table');
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <div>
      <Navbar setView={setView} />
      <div className="content">
        {view === 'table' && (
          <StickyHeadTable
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {view === 'cards' && <MediaControlCard bookmarks={bookmarks} />}
      </div>
    </div>
  );
}

export default App;

