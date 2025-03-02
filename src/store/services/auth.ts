import { api } from "./api";
import { setUser, setWishListCount } from "../global";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOTP: build.mutation({
      query: (data) => ({
        url: `/${data.type}`,
        method: "POST",
        body: data.formData,
      }),
    }),
    verifyOTP: build.mutation({
      query: (form) => ({
        url: `/${form.type}/verify_otp`,
        method: "POST",
        body: form.formData,
      }),
      async onQueryStarted(form, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (form.type === "login") {
          dispatch(setUser(data.data));
          dispatch(setWishListCount(data.data.total_wishlist));
        }
      },
    }),
    resendOTP: build.mutation({
      query: (phone) => ({
        url: "/login/resend_otp",
        method: "POST",
        body: phone,
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: { mobile: string; otp: string; expiry: string };
      }) => response.data,
    }),
    register: build.mutation({
      query: (data) => ({
        url: "/register/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data.data));
      },
    }),
    updateUser: build.mutation({
      query: ({ userData, token }) => ({
        url: "/account/update_profile",
        method: "POST",
        body: userData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted({ token }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser({ ...data.data, token }));
      },
    }),
  }),
});

export const {
  useGetOTPMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useUpdateUserMutation,
} = authApi;
