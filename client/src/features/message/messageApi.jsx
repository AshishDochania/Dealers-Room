import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (dealId) => `/${dealId}`,
      providesTags: ['Messages']
    }),
    sendMessage: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Messages']
    })
  })
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;
