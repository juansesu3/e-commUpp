import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.json("should be a post request");
    return;
  }
  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;
  await mongooseConnect();
  const producstIds = products.split(",");
  const uniqueIds = [...new Set(producstIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = producstIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }
  res.json({line_items});
};

export default handler;
