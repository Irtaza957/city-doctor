import { api } from "./api";
import { setPromo } from "../global";

export const bookingApi = api.injectEndpoints({
  endpoints: (build) => ({
    postBooking: build.mutation({
      query: (formData) => ({
        url: "/booking",
        method: "POST",
        body: formData.data,
        headers: {
          Authorization: `Bearer ${formData.token}`,
        },
      }),
      invalidatesTags: ["Bookings"],
    }),
    bookingHistory: build.query({
      query: (token) => ({
        url: "/booking/history",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Bookings"],
      transformResponse: (response: {
        success: number;
        error: string;
        data: BOOKING_HISTORY[];
      }) => response.data,
    }),
    bookingDetails: build.query({
      query: (id) => ({
        url: `/booking?id=${id}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
      transformResponse: (response: {
        success: number;
        error: string;
        data: BOOKING_DETAILS;
      }) => response.data,
    }),
    fetchCancellationReasons: build.query({
      query: (token) => ({
        url: "/booking/cancellation_reasons",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: REASON[];
      }) => response.data,
    }),
    cancelBooking: build.mutation({
      query: (data) => ({
        url: "/booking/cancel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings", "Booking"],
    }),
    applyPromo: build.mutation({
      query: (formData) => ({
        url: "/booking/apply_promo",
        method: "POST",
        body: formData.data,
        headers: {
          Authorization: `Bearer ${formData.token}`,
        },
      }),
      async onQueryStarted(formData, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setPromo({ ...data.data, code: formData.name }));
      },
    }),
    addReview: build.mutation({
      query: (formData) => ({
        url: "/booking/review",
        method: "POST",
        body: formData.data,
        headers: {
          Authorization: `Bearer ${formData.token}`,
        },
      }),
      invalidatesTags: ["Booking", "Bookings"],
    }),
    trackBooking: build.query({
      query: (data) => ({
        url: `/booking/track?id=${data.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: {
          booking_status_id: string;
        };
      }) => response.data.booking_status_id,
    }),
  }),
});

export const {
  useTrackBookingQuery,
  useAddReviewMutation,
  useApplyPromoMutation,
  usePostBookingMutation,
  useBookingHistoryQuery,
  useBookingDetailsQuery,
  useCancelBookingMutation,
  useFetchCancellationReasonsQuery,
} = bookingApi;
