import { useEffect, useState } from "react";
function LoginScreen({
  isLoginScreenShowing,
  setIsLoginScreenShowing,
  isLoggedIn,
  setIsLoggedIn,
  credentials,
  setCredentials,
  userData,
  setUserData,
  userObject,
  setUserObject,
  setCurrentCity,
  currentCity,
  setFavoriteCity,
  favoriteCity,
}) {
  const handleLogin = () => {
    const filteredUsers = userData.filter(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );
    if (filteredUsers[0]) {
      console.log("filteredUsers: ", filteredUsers);
      setUserObject(filteredUsers[0]);
      setFavoriteCity(filteredUsers[0].favoriteCity);
      console.log("userObject1: ", userObject);
      setIsLoggedIn(true);
    } else {
      alert("Wrong username or password");
    }
  };
  useEffect(() => {
    console.log("userObject: ", userObject);
  }, [userObject]); // This useEffect runs whenever userObject changes

  const handleRegister = async () => {
    if (!credentials.username || !credentials.password) {
      alert("Username and password must have at least one character");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/appUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          favoriteCity: "Prague", // you can replace this with the actual favorite city
        }),
      });

      if (!response.ok) {
        alert("Username already exists");
        throw new Error("HTTP error " + response.status);
        return;
      }

      const data = await response.json();
      console.log("loginscreen data:", data);
    } catch (error) {
      console.error("Error:", error);
      return;
    }

    setUserObject({
      username: credentials.username,
      password: credentials.password,
      favoriteCity: "Prague",
    });
    setIsLoggedIn(true);
  };
  if (isLoggedIn) {
    setIsLoginScreenShowing(false);
    setCurrentCity(userObject.favoriteCity);
    setFavoriteCity(userObject.favoriteCity);
  }
  // console.log("credentials: ", credentials);
  return (
    <>
      <div className="container w-1/3 bg-white rounded-lg text-italic px-4 py-2 border border-blue-300">
        <label className="m-2 font-bold" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
      </div>
      <div className="container w-1/3 bg-white rounded-lg text-italic px-4 py-2 border border-blue-300">
        <label className="m-2 font-bold" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>
      <button
        className="font-bold bg-blue-300 rounded-md hover:shadow-lg m-1 p-1"
        onClick={() => {
          handleLogin();
        }}
      >
        Log In
      </button>
      <button
        className="font-bold bg-blue-300 rounded-md hover:shadow-lg m-1 p-1"
        onClick={() => {
          handleRegister();
        }}
      >
        Register
      </button>
    </>
  );
}

export default LoginScreen;
