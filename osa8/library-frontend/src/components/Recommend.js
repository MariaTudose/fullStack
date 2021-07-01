import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { USER, GENRE_BOOKS } from '../queries'


const Recommend = (props) => {
  const user = useQuery(USER)

  const [getGenreBooks, result] = useLazyQuery(GENRE_BOOKS)
  const [favGenre, setFavGenre] = useState('')
  const [books, setBooks] = useState([])

  
  useEffect(() => {
      if(user.data?.me) {
        setFavGenre(user.data.me.favoriteGenre)
      }
  }, [user, setFavGenre])

  useEffect(() => {
    if (result.data) {
        setBooks(result.data.allBooks)
    } else {
      getGenreBooks({ variables: { genre: favGenre } })

    }
  }, [result, favGenre, getGenreBooks])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genre</th>
          </tr>
          {books.filter(book => book.genres.includes(favGenre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend