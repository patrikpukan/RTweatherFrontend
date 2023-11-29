import React, { useState } from 'react'

function SearchField() {
  const [searchInput, setSearchInput] = useState('');

  const onSearchFieldChange = (event) => {
    setSearchInput(event.target.value);
    console.log(searchInput)
  }

  return (
    <div className="rounded-sm to-blue-400">
      <input 
        type="text" 
        placeholder="Search for a city..."
        value={searchInput}
        onChange={onSearchFieldChange}
      />
    </div>
  )
}