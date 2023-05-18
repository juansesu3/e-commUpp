import { CartcontextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import '../styles/fonts.css'
const GlobalStyles = createGlobalStyle`

`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartcontextProvider>
        <Component {...pageProps} />
      </CartcontextProvider>
    </>
  );
}
