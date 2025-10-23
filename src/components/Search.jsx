import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='book-search'>
      <div>
        <img src='/searchh.svg' alt="Search icon" />

        <input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) =>{setSearchTerm(e.target.value)}}
        />
      </div>
    </div>
  )
}

export default Search