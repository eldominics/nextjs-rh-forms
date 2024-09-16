"use server";

import connectToMongoDB from "@/lib/mongoose";
import Product from "@/models/product.model";

export async function createProduct(params: ProductParams) {
  try {
    connectToMongoDB();
    await Product.create(params);
  } catch (error) {
    console.log(error);
  }
}
