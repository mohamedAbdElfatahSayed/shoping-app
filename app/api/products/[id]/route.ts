import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/app/models/Product";
import "@/app/models/User";
import {  updateProductSchema } from "@/app/validation/product";
import mongoose from "mongoose";
import { verifyToken } from "@/utils/verifyToken";
import { deleteImages, uploadImages } from "@/utils/uploadImages";


// ✅ GET SINGLE PRODUCT
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).populate(
      "user",
      "username email"
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Server Error",
      },
      { status: 500 }
    );
  }
}

// app/api/products/[id]/route.ts



export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // verify admin
    const decoded = verifyToken(req);

    if (!decoded?.isAdmin) {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    // convert FormData → object
    const data = {
      name:
        (formData.get("name") as string) ||
        product.name,

      description:
        (formData.get("description") as string) ||
        product.description,

      brand:
        (formData.get("brand") as string) ||
        product.brand,

      category:
        (formData.get("category") as string) ||
        product.category,

      price:
        Number(formData.get("price")) ||
        product.price,

      discountPrice:
        Number(formData.get("discountPrice")) ||
        product.discountPrice,

      countInStock:
        Number(formData.get("countInStock")) ||
        product.countInStock,

      colors: JSON.parse(
        (formData.get("colors") as string) ||
          JSON.stringify(product.colors)
      ),

      sizes: JSON.parse(
        (formData.get("sizes") as string) ||
          JSON.stringify(product.sizes)
      ),
    };

    // ZOD VALIDATION
    const validation =
      updateProductSchema.safeParse(data);

    if (!validation.success) {
      return NextResponse.json(
        {
          errors:
            validation.error.flatten()
              .fieldErrors,
        },
        { status: 400 }
      );
    }

    // images
    const files = formData.getAll("images") as File[];

    let uploadedImages = product.images;

    if (files.length > 0 && files[0].size > 0) {
      const publicIds = product.images.map(
        (img: any) => img.publicId
      );

      await deleteImages(publicIds);

      uploadedImages = await uploadImages(
        files,
        "products"
      );
    }

    // update product
    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        {
          ...validation.data,
          images: uploadedImages,
        },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    return NextResponse.json(updatedProduct, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}  


// ✅ DELETE PRODUCT
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const decoded=verifyToken(req)
    if (!decoded.isAdmin) {
      return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid product id" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await product.deleteOne();

    return NextResponse.json(
      {
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Server Error",
      },
      { status: 500 }
    );
  }
}