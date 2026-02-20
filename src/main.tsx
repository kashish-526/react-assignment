import { createRoot } from "react-dom/client";
import { useEffect } from "react";

import "@src/index.css";
import App from "@src/App.tsx";

import { LoadingProvider, useApiLoading } from "@context/LoadingContext.tsx";
import { injectLoadingHandlers } from "@api/axios.ts";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const AppWrapper = () => {
  const { startLoading, stopLoading } = useApiLoading();

  useEffect(() => {
    injectLoadingHandlers(startLoading, stopLoading);
  }, [startLoading, stopLoading]);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <LoadingProvider>
    <AppWrapper />
  </LoadingProvider>
);
