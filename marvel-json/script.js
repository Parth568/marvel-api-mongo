import fs from 'fs';

const baseURL = 'https://akabab.github.io/superhero-api/api';
const maxCharacters = 100;

async function getAllCharacters() {
  const res = await fetch(`${baseURL}/all.json`);
  if (!res.ok) {
    throw new Error('Failed to fetch characters from superhero API');
  }

  const allData = await res.json();

  return allData.slice(0, maxCharacters).map((data) => ({
    id: String(data.id),
    name: data.name,
    description: `Full Name: ${data.biography?.fullName || 'N/A'}, Publisher: ${data.biography?.publisher || 'Unknown'}`,
    image: data.images?.md || 'https://via.placeholder.com/150'
  }));
}

// Main
(async () => {
  try {
    console.log(`Fetching ${maxCharacters} characters from SuperHero API...`);
    const characters = await getAllCharacters();

    fs.writeFileSync(
      'superhero_characters.json',
      JSON.stringify(characters, null, 2)
    );

    console.log(`Saved ${characters.length} characters to superhero_characters.json`);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
