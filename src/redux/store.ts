import { configureStore } from '@reduxjs/toolkit';
import { patientsApi } from '../api/patientApt';
import patientReducer from './slices/patientSlice';

export const store = configureStore({
  reducer: {
    [patientsApi.reducerPath]: patientsApi.reducer,
    patient: patientReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(patientsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
