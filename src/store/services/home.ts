import { api } from "./api";

export const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchHomeData: build.query({
      query: () => ({
        url: `/home?company_id=${process.env.NEXT_PUBLIC_COMPANY_ID!}&business_id=${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
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