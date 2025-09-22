import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AddPatientPayload,
  FetchPatientsResponse,
  Patient,
} from '../types/Patient';

const headers = {
  Apiversion: 'v3',
  Appversion: '0.0.30-DEBUG',
  Appversioncode: '56',
  Orgid: '614',
  Apikey: 'de3f1c39f8c03a3401303fdeb9748668',
};

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.mero.doctor/api/v3/user',
    prepareHeaders: h => {
      for (const [key, value] of Object.entries(headers)) {
        h.set(key, value);
      }
      return h;
    },
    responseHandler: async response => {
      const text = await response.text();
      if (!text) return {};
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    },
  }),
  tagTypes: ['Patients'],
  endpoints: builder => ({
    getPatients: builder.query<Patient[], string>({
      query: () => {
        const formData = new FormData();
        formData.append('userid', '1000596100');
        formData.append('orgid', '614');

        return {
          url: '/showrelatives',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response: FetchPatientsResponse) => {
        console.log('response', JSON.stringify(response, null, 2));
        return response.response.list ?? [];
      },
      providesTags: ['Patients'],
    }),

    addPatient: builder.mutation<any, AddPatientPayload>({
      query: payload => {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        return {
          url: '/addrelatives',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Patients'],
    }),
  }),
});

export const { useGetPatientsQuery, useAddPatientMutation } = patientsApi;
