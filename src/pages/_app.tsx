import { store } from "@/lib/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/system";
import { SidebarComponent } from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <div>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <ToastContainer theme="dark" />
            <div className="w-full h-screen flex flex-row">
              <SidebarComponent />
              <Component {...pageProps} />
            </div>
          </NextUIProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}
