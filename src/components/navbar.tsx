import bookIcon from '../../public/bookLogo.svg';
import bookMarkIcon from '../assets/bookMark.svg';
import '../App.css';

function Navbar({ setView }) {
  return (
    <div className="navbar">
      <a href="#" onClick={() => setView('table')}>
        <img src={bookIcon} className="logo book" alt="Book logo" />
      </a>
      <div>
        <label id="search">Search</label>
        <input type="text" id="search" />
      </div>
      <div className="bookMarks">
        <a href="#" onClick={() => setView('cards')}>
          <img src={bookMarkIcon} className="logo bookmark" alt="Bookmark" />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
