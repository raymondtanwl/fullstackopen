const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  // console.log('counterReducer action:', action)
  const stateCopy = { ...state }
  switch (action.type) {
  case 'GOOD':
    stateCopy.good += 1
    console.log('stateCopy:', stateCopy)
    return stateCopy
  case 'OK':
    stateCopy.ok += 1
    console.log('stateCopy:', stateCopy)
    return stateCopy
  case 'BAD':
    stateCopy.bad += 1
    console.log('stateCopy:', stateCopy)
    return stateCopy
  case 'ZERO':
    stateCopy.good = 0
    stateCopy.ok = 0
    stateCopy.bad = 0
    console.log('stateCopy:', stateCopy)
    return stateCopy
  default: return stateCopy
  }
}

export default counterReducer
