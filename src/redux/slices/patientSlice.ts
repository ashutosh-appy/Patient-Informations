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
      console.log('Adding patient:', action.payload);
      state.patients.push(action.payload);
    },
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
    },
    editPatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(
        patient => patient.userid === action.payload.userid,
      );
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
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

export const { addPatient, editPatient, deletePatient, setPatients } =
  patientSlice.actions;

export default patientSlice.reducer;
