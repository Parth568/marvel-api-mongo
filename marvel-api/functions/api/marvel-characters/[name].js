import { MongoClient } from "mongodb";

export async function onRequestGet({ env, params }) {
  const client = new MongoClient(env.DB_CONNECTION_STRING, {
    serverSelectionTimeoutMS: 8000,
  });
  try {
    await client.connect();
    const escaped = params.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const character = await client
      .db("marvel_db")
      .collection("marvelCharacters")
      .findOne({ name: { $regex: `^${escaped}`, $options: "i" } });
    if (!character) {
      return Response.json(
        { message: "Marvel character not found" },
        { status: 404 },
      );
    }
    return Response.json(character);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  } finally {
    await client.close().catch(() => {});
  }
}
