const { Schema, model } = require("mongoose");

const fileNameSchema = new Schema(
  {
    user_id: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Upload", fileNameSchema);
