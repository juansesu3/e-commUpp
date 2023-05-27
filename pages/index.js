import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProducts";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const HomePage = ({ FeaturedProduct, newProducts, wishNewProducts }) => {
  return (
    <div>
      <Header />
      <Featured product={FeaturedProduct} />
      <NewProducts products={newProducts} wishedProducts={wishNewProducts}/>
    </div>
  );
};

export default HomePage;

export const getServerSideProps = async (ctx) => {
  const featuredProductId = "645ba1eba0da829f60c06db4";
  await mongooseConnect();
  const FeaturedProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const { user } = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishNewProducts = await WishedProduct.find({
    userEmail: user.email,
    product: newProducts.map(p=>p._id.toString()),
  });
  console.log({wishNewProducts});
  return {
    props: {
      FeaturedProduct: JSON.parse(JSON.stringify(FeaturedProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishNewProducts : wishNewProducts.map(i=> i.product.toString()),
    },
  };
};
