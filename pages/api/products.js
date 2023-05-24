import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const handle = async (req, res) => {
  await mongooseConnect();
  const { categories, ...filters } = req.query;
  console.log({ filters });
  res.json(await Product.find({ 
    category: categories.split(","),
    properties: filters
   }));
};

export default handle;
