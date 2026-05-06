import characters from "../../../data/marvel-characters.json";

export async function onRequestGet({ params }) {
  const escaped = params.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escaped}`, "i");
  const character = characters.find((c) => regex.test(c.name || ""));
  if (!character) {
    return Response.json(
      { message: "Marvel character not found" },
      { status: 404 },
    );
  }
  return Response.json(character);
}
