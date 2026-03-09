import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuth: boolean;
  isInitialized: boolean;
};

const initialState: AuthState = {
  isAuth: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
      state.isInitialized = true;
      console.log('----login-----');
      console.log('isAuth', state.isAuth);
      console.log('init', state.isInitialized);
    },

    logout(state) {
      state.isAuth = false;
      localStorage.removeItem('accessToken');
      console.log('----logout-----');
      console.log('isAuth', state.isAuth);
      console.log('init', state.isInitialized);
    },

    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      console.log('----setAuth-----');
      console.log('isAuth', state.isAuth);
      console.log('init', state.isInitialized);
    },

    setInitialized(state) {
      state.isInitialized = true;
      console.log('----setInitialized-----');
      console.log('isAuth', state.isAuth);
      console.log('init', state.isInitialized);
    },
  },
});

export const { login, logout, setAuth, setInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
