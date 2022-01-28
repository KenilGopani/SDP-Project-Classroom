import React, { useState, useContext } from 'react';
import UserAuthContext from './context/user/UserAuthContext';

const Home = () => {
  const ctx = useContext(UserAuthContext);

  const logoutHandler = async () => {
    try {
      await ctx.LogOut();
      console.log('logout');
    } catch (err) {
      console.log(err.message);
    }
  }
  return <div>
      Welcome {ctx.user.displayName}
      <button onClick={logoutHandler}> LogOut</button>
  </div>;
};

export default Home;
