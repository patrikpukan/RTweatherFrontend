import { useState, useEffect } from "react";
import LoginScreen from "./panels/LoginScreen.jsx";
import LeftPanel from "./panels/LeftPanel.jsx";
import CentralPanel from "./panels/CentralPanel.jsx";
import RightPanel from "./panels/RightPanel.jsx";

//import 'styles.css'
//import 'App.css'

function App() {
  // user's favorite city, Prague is default value for non logged in users
  const [favoriteCity, setFavoriteCity] = useState("");
  const [isLoginScreenShowing, setIsLoginScreenShowing] = useState(false);
  // current city displayed on panels
  const [currentCity, setCurrentCity] = useState("Prague");
  // is user logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // user's credentials (username and password)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [userData, setUserData] = useState([]);
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/appUser");
        const data = await response.json();
        // console.log("data: ", data);
        setUserData(data);
        // console.log("userData: ", userData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-blue-50">
      {isLoggedIn ? (
        <button
          className="font-bold bg-blue-300 rounded-md hover:shadow-lg m-1 p-1"
          onClick={() => {
            setIsLoggedIn(false);
            setIsLoginScreenShowing(false);
            setCredentials({ username: "", password: "" }); // reset credentials to default state
          }}
        >
          Log Out
        </button>
      ) : (
        <button
          className="font-bold bg-blue-300 rounded-md hover:shadow-lg m-1 p-1"
          onClick={() => {
            if (!isLoginScreenShowing) setIsLoginScreenShowing(true);
          }}
        >
          Log In/Register
        </button>
      )}
      {isLoginScreenShowing ? (
        <LoginScreen
          isLoginScreenShowing={isLoginScreenShowing}
          setIsLoginScreenShowing={setIsLoginScreenShowing}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          credentials={credentials}
          setCredentials={setCredentials}
          userData={userData}
          setUserData={setUserData}
          userObject={userObject}
          setUserObject={setUserObject}
          setCurrentCity={setCurrentCity}
          currentCity={currentCity}
          setFavoriteCity={setFavoriteCity}
          favoriteCity={favoriteCity}
        />
      ) : (
        <>
          <div>
            <p className="font-bold">
              Hello {credentials.username}, have a great day!{" "}
            </p>
            {/* <p>password: {credentials.password} </p> */}
          </div>
          <div className="parent grid grid-cols-3 gap-4 m-2 p-6">
            <LeftPanel
              setCurrentCity={setCurrentCity}
              currentCity={currentCity}
              setFavoriteCity={setFavoriteCity}
              favoriteCity={favoriteCity}
              isLoggedIn={isLoggedIn}
              setUserObject={setUserObject}
              userObject={userObject}
            />
            <CentralPanel currentCity={currentCity} />
            <RightPanel currentCity={currentCity} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
