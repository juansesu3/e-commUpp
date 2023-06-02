import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

const handle = async (req, res) => {
  await mongooseConnect();
  if (req.method === "POST") {
    const { title, description, stars, product } = req.body;
    res.json(await Review.create({ title, description, stars, product }));
  }
  if (req.method === "GET") {
    const { product } = req.query;
    console.log("hola", product);
    res.json(await Review.find({ product }, null, { sort: { createdAt: -1 } }));
  }
};

export default handle;
