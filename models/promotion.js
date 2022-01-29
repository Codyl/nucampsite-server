const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotions", promotionSchema);
