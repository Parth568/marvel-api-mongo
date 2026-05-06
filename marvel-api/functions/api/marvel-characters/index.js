import characters from "../../../data/marvel-characters.json";

export async function onRequestGet() {
  const sorted = [...characters].sort((a, b) =>
    (a.name || "").localeCompare(b.name || ""),
  );
  return Response.json(sorted);
}
