import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const loadAuthInfo = () => {
  try {
    const savedAuthInfo = localStorage.getItem('authInfo');
    return savedAuthInfo ? JSON.parse(savedAuthInfo) : {
      isLoggedIn: false,
      token: null,
      status:"",
      role: null,
      subscription_name:"",
      wallet_balance:"00.00",
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
      status:"",
      role: null,
      subscription_name:"",
      wallet_balance:"00.00",
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

      console.log("action payload", action.payload)
      const {token, status, user}=action.payload
      state.isLoggedIn = true;
      state.token = token;
      state.status=status;
      state.role = user.role
      state.userData.name = user.name;
      state.userData.email = user.email;
      state.userData.userPhoto = user.userPhoto || null
      state.subscription_name=user.subscription?.subscription_name || null
      state.wallet_balance=user.wallet_balance || "00.00"


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
      state.subscription_name= null;
      state.wallet_balance="00.00";

      // Remove auth info from local storage
      localStorage.removeItem('authInfo');

      // remove token from cookies
      Cookies.remove('authToken');
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
