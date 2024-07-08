import mongoose, { Schema, models, model } from "mongoose";

const CartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },

  // totalPrice: {
  //   type: Number,
  //   required: true,
  // },
});

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    items : [CartItemSchema]
})


const Cart = models.Cart || model('Cart', CartSchema)

export default Cart;
