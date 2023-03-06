
/**
 * index.js
 * const reducer = combineReducers({
 *  anecdotes: anecdoteReducer,
 *  filter: filterReducer
 * })
 * const store = createStore(reducer)
 * 
 * filterReducer will return updated value back to the store that's defined
 */
const filterReducer = (state = 'ALL', action) => {
  // console.log('filterReducer', state, action)
  switch(action.type) {
    case 'SET_FILTER':
      return action.payload // return the filter value
    default: return ''
  }
}

export const filterChange = filter => {
  // console.log('filterChange', filter)
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer
