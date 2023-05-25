import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.4rem;
  position: sticky;
  top: 70px;
`;

const SearchPage = () => {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  const SearchProducts = (phrase) => {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  };
  const debouncedSearch = useCallback(debounce(SearchProducts, 500), []);

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
        {!isLoading && phrase !== "" && products.length === 0 && (
          <h2>No products found for query `{phrase}`</h2>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
};

export default SearchPage;
