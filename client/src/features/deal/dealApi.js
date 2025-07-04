import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const dealApi = createApi({
  reducerPath: 'dealApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL+'/api/deals',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Deal'],
  endpoints: (builder) => ({
    createDeal: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Deal'],
    }),
    getMyDeals: builder.query({
      query: () => '/',
      providesTags: ['Deal'],
    }),
    updateDealStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Deal'],
    }),
  }),
});

export const {
  useCreateDealMutation,
  useGetMyDealsQuery,
  useUpdateDealStatusMutation,
} = dealApi;
