import { api } from "./api";

export const addressApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAddress: build.mutation({
      query: (data) => ({
        url: "/address",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),
    fetchAddresses: build.query({
      query: (id) => ({
        url: `/address?customer_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Addresses"],
      transformResponse: (response: {
        success: number;
        error: string;
        data: ADDRESS[];
      }) => response.data,
    }),
    fetchAddress: build.query({
      query: (id) => ({
        url: `/address?address_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Address"],
      transformResponse: (response: {
        success: number;
        error: string;
        data: ADDRESS;
      }) => response.data,
    }),
    updateAddress: build.mutation({
      query: (data) => ({
        url: "/address/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Addresses", "Address"],
    }),
    deleteAddress: build.mutation({
      query: (id) => ({
        url: `/address/delete?address_id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),
    defaultAddress: build.mutation({
      query: (data) => ({
        url: "/address/set_default",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),
    fetchAreas: build.query({
      query: (id) => ({
        url: `/address/areas?emirate=${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: AREA[];
      }) => response.data,
    }),
  }),
});

export const {
  useFetchAreasQuery,
  useFetchAddressQuery,
  usePostAddressMutation,
  useFetchAddressesQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useDefaultAddressMutation,
} = addressApi;
