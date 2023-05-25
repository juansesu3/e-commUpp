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

  font-size: 1.4rem;
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
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
        <InputWrapper>
        <SearchInput
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          autoFocus
          placeholder="Search for products..."
        />
        </InputWrapper>
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
