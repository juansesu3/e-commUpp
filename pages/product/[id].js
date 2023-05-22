import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const ProductPage = ({ product }) => {
  return (
    <>
      <Header />
      <Center>
        <Title>{product.title}</Title>
      </Center>
    </>
  );
};

export default ProductPage;

export const getServerSideProps = async (context) => {
  await mongooseConnect();
  const { id } = context?.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
