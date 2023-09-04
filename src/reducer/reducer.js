

const initialState = {
    loading: true,
    userData: {},
    postsData: [],
    sortByComments: false,
    sortByTitles: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_DATA':
        return { ...state, userData: action.payload };
      case 'FETCH_USER_POSTS':
        return { ...state, postsData: action.payload, loading: false };
      case 'TOGGLE_SORT':
        return { ...state, sortByComments: !state.sortByComments };
        case 'TOGGLE_SORT_BY_TITLE':
          return { ...state, sortByTitles: !state.sortByTitles};
        case 'SORT_POSTS':
          return { ...state, postsData: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  