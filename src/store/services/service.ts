import { api } from "./api";

export const serviceApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchServices: build.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: DRIP_CARD[];
      }) => response.data,
    }),
    fetchServicesList: build.mutation({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: DRIP_CARD[];
      }) => response.data,
    }),
  }),
});

export const { useFetchServicesQuery, useFetchServicesListMutation } =
  serviceApi;
