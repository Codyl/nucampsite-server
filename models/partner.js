const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    image: {
      type: String,
      require: true,
    },
    featured: {
      type: Boolean,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Partner", partnerSchema);
