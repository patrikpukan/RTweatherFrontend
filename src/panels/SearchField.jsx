import React, { useState } from 'react'

function SearchField({onSearchFieldChange, searchInput}) {
  

  return (
    <div className="bg-blue-500 rounded-lg text-italic px-4 py-2">
      <input
        type="text" 
        placeholder="Search for a city..."
        value={searchInput}
        onChange={onSearchFieldChange}
      />
    </div>
  )
}

export default SearchField;