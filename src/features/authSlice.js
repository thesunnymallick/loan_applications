import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const loadAuthInfo = () => {
  try {
    const savedAuthInfo = localStorage.getItem('authInfo');
    return savedAuthInfo ? JSON.parse(savedAuthInfo) : {
      isLoggedIn: false,
      token: null,
      status:"",
      is_agreement:false,
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
      is_agreement:false,
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
      const {token, status, user,}=action.payload
      state.isLoggedIn = true;
      state.token = token;
      state.status=status;
      state.is_agreement=user.is_agreement===0? false : true;
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

    updateAgrement:(state, action)=>{
      state.is_agreement=action.payload.is_agreement;
      localStorage.setItem('authInfo', JSON.stringify(state));
    },

    updateWalletBalance:(state, action)=>{
      state.wallet_balance=action.payload.wallet_balance;
      localStorage.setItem('authInfo', JSON.stringify(state));
    }


  },
});

export const { setLogin, setLogout, updateAgrement, updateWalletBalance } = authSlice.actions;
export default authSlice.reducer;
