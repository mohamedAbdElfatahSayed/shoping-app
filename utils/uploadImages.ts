import cloudinary from "@/lib/cloudinary";

export const uploadImages = async (files: File[], folder: string) => {
  const uploadedImages = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(base64, {
      folder,
    });

    uploadedImages.push({
      url: uploaded.secure_url,
      publicId: uploaded.public_id, // ✅ FIX هنا
    });
  }

  return uploadedImages;
};


export const deleteImages = async (publicIds: string[]) => {
  try {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId);
    }

    return {
      message: "Images deleted successfully",
    };
  } catch (error) {
    console.log(error);

    throw new Error("Failed to delete images");
  }
};


export const uploadImage = async (file: string) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "uploads",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error: unknown) {
    console.error("Cloudinary upload error:", error);

    throw new Error(
      error instanceof Error ? error.message : "Image upload failed"
    );
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  } catch (error: unknown) {
    console.error("Cloudinary delete error:", error);

    throw new Error(
      error instanceof Error ? error.message : "Image delete failed"
    );
  }
};