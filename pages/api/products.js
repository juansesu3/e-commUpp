import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useState } from "react";

const handle = async (req, res) => {
  await mongooseConnect();
  const { categories, sort, phrase, ...filters } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("-");

  const productsQuery = {};
  if (categories) {
    productsQuery.category = categories.split(",");
  }
  if (phrase) {
    productsQuery["$or"] = [
      { title: { $regex: phrase, $options: "i" } },
      { description: { $regex: phrase, $options: "i" } },
    ];
  }
  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productsQuery["properties." + filterName] = filters[filterName];
    });
  }
  res.json(
    await Product.find(productsQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
};

export default handle;
