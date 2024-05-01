import Searchbar from "./Searchbar";
const Navbar = ({user, onSearch, onClick}) => {
  return (
    <nav>
      {user === null ? (
        <div className="navbar">
          <h2>Phonebook</h2>
          <button>Sign Up</button>
        </div>
      ) : (
        <div className="navbar">
          <h2>Phonebook</h2>
          <Searchbar onSearch={onSearch} />
          <button onClick={onClick}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
