import { model, models, Schema } from "mongoose";

const productSchema = new Schema({
  productTitle: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: String, required: true },
  productImage: { type: String, required: true },
});

const Product = models.Product || model("Product", productSchema);

export default Product;
