import React from 'react'

const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            rajaa näytettäviä <input value={filter} onChange={handleFilter} />
        </div>
    )
}

export default Filter