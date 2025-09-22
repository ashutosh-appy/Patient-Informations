import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '../../types/Patient';

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
    editPatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(patient => patient.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload);
    },
  },
});

export const { addPatient, editPatient, deletePatient } = patientSlice.actions;

export default patientSlice.reducer;
