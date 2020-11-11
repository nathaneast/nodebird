export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpdata: {},
    loginData: {},
}

export const login = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

export const logout = () => {
  return {
    type: 'LOG_OUT',
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
          isLoggedIn: true,
          me: action.data,
        }
    case 'LOG_LOG_OUT':
      return {
        ...state,
          isLoggedIn: false,
          me: null,
      }
    default:
      return state;
  }
}

export default reducer;
