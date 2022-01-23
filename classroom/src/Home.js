import React from 'react';
import { useUserAuth } from './context/UserAuthContext';

const Home = () => {
  const ctx = useUserAuth();
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
