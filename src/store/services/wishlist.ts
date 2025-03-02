import { setWishListCount } from "../global";
import { api } from "./api";

export const wishlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlist: build.query({
      query: (data) => ({
        url: `/wishlist?customer_id=${data.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      providesTags: ["Wishlist"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setWishListCount(data.length));
      },
      transformResponse: (response: {
        success: number;
        error: string;
        data: WISHLIST[];
      }) => response.data,
    }),
    addToWishlist: build.mutation({
      query: (formData) => ({
        url: "/wishlist",
        method: "POST",
        body: formData.data,
        headers: {
          Authorization: `Bearer ${formData.token}`,
        },
      }),
      invalidatesTags: ["Wishlist"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setWishListCount(data.data.total));
      },
    }),
  }),
});

export const { useGetWishlistQuery, useAddToWishlistMutation } = wishlistApi;
