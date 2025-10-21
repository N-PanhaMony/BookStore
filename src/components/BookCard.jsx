import React from 'react'

const BookCard = ({book : 
    {title , author_name ,first_publish_year,cover_i}
}) => {
  return (
    <div className='book-item'>
        <img
            src={cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : '/no-book.png'}
            alt={title || 'Book cover'}
            className="w-full h-[300px] object-cover rounded-xl shadow"
        />
        <div className='mt-4'>
            <h3 className="mt-2 font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{author_name ? author_name.join(', ') : 'Unknown Author'}</p>
            <p className="text-sm text-gray-500">{first_publish_year || 'N/A'}</p>
        </div>
    </div>
  )
}

export default BookCard