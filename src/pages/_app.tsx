import { wrapper } from "@store/store";
import NextApp from "next/app";
import type {
  AppInitialProps as NextAppInitialProps,
  AppProps as NextAppProps,
} from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: NextAppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async (ctx): Promise<NextAppInitialProps> => {
      const childrenGip = await NextApp.getInitialProps(ctx);
      return {
        pageProps: {
          ...childrenGip,
        },
      };
    }
);
