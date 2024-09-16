import { getProducts } from "@/actions/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const products = await getProducts();
  return (
    <>
      <Link
        className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 mt-2 ml-2 text-black"
        href={`/`}
      >
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
          Create a product
        </span>
      </Link>
      <div className="text-center mt-3 mb-3 text-3xl">Welcome to Products</div>

      <div className="flex flex-col items-center md:flex-row md:justify-center">
        {products?.map((eachProduct, index) => (
          <div key={index} className="m-2 rounded-lg bg-slate-100 w-96">
            <Image
              src={eachProduct.productImage}
              height={90}
              width={90}
              alt="product Image"
              className="h-[350px] w-full object-cover rounded-lg"
            />
            <div className="mt-3 flex justify-between text-sm">
              <div>
                <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4 ml-1">
                  {eachProduct.productTitle}
                </h3>

                <p className="mt-1.5 text-pretty text-xs text-gray-800 ml-1">
                  {eachProduct.productDescription}
                </p>
              </div>

              <p className="text-gray-900">${eachProduct.productPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
