import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  cartItems: ICartItem[];
  totalPrice: number;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    color: {
      type: String,
      default: null,
    },

    size: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    cartItems: {
      type: [CartItemSchema],
      default: [],
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ SAFE middleware (NO next)
CartSchema.pre("save", function () {
  this.totalPrice = this.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
});

// ✅ Prevent Next.js hot-reload model duplication
const Cart =
  (mongoose.models.Cart as mongoose.Model<ICart>) ||
  mongoose.model<ICart>("Cart", CartSchema);

export default Cart;