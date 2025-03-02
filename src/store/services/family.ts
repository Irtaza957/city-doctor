import { api } from "./api";

export const familyApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchFamily: build.query({
      query: (id) => ({
        url: `/account/family_members?customer_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Families"],
      transformResponse: (response: {
        success: number;
        error: string;
        data: FAMILY_LIST[];
      }) => response.data,
    }),
    postFamily: build.mutation({
      query: (data) => ({
        url: "/account/family_members",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Families"],
    }),
    deleteFamily: build.mutation({
      query: (id) => ({
        url: `/account/delete_family_member?family_member_id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Families"],
    }),
    fetchMember: build.query({
      query: (id) => ({
        url: `/account/family_members?family_member_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Family"],
      transformResponse: (response: {
        success: number;
        error: string;
        data: FAMILY_LIST;
      }) => response.data,
    }),
    updateFamily: build.mutation({
      query: (data) => ({
        url: "/account/update_family_member",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Family", "Families"],
    }),
  }),
});

export const {
  useFetchFamilyQuery,
  useFetchMemberQuery,
  usePostFamilyMutation,
  useDeleteFamilyMutation,
  useUpdateFamilyMutation,
} = familyApi;
