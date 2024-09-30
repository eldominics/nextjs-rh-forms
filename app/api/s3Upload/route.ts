import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    //run validations on data
    //run logic to extract the url from s3
    console.log(data);
    return NextResponse.json("data");
  } catch (error) {
    return NextResponse.json(error);
  }
}
