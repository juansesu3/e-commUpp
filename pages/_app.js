import { CartcontextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import "../styles/fonts.css";
import { SessionProvider } from "next-auth/react";
const GlobalStyles = createGlobalStyle`
hr{
display: block;
border: 0;
border-top: 1px solid #ccc;
}
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
