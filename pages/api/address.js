import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Address } from "@/models/Address";

const handle = async (req, res) => {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  const address = await Address.findOne({ userEmail: user.email });
  if (address) {
    res.json(await Address.findByIdAndUpdate(Address._id, req.body));
   
  } else {
    res.json(await Address.create({ userEmail: user.email, ...req.body }));
  }

};
export default handle;
