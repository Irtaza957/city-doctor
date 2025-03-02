import { logout } from "../global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  prepareHeaders: (headers) => {
    headers.append("company-id", process.env.NEXT_PUBLIC_COMPANY_ID!);
    headers.append("secret-key", process.env.NEXT_PUBLIC_SECRET_KEY!);
    headers.append("business-id", process.env.NEXT_PUBLIC_BUSINESS_ID!);
    return headers;
  },
});

const baseQueryWith401Handling: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWith401Handling,
  keepUnusedDataFor: 5,
  tagTypes: [
    "Addresses",
    "Address",
    "Bookings",
    "Booking",
    "Families",
    "Family",
    "Wishlist",
  ],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => "test",
  }),
});
