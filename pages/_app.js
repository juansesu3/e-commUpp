import { CartcontextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import "../styles/fonts.css";
import { SessionProvider } from "next-auth/react";
const GlobalStyles = createGlobalStyle`

`;
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartcontextProvider>
          <Component {...pageProps} />
        </CartcontextProvider>
      </SessionProvider>
    </>
  );
}
