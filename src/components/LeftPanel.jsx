import React from 'react'
import SearchField from './SearchField'
import CityCard from './CityCard'

// panel displaying the list of available cities
// the list of cities is an array of objects


function LeftPanel() {


  const arrayOfCities = [];
  const maxLengthOfArray = 4;

    return (
        <>
        <div className="">
            <h1>Left Panel</h1>
        </div>
        <SearchField />
        {/* <CityCard />
        <CityCard/>
        <CityCard/> */}

        </>
        
    )

}

export default LeftPanel