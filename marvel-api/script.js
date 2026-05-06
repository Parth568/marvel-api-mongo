const input = document.getElementById("input-box");
const button = document.getElementById("submit-button");
const showContainer = document.getElementById("show-container");
const listContainer = document.querySelector(".list");

const BASE_URL = "/api/marvel-characters";
let allCharacters = [];

function showMessage(msg) {
  showContainer.innerHTML = `<p style="color:white; padding:10px;">${msg}</p>`;
}

function removeElements() {
  if (listContainer) listContainer.innerHTML = "";
}

function displayWords(value) {
  input.value = value;
  removeElements();
}
window.displayWords = displayWords;

async function loadAllCharacters() {
  try {
    showMessage("Loading characters from backend...");
    console.log("Fetching:", BASE_URL);

    const response = await fetch(BASE_URL);
    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data sample:", data);

    if (!Array.isArray(data)) {
      showMessage("Backend response is not an array. Check backend route.");
      return;
    }

    allCharacters = data;
    showMessage(
      `Loaded ${allCharacters.length} characters. Type a name and click Submit.`,
    );
  } catch (error) {
    console.error("loadAllCharacters error:", error);
    showMessage(
      "Could not connect to backend. Is marvel-server running on localhost:5500?",
    );
  }
}

function renderCharacter(character) {
  if (!character) {
    showMessage("Character not found.");
    return;
  }

  showContainer.innerHTML = `
    <div class="card-container">
      <div class="container-character-image">
        <img src="${character.image}" alt="${character.name}" />
      </div>
      <div class="character-name">${character.name}</div>
      <div class="character-description">${character.description || "No description available."}</div>
    </div>
  `;
}

function buildSuggestions() {
  removeElements();

  const query = input.value.trim().toLowerCase();
  if (query.length < 2 || !allCharacters.length) return;

  const matches = allCharacters
    .filter((c) => (c.name || "").toLowerCase().includes(query))
    .slice(0, 8);

  matches.forEach((character) => {
    const name = character.name || "";
    const div = document.createElement("div");
    div.classList.add("autocomplete-items");
    div.style.cursor = "pointer";
    div.setAttribute("onclick", `displayWords(${JSON.stringify(name)})`);

    const idx = name.toLowerCase().indexOf(query);
    let word = name;
    if (idx >= 0) {
      word =
        name.substring(0, idx) +
        "<b>" +
        name.substring(idx, idx + query.length) +
        "</b>" +
        name.substring(idx + query.length);
    }

    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
}

function handleSearch() {
  const q = input.value.trim().toLowerCase();

  if (!q) {
    showMessage("Input cannot be blank.");
    return;
  }

  if (!allCharacters.length) {
    showMessage("Characters not loaded yet. Wait 1-2 seconds and try again.");
    return;
  }

  const exact = allCharacters.find((c) => (c.name || "").toLowerCase() === q);
  const partial = allCharacters.find((c) =>
    (c.name || "").toLowerCase().includes(q),
  );
  const character = exact || partial;

  renderCharacter(character);
}

if (input) {
  input.addEventListener("keyup", buildSuggestions);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
}

if (button) {
  button.addEventListener("click", handleSearch);
}

window.onload = loadAllCharacters;
