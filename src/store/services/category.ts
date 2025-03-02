import { api } from "./api";

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchCategories: build.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: CATEGORY[];
      }) => response.data,
    }),
    fetchSubCategories: build.mutation({
      query: (id) => ({
        url: `/category/subcategories?id=${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: number;
        error: string;
        data: SERVICE_LIST[];
      }) => response.data,
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchSubCategoriesMutation } =
  categoryApi;
