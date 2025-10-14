import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='book-search'>
      <div>
        <img src='/public/searchh.svg'/>

        <input
          type='text'
          placeholder='Boooook'
          value={searchTerm}
          onChange={(e) =>{setSearchTerm(e.target.value)}}
        />
      </div>
    </div>
  )
}

export default Search