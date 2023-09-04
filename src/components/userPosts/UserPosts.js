import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchUserPosts, toggleSort } from '../../action/action';
import './userPosts.css';

const UserPosts = () => {
  const dispatch = useDispatch();
  const { loading, userData, postsData, sortByComments,sortByTitles } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserPosts());
  }, [dispatch]);

  const sortPostsByComments = () => {
    dispatch({ type: 'TOGGLE_SORT'});
    const sortedPosts = [...postsData];

    if (sortByComments) {
      // Sort posts in ascending order based on comments
      sortedPosts.sort((a, b) => a.comments - b.comments);
    } else {
      // Sort posts in descending order based on comments
      sortedPosts.sort((a, b) => b.comments - a.comments);
    }
  
    dispatch({ type: 'SORT_POSTS', payload: sortedPosts });
  };
  const sortPostsBytitle = () => {
    dispatch({ type: 'TOGGLE_SORT_BY_TITLE'});
    const sortedPosts = [...postsData];

 
    if (sortByTitles) {
      // Sort posts in ascending order based on titles
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Sort posts in descending order based on titles
      sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
    }
  
    // Dispatch an action to update the sorted posts in the Redux store
    dispatch({ type: 'SORT_POSTS', payload: sortedPosts });
  }

  return (
    <div className="user-posts-container">
    {loading ? (
      <div className="loader">Loading...</div>
    ) : (
      <>
        <div className="user-details">
          <h2>name: {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>City: {userData.address?.city}</p>
        </div>
        <button onClick={sortPostsByComments} className="sort-button">
          Sort by Comments {sortByComments ? '▲' : ' ▼'}
        </button>
        <button onClick={sortPostsBytitle} className="sort-button">
          Sort by Title {sortByTitles ? '▲' : ' ▼'}
        </button>
        <div className="user-posts-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {postsData.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>{post?.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
  );
};

export default UserPosts;

