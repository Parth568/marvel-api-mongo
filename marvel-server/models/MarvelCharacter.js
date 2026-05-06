// models/MarvelCharacter.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const marvelCharacterSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    // thumbnail: {
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: "marvelCharacters", // Custom collection name
  },
);

// Create a unique index on 'id' field
// productSchema.index({ id: 1 }, { unique: true });

const characters = mongoose.model("characters", marvelCharacterSchema);

export default characters;
