import React, { useState, useEffect } from 'react';
import githubService from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Set the query parameters, including location and minRepos
        const queryParams = {
          location: 'San Francisco',  // Filter by location
          minRepos: 10,               // Filter by minimum number of repositories
          followers: 100,             // Filter by minimum number of followers
        };
        
        // Call the searchUsers function
        const data = await githubService.searchUsers(queryParams);
        
        // Set the users data from the response (items array)
        setUsers(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent page reload
        setLoading(true);
        setError(null);
        setUserData(null);

        try {
            const data = await fetchUserData(username);
            setUserData(data);
        } catch (err) {
            setError("Looks like we cant find the user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-component">
            <h1>GitHub User Search</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    required
                />
                <button type="submit">Search</button>
            </form>

            <div class="max-w-4xl mx-auto p-4">
  <form class="bg-white p-6 rounded-lg shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-gray-700">Advanced Search</h2>
    
    
    <div class="flex flex-col">
      <label for="search" class="text-sm font-medium text-gray-600">Search Term</label>
      <input 
        type="text" 
        id="search" 
        name="search" 
        placeholder="Enter search term"
        class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>


    <div class="flex flex-col">
      <label for="location" class="text-sm font-medium text-gray-600">Location</label>
      <input 
        type="text" 
        id="location" 
        name="location" 
        placeholder="Enter location"
        class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    
    <div class="flex flex-col">
      <label for="min-repos" class="text-sm font-medium text-gray-600">Minimum Repositories</label>
      <input 
        type="number" 
        id="min-repos" 
        name="min-repos" 
        min="0"
        placeholder="Enter minimum number of repositories"
        class="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>


    <div>
      <h2>GitHub Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <img src={user.avatar_url} alt={user.login} width="50" />
              <p>{user.login}</p>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>

    <div>
      <button 
        type="submit" 
        class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Search
      </button>
    </div>
  </form>
</div>


            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {userData && (
                <div className="user-info">
                    <img
                        src={userData.avatar_url}
                        alt={`${userData.login}'s avatar`}
                        className="user-avatar"
                        style={{ width: '150px', borderRadius: '50%' }}
                    />
                    <h2>{userData.name || userData.login}</h2>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                        View GitHub Profile
                    </a>
                </div>
            )}

            
        </div>
    );
};

export default Search;
