import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '../../types/Patient';
import { patientsApi } from '../../api/patientApt';

interface PatientState {
  patients: Patient[];
}

const initialState: PatientState = {
  patients: [],
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
    },
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(
        patient => patient.userid !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      patientsApi.endpoints.getPatients.matchFulfilled,
      (state, action) => {
        state.patients = action.payload;
      },
    );
  },
});

export const { addPatient, setPatients, deletePatient } = patientSlice.actions;

export default patientSlice.reducer;
