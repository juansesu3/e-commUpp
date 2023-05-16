import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const HomePage = ({ product }) => {
  return (
    <div>
      <Header />
      <Featured product={product} />
      <NewProducts/>
    </div>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const featuredProductId = "645ba1eba0da829f60c06db4";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
};
