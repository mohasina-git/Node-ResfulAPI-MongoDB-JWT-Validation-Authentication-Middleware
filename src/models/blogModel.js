import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true, // This will make sure this field cannot be changed(updated) later
  },
  updatedAt: Date,
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  author: {
    type: SchemaTypes.ObjectId, // Will refer the "User" Model
    ref: "User",
    required: true,
  },
});

const Blog = model("Blog", blogSchema);

export default Blog;
