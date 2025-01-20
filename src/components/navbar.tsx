import bookIcon from '../../public/bookLogo.svg'
import bookMarkIcon from '../assets/bookMark.svg'
import '../App.css'

function Navbar() {
    return (
        <>
        <div className="navbar">
            <a href="#">
                <img src={bookIcon} className="logo book" alt="Book logo" />
            </a>
            <div className="">
                <label id='search'>Search</label>
                <input type="text" id='search'/>
            </div>
            <div className="bookMarks">
                <a href="#">
                    <img src={bookMarkIcon} className='logo bookmark' alt="Bookmark" />
                </a>
            </div>
        </div>
        </>
    );
}

export default Navbar;
