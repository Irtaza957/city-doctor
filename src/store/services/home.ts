import { api } from "./api";

export const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchHomeData: build.query({
      query: () => ({
        url: "/home?company_id=1&business_id=1",
        method: "GET",
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: DRIP[];
      }) => response.data,
    }),
    fetchHomeBanners: build.query({
      query: () => ({
        url: "/home/banners",
        method: "GET",
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: BANNER[];
      }) => response.data,
    }),
  }),
});

export const { useFetchHomeDataQuery, useFetchHomeBannersQuery } = homeApi;
