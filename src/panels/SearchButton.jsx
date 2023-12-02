import React from 'react'

function SearhButton({onClick}) {

  return (
    <div>
      <button className="bg-red-500 rounded-lg text-bold px-4 py-2" onClick={onClick}>Search</button>
    </div>
  )
}

export default SearhButton;