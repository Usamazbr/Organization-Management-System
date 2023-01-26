const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema(
  {
    user_id: { type: String, required: true },
    Role: { type: String, required: true },
    Permissions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roles", msgSchema);
