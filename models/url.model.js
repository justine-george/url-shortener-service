const mongoose = require("mongoose");

const schema = mongoose.Schema;

const urlSchema = new schema(
  {
    original_url: { type: String, required: true },
    short_url: { type: Number, required: true },
  },
  { timestamps: true },
  { collection: "urls" }
);

module.exports = mongoose.model("Url", urlSchema);
