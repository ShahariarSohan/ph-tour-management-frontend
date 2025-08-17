

import { baseApi } from "@/redux/base.api";


export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking/create",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
    }),
  }),
});
export const {useCreateBookingMutation} = bookingApi;
