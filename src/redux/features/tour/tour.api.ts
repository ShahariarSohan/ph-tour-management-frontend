
import { baseApi } from "@/redux/base.api";



export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
        }),
        invalidatesTags:["TourType"]
    }),
    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
        }),
        providesTags:["TourType"]
    //   transformResponse: (response) => response.data
    }),
  }),
});
export const {useAddTourTypeMutation,useGetTourTypesQuery}=tourApi