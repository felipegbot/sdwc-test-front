import { store } from "@/lib/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/system";
import { SidebarComponent } from "@/components/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <NextUIProvider>
          <ToastContainer theme="dark" />
          <div className="w-full h-screen flex-row flex">
            <SidebarComponent />
            <Component {...pageProps} />
          </div>
        </NextUIProvider>
      </Provider>
    </div>
  );
}
