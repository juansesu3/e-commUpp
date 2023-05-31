import { mongooseConnect } from "@/lib/mongoose";
import { Setting } from "@/models/Setting";

const handle = async (req, res) => {
  await mongooseConnect();
  if (req.method === "GET") {
    const { name } = req.query;
    res.json( await Setting.findOne({name}));
  }
};
export default handle;
