const Search = ({ search }) => {
  function searchTask(e) {
    e.preventDefault();

    const task = e.target.previousElementSibling.value;

    search(task);
  }

  return (
    <form className="search">
      <input
        type="search"
        className="search__input"
        placeholder="Search"
        onChange={ (e) => (e.target.value === '') ? search('') : null }
      />
      <button onClick={ searchTask } className="button button_blue">Search</button>
    </form>
  );
}

export default Search;
