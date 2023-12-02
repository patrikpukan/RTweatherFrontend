import React, {useState} from 'react'
import SearchField from './SearchField'
import CityCard from './CityCard'
import SearchButton from './SearchButton'

// panel displaying the list of available cities
// the list of cities is an array of objects
// also thank you github copilot u da best bro


function LeftPanel() {

    const [searchInput, setSearchInput] = useState('');
    const [arrayOfCities, setArrayOfCities] = useState([]);
    const [displayCities, setDisplayCities] = useState([]);


    const onSearchFieldChange = (event) => {
        setSearchInput(event.target.value);
      }
    
      const onSearchButtonClick = () => {
        setArrayOfCities(prevCities => {
          let newCities = [...prevCities, searchInput];
          if (newCities.length > maxLengthOfArray) {
            newCities.shift(); // remove the first element
          }
          return newCities;
        });
        setDisplayCities(arrayOfCities);
      }

  const maxLengthOfArray = 4;

    return (
        <>
        <div className="">
            <h1>Left Panel</h1>
        </div>
        <SearchField onSearchFieldChange={onSearchFieldChange} searchInput={searchInput}/>
        <SearchButton onClick={onSearchButtonClick} />
        {arrayOfCities.map((city, index) => <CityCard key={index} city={city} />)}

        </>
        
    )

}

export default LeftPanel;