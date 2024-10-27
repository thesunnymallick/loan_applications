import { createSlice } from '@reduxjs/toolkit';

const loadAuthInfo = () => {
  try {
    const savedAuthInfo = localStorage.getItem('authInfo');
    return savedAuthInfo ? JSON.parse(savedAuthInfo) : {
      isLoggedIn: false,
      token: null,
      role: null,
      userData: {
        name:"",
        email:"",
        userPhoto:"",
      },
    };
  } catch (error) {
    console.warn("Failed to load auth info from localStorage:", error);
    return {
      isLoggedIn: false,
      token: null,
      role: null,
      userData: {
        name:"",
        email:"",
        userPhoto:"",
      },
    };
  }
};

const initialState = loadAuthInfo();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.role = action.payload?.role;
       state.userData.email = action.payload.admin.email;

      // Save entire auth info to local storage
      localStorage.setItem('authInfo', JSON.stringify(state));
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.role = null;
      state.userData.name=null;
      state.userData.email=null;
      state.userData.userPhoto=null;

      // Remove auth info from local storage
      localStorage.removeItem('authInfo');
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
