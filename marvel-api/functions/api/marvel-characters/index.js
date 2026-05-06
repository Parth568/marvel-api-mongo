import { MongoClient } from "mongodb";

export async function onRequestGet({ env }) {
  const client = new MongoClient(env.DB_CONNECTION_STRING, {
    serverSelectionTimeoutMS: 8000,
  });
  try {
    await client.connect();
    const docs = await client
      .db("marvel_db")
      .collection("marvelCharacters")
      .find()
      .sort({ name: 1 })
      .toArray();
    return Response.json(docs);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  } finally {
    await client.close().catch(() => {});
  }
}
