import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

const handle = async (req, res) => {
  await mongooseConnect();
  const {user} = await getServerSession(req, res, authOptions);
  res.json(await Order.find({userEmail: user?.email}));
};
export default handle;
//{ userEmail: user?.email }
