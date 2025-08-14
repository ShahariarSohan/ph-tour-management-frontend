import { baseApi } from "@/redux/base.api";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
    }),
    // removeTourType: builder.mutation({
    //   query: (tourId) => ({
    //     url: `/tour/tour-types/${tourId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["TourType"],
    // }),
  }),
});
export const { useAddDivisionMutation, useGetDivisionQuery } = divisionApi;
