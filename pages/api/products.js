import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useState } from "react";

const handle = async (req, res) => {
  await mongooseConnect();
  const { categories, sort, ...filters } = req.query;
  const [sortField, sortOrder] = sort.split("-");
  const productsQuery = {
    category: categories.split(","),
  };
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
