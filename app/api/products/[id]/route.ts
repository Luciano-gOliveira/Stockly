import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

//com query params 
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("teste");
  console.log({ query });
  const prouctId = params.id;
  const product = await db.product.findUnique({
    where: {
      id: prouctId,
    },
  });
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product, { status: 200 });
}

// export async function GET(_request: Request, { params }: { params: { id: string } }) {
//   const productId = params.id;
//   const product = await db.product.findUnique({
//     where: {
//       id: productId,
//     },
//   });
//   if(!product){
//     return Response.json({error: "Product not found"}, {status: 404})
//   }
//   return Response.json({product}, {status: 200})
// }



export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const productId = params.id;
  await db.product.delete({
    where: {
      id: productId,
    },
  });
  return Response.json({}, { status: 200 });
}
