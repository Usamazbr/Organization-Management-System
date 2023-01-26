const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = new Schema(
  {
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    duration: { type: Number, required: true },
    typeofLeave: { type: String, required: true },
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leaves", msgSchema);
