import React from "react";
import { useFormStatus } from "react-dom";

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:bg-gray-400"
      type="submit"
      disabled={pending}
    >
      {pending ? <p> Creating Product ...</p> : <p>Create Product</p>}
    </button>
  );
};

export default Button;
