import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProducts";
import { getServerSession } from "next-auth";

const handle = async (req, res) => {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    const { product } = req.body;
    const wisheDoc = await WishedProduct.findOne({
      userEmail: user.email,
      product,
    });
    if (wisheDoc) {
      await WishedProduct.findByIdAndDelete(wisheDoc._id);
      res.json({wisheDoc});
    } else {
      await WishedProduct.create({
        userEmail: user.email,
        product,
      });
      res.json("create");
    }
  }
};

export default handle;
