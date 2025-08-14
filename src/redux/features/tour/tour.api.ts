
import { baseApi } from "@/redux/base.api";



export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOURTYPE"],
    }),
    removeTourType: builder.mutation({
      query: (tourId) => ({
        url: `/tour/tour-types/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOURTYPE"],
    }),
    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOURTYPE"],
        // transformResponse: (response) => response.data
    }),
  }),
});
export const {useAddTourTypeMutation,useGetTourTypesQuery,useRemoveTourTypeMutation}=tourApi