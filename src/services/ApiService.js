const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUserDataFromApi = async () => {
  const response = await fetch(`${BASE_URL}/users/1`);
  const data = await response.json();
  return data;
};

export const fetchUserPostsFromApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=1`);
    const postsData = await response.json();

    // Add a random number of comments to each post
    const postsWithRandomComments = postsData.map((post) => ({
      ...post,
      comments: Math.floor(Math.random() * 100) + 1, // Generate a random number of comments
    }));

    return postsWithRandomComments;
  } catch (error) {
    throw new Error('Error fetching user posts:', error);
  }
};
