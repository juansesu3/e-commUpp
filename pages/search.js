import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.4rem;
`;

const SearchPage = () => {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (phrase.length > 0) {
      axios
        .get("/api/products?phrase=" + encodeURIComponent(phrase))
        .then((response) => {
          setProducts(response.data);
        });
    }
  }, [phrase]);

  return (
    <>
      <Header />
      <Center>
        <SearchInput
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          autoFocus
          placeholder="Search for products..."
        />
        <ProductsGrid products={products} />
      </Center>
    </>
  );
};

export default SearchPage;
