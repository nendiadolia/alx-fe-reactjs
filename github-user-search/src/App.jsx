import React, { useState } from 'react';
import Search from './components/Search';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUser = async (username) => {
    try {
      setError(null);
      setUserData(null);
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <Search onSearch={fetchUser} />
      {error && <p>{error}</p>}
      {userData && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <h2>{userData.login}</h2>
        </div>
      )}
    </div>
  );
};

export default App;