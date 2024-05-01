const Searchbar = ({onSearch}) => {
  return (
    <div className="filter">
      <input onChange={onSearch} placeholder="filter shown with" />
    </div>
  );
};

export default Searchbar;
