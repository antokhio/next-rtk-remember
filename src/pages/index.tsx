import { api } from "@store/api/api";
import { useTypedDispatch, useTypedSelector } from "@store/hooks";
import {
  addValue,
  clearValues,
  remeberValuesSelector,
} from "@store/slices/rememberSlice";
import { wrapper } from "@store/store";

export default function Home() {
  const dispatch = useTypedDispatch();
  const count = useTypedSelector(remeberValuesSelector);
  return (
    <>
      <button onClick={() => dispatch(addValue())}>add</button>
      <button onClick={() => dispatch(clearValues())}>clear</button>
      <div>{count}</div>
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  store.dispatch(api.endpoints.pokemonDitto.initiate(undefined));

  await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});
