import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import MarvelCharacter from "./models/MarvelCharacter.js";

const SEED_PATH = path.resolve("../marvel-json/marvel_characters.json");

const raw = JSON.parse(fs.readFileSync(SEED_PATH, "utf8"));
const docs = raw.map((c) => ({ ...c, id: Number(c.id) }));

await mongoose.connect(process.env.DB_CONNECTION_STRING, {
  dbName: "marvel_db",
});

await MarvelCharacter.deleteMany({});
const inserted = await MarvelCharacter.insertMany(docs, { ordered: false });
console.log(`Inserted ${inserted.length} characters.`);

await mongoose.disconnect();
