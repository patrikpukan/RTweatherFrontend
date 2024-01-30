import React, { useState, useEffect } from "react";
import SearchField from "./SearchField";
import CityCard from "./CityCard";

// panel displaying the list of available cities

function LeftPanel({
  setCurrentCity,
  currentCity,
  setFavoriteCity,
  favoriteCity,
  isLoggedIn,
  setUserObject,
  userObject,
}) {
  // current search input
  const [searchInput, setSearchInput] = useState("");

  // cities fetched from the backend
  const [fetchedCities, setFetchedCities] = useState([]);

  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (searchInput !== "") {
      const results = fetchedCities.filter((city) =>
        city.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredCities(results);
    } else {
      setFilteredCities([]);
    }
  }, [searchInput, fetchedCities]);

  useEffect(() => {
    fetchCities();
  }, []);

  // fetches the list of cities from the backend
  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/city");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cities = await response.json();
      const cityNames = cities.map((city) => city.cityName);
      setFetchedCities(cityNames);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  //
  const onSearchFieldChange = (event) => {
    setSearchInput(event.target.value);
  };
  const setFavorite = () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to set a favorite city");
      return;
    }
    // Update favoriteCity in the state
    setFavoriteCity(currentCity);
    userObject.favoriteCity = currentCity;
    // Send a PUT request to the backend
    // fetch(`http://localhost:8080/api/appUser/${userObject.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: userObject.id,
    //     username: userObject.username,
    //     password: userObject.password,
    //     favoriteCity: userObject.favoriteCity,
    //   }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.text();
    //   })
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    const queryParams = new URLSearchParams({
      username: userObject.username,
      password: userObject.password,
      favoriteCity: currentCity,
    }).toString();

    fetch(`http://localhost:8080/api/appUser/${userObject.id}?${queryParams}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("User updated successfully");
        setFavoriteCity(currentCity); // Update favoriteCity state only after successful response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-blue-50 rounded-lg shadow font-bold text-gray-700">
      <div className="flex justify-center">
        <h1>Search a city</h1>
      </div>
      <div className="gap-4  rounded-lg  font-bold text-gray-700 m-2 p-6">
        <p>Favorite city: {favoriteCity}</p>
        <button
          className="rounded-lg bg-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
          onClick={setFavorite}
        >
          Set City as favorite
        </button>
        <p>Current city: {currentCity}</p>
        <SearchField
          onSearchFieldChange={onSearchFieldChange}
          searchInput={searchInput}
        />
        {searchInput && (
          <div className="shadow-sm">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className="drop-shadow-md cursor-pointer"
                onClick={() => setCurrentCity(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftPanel;
