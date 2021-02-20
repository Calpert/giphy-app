import React, { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState({ search: "", limit: "" })
  const [gifs, setGifs] = useState([])
  const handleSearch = (event) => {
    setSearch({...search, search: event.target.value})
    console.log(search)
  }

  // useEffect(() => console.log(search))

  const handleLimit = (event) => {
    setSearch({ ...search, limit: event.target.value })
    // console.log(limit)

  }

  // useEffect(() => console.log(limit))

  const handleClick = async (event) => {
    // setSearch({...search, limit})
    // setGifs({ search: "", limit: "" })
    event.preventDefault()
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=0HDRbw2oYkpcYiku7zZIKMkpWclRL3v4&q=${search.search}&limit=${search.limit}&offset=0&rating=g&lang=en`
      );
      const gifList = await response.json()
      setGifs([...gifList.data]);
    } catch (err) {

    }
  }
  const allGifs = gifs.map(search => <img src={search.images.original.url} /> )
  return (
    <div className="container">
      <form onClick={handleClick}>
        <input
          placeholder="search"
          type="text"
          value={search.search}
          onChange={handleSearch}
        />
        <input
          placeholder="limit"
          type="number"
          value={search.limit}
          onChange={handleLimit}
        />
        <input
          type="submit"
          value="Submit"
        />
      </form>
      {allGifs}
    </div>
  );
}

export default App;
