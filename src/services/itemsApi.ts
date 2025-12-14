import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item } from "../types/Item";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "/items",
      providesTags: ["Items"],
    }),
    createItem: builder.mutation<Item, Partial<Item>>({
      query: (body) => ({
        url: "/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Items"],
    }),
    updateItem: builder.mutation<Item, Partial<Item> & Pick<Item, "id">>({
      query: ({ id, ...body }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Items"],
    }),
    deleteItem: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi;
