import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';
import { dealApi } from '../features/deal/dealApi';
import { userApi } from '../features/user/userApi';
import { messageApi } from '../features/message/messageApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dealApi.reducerPath]: dealApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, dealApi.middleware,userApi.middleware,messageApi.middleware),
});
