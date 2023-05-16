import { styled } from "styled-components";
import Center from "./Center";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const NewProducts = ({ products }) => {
  return (
    <Center>
      {" "}
      <ProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <div key={product._id}>{product.title}</div>
          ))}
      </ProductsGrid>
    </Center>
  );
};

export default NewProducts;
