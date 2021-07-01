import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";

const Authors = props => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: error => {
      props.notify(error.graphQLErrors[0].message);
    },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const updateAuthor = async e => {
    e.preventDefault();

    if (name && born) {
      editAuthor({ variables: { name, born: parseInt(born) } });

      setName("");
      setBorn("");
    }
  };

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birth year</h3>
      <form onSubmit={updateAuthor}>
        <label>name</label>
        <select value={name} onChange={e => setName(e.target.value)}>
          <option value="">Select value</option>
          {authors.map(author => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <br />
        <label>born</label>
        <input
          type="number"
          value={born}
          onChange={e => setBorn(e.target.value)}
        ></input>
        <br />
        <input type="submit" value="Update"></input>
      </form>
    </div>
  );
};

export default Authors;
