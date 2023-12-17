import React from 'react'

function LoginScreen() {
    return (
      <>
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
    </>
    )
}

export default LoginScreen;
