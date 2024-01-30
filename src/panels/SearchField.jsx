import React, { useState } from "react";

function SearchField({ onSearchFieldChange, searchInput }) {
  return (
    <div className="bg-white rounded-lg text-italic px-4 py-2 border border-blue-300">
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchInput}
        onChange={onSearchFieldChange}
      />
    </div>
  );
}

export default SearchField;
