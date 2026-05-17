import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

export interface IImage {
  url: string;
  publicId: string;
}

export interface IProduct extends Document {
  user: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;

  images: IImage[];

  category: string;
  brand?: string;

  sizes?: string[];
  colors?: string[];

  countInStock: number;

  reviews: IReview[];

  rating: number;
  numReviews: number;

  isFeatured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const imageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const productSchema = new Schema<IProduct>(
  {
        user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true, trim: true },

    description: { type: String, required: true },

    price: { type: Number, required: true, default: 0 },

    discountPrice: { type: Number },

    images: {
      type: [imageSchema],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    sizes: {
      type: [String],
      default: [],
    },

    colors: {
      type: [String],
      default: [],
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;