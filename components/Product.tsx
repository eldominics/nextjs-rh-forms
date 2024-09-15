"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/form-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useFormState } from "react-dom";
import { s3UploadDatabase } from "@/actions/s3uploadDB";

const Product = () => {
  const formState = {
    message: "",
    errors: {
      productTitle: "",
      productDescription: "",
      productPrice: "",
      productImage: "",
    },
  };

  const [state, action] = useFormState(s3UploadDatabase, formState);
  const [imagePreview, setImagePreviiew] = useState<string | null>(null);
  //   async function toSubmit(data: ProductSchemaTT) {
  //     await new Promise((resolve) => setTimeout(resolve, 3000));
  //     console.log("data", data);
  //     console.log("submitted");

  //     await fetch("/api/s3Upload", {
  //         method:"POST",
  //         body:data.productImage
  //     })
  //   }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const imgUrl = URL.createObjectURL(event.target.files?.[0] as File);
    setImagePreviiew(imgUrl);
    // setValue("productImage", event.target.files?.[0] as File);
  }
  const {
    register,
    // setValue,
    // setError,
    // reset,
    formState: { isSubmitting },
  } = useForm<ProductSchemaTT>({ resolver: zodResolver(productSchema) });
  return (
    <>
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-gray-200">
            Create An Awesome Product!
          </h1>

          <p className="mt-4 text-gray-500">
            Be sure to cross check the data you have provided
          </p>
        </div>

        {state.message === "success" && (
          <p className="text-green-600 text-center">Product Created</p>
        )}

        <form
          action={action}
          //   onSubmit={handleSubmit(toSubmit)}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="productTitle" className="sr-only">
              Name of the Product
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Product Title"
                {...register("productTitle")}
              />
            </div>
          </div>

          {state.errors?.productTitle && (
            <p className="text-red-400"> {` ${state.errors.productTitle}`}</p>
          )}

          {/* descr */}

          <div>
            <label htmlFor="productDescription" className="sr-only">
              Product description
            </label>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <textarea
                id="productdescription"
                className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm text-black"
                placeholder="Describe what the product is about"
                rows={6}
                {...register("productDescription")}
              ></textarea>
            </div>
          </div>

          {state.errors?.productDescription && (
            <p className="text-red-400">
              {" "}
              {` ${state.errors.productDescription}`}
            </p>
          )}

          {/*  price*/}

          <div>
            <label htmlFor="productPrice" className="sr-only">
              Price
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Product Price"
                {...register("productPrice")}
              />
            </div>
          </div>

          {state.errors?.productPrice && (
            <p className="text-red-400"> {` ${state.errors.productPrice}`}</p>
          )}

          {/*  Image*/}

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop images for the product
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...register("productImage")}
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </div>

          {
            <div className="flex w-full items-center justify-start">
              {imagePreview && (
                <Image
                  src={imagePreview}
                  height={40}
                  width={40}
                  alt="Image Preview"
                  className="w-[50%] "
                />
              )}
            </div>
          }

          {state.errors?.productImage && (
            <p className="text-red-400"> {` ${state.errors.productImage}`}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              disabled={isSubmitting}
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-gray-500"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Product;
