"use server";
import { productSchema } from "@/lib/form-types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ZodError } from "zod";
import { createProduct } from "./product";

export type DataState = {
  message: string;
  errors: {
    productTitle: string;
    productDescription: string;
    productPrice: string;
    productImage: string;
  };
};

const ourS3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFilesTos3(
  imageFile: Buffer,
  fileName: string,
  prodImageFile: File
) {
  const fileBuffer = imageFile;
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `productImages/${fileName}`,
    Body: fileBuffer,
    ContentType: prodImageFile.type,
  };
  const command = new PutObjectCommand(uploadParams);
  try {
    await ourS3Client.send(command);
    const imageUrl = `https://product-form-bucket.s3.eu-north-1.amazonaws.com/productImages/${fileName}`;
    return imageUrl;
  } catch (error) {
    console.log(error);
  }
}
export async function s3UploadDatabase(
  prevState: DataState,
  formData: FormData
) {
  try {
    const productData = Object.fromEntries(formData.entries());
    console.log("prodData", productData);
    productSchema.parse(productData);
    const productImageFile = formData.get("productImage") as File;

    const buffer = Buffer.from(
      (await productImageFile.arrayBuffer()) as Buffer
    );

    const imgUrl = await uploadFilesTos3(
      buffer,
      productImageFile.name,
      productImageFile
    );

    const imageUrl = imgUrl;
    console.log("our image url", imageUrl);
    await createProduct({
      productTitle: productData.productTitle.toString(),
      productDescription: productData.productDescription.toString(),
      productPrice: productData.productPrice.toString(),
      productImage: imageUrl!,
    });

    prevState = {
      message: "success",
      errors: {
        productTitle: "",
        productDescription: "",
        productPrice: "",
        productImage: "",
      },
    };
    return prevState;
  } catch (error) {
    const formsError = error as ZodError;
    const errorMap = formsError.flatten().fieldErrors;

    const prodTitleError = errorMap.productTitle
      ?.map((eachError) => `${eachError}`)
      .toString();

    const prodDescriptionError = errorMap.productDescription
      ?.map((eachError) => `${eachError}`)
      .toString();

    const prodPriceError = errorMap.productPrice
      ?.map((eachError) => `${eachError}`)
      .toString();

    const prodImageError = errorMap.productImage
      ?.map((eachError) => `${eachError}`)
      .toString();

    prevState = {
      message: "unsuccessful",
      errors: {
        productTitle: prodTitleError || "",
        productDescription: prodDescriptionError || "",
        productPrice: prodPriceError || "",
        productImage: prodImageError || "",
      },
    };
    return prevState;
  }
}
