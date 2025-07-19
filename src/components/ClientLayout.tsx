"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import ClientWrapper from "@/components/ClientWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ClientWrapper>{children}</ClientWrapper>
    </Provider>
  );
}
