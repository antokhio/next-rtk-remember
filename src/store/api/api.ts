import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseUrl = `https://pokeapi.co/api/v2`;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      // @ts-expect-error too complex type
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    pokemonDitto: builder.query<any, undefined>({
      query: (params) => ({
        url: "/pokemon/ditto",
        params,
      }),
      transformResponse: ({ ...data }: any) => data,
    }),
  }),
});

export const { usePokemonDittoQuery } = api;
