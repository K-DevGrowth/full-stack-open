const mongoose = require("mongoose");
const config = require("../utils/config");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Error connecting to MongoDB:", error.message)
  );

const BlogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

BlogSchema.set("toJSON", {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
