import axios from 'axios';

// Helper function to build the search query
const buildSearchQuery = (params) => {
  let query = '';

  if (params.location) {
    query += `+location:${params.location}`;
  }

  if (params.minRepos > 0) {
    query += `+repos:>${params.minRepos}`;
  }

  if (params.followers > 0) {
    query += `+followers:>${params.followers}`;
  }

  return query.startsWith('+') ? query.slice(1) : query;
};

const githubService = {
  // Define the searchUsers method
  searchUsers: async (queryParams) => {
    try {
      const query = buildSearchQuery(queryParams);
      const url = `https://api.github.com/search/users?q=${query}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
};

export default githubService; // Ensure this is exported as default
