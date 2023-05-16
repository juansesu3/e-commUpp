import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const HomePage = ({ FeaturedProduct, newProducts }) => {
  
  return (
    <div>
      <Header />
      <Featured product={FeaturedProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const featuredProductId = "645ba1eba0da829f60c06db4";
  await mongooseConnect();
  const FeaturedProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit:10 });
  return {
    props: {
      FeaturedProduct: JSON.parse(JSON.stringify(FeaturedProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
};
