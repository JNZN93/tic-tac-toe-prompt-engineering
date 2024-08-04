let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "circle";

function init() {
  render();
}

function generateCircleSVG() {
  return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00B0FF" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0, 188.4" to="188.4, 188.4" dur="0.250s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
  return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0, 70.7" to="70.7, 70.7" dur="0.250s" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0, 70.7" to="70.7, 70.7" dur="0.250s" fill="freeze" />
            </line>
        </svg>
    `;
}

function handleCellClick(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    let symbolHTML =
      currentPlayer === "circle" ? generateCircleSVG() : generateCrossSVG();
    document.getElementById(`cell-${index}`).innerHTML = symbolHTML;
    document.getElementById(`cell-${index}`).onclick = null;

    // Überprüfen, ob das Spiel vorbei ist
    if (checkWin()) {
      return;
    }

    // Wechseln zum nächsten Spieler
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      highlightWinningCells(pattern);
      return true;
    }
  }

  if (!fields.includes(null)) {
    return true;
  }

  return false;
}

function highlightWinningCells(pattern) {
  for (const index of pattern) {
    document.getElementById(`cell-${index}`).classList.add("winning-cell");
  }

  // Entferne onclick von allen Zellen
  for (let i = 0; i < fields.length; i++) {
    document.getElementById(`cell-${i}`).onclick = null;
  }
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle";
  render();
}

function render() {
  const content = document.getElementById("content");
  content.innerHTML = ""; // Clear previous content
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      html += `<td id="cell-${index}" onclick="handleCellClick(${index})"></td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  content.innerHTML = html;
}
