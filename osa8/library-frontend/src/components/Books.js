import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all genres');

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks

  const genres = books.map(book => book.genres).reduce((arr, cur) => [...arr, ...cur], [])
  const uniqueGenres = genres.filter((genre, pos) => genres.indexOf(genre) === pos)

  return (
    <div>
      <h2>Books</h2>
      <p>in genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genre</th>
          </tr>
          {books.filter(book => genre === 'all genres' || book.genres.includes(genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      <button onClick={() => setGenre('all genres')}>all genres</button>
      {uniqueGenres.map(genre =>
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books