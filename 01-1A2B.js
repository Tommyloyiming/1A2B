let answer = "";
let gameStarted = false;
let guessCount = 0;

// 產生不重複的四位數字
function generateAnswer() {
  let digits = [];
  while (digits.length < 4) {
    const num = Math.floor(Math.random() * 10);
    if (!digits.includes(num)) digits.push(num);
  }
  return digits.join("");
}

// 比對 A、B 結果
function checkGuess(guess, answer) {
  let A = 0, B = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) A++;
    else if (answer.includes(guess[i])) B++;
  }
  return `${A}A${B}B`;
}

// 清空歷史紀錄
function clearResults() {
  document.getElementById("resultList").innerHTML = "";
}

// 新增歷史紀錄項目
function addHistoryItem(result, guess) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex align-items-center justify-content-start";

  // 建立紅色標籤
  const badge = document.createElement("span");
  badge.className = "badge bg-danger me-3";
  badge.textContent = result;

  // 顯示猜的數字
  const text = document.createElement("span");
  text.textContent = guess;

  li.appendChild(badge);
  li.appendChild(text);
  document.getElementById("resultList").appendChild(li); // 最新的在最上方
}

// 遊戲邏輯
document.getElementById("startBtn").addEventListener("click", () => {
  answer = generateAnswer();
  gameStarted = true;
  guessCount = 0;
  clearResults();
  document.getElementById("guessInput").value = "";
  alert("遊戲開始！請輸入四位不重複數字 🎯");
});

document.getElementById("guessBtn").addEventListener("click", () => {
  if (!gameStarted) return alert("請先按『開始』！");
  const guess = document.getElementById("guessInput").value.trim();

  if (!/^\d{4}$/.test(guess)) return alert("請輸入 4 位數字！");
  if (new Set(guess).size !== 4) return alert("請輸入不重複的 4 位數字！");

  const result = checkGuess(guess, answer);
  addHistoryItem(result, guess);
  guessCount++;

  if (result === "4A0B") {
    alert(`🎉 恭喜你答對了！答案是 ${answer}\n總共猜了 ${guessCount} 次！`);
    gameStarted = false;
  }

  document.getElementById("guessInput").value = "";
});

document.getElementById("resetBtn").addEventListener("click", () => {
  gameStarted = false;
  guessCount = 0;
  clearResults();
  document.getElementById("guessInput").value = "";
  alert("遊戲已重設 🔁");
});

document.getElementById("answerBtn").addEventListener("click", () => {
  if (!gameStarted) alert("請先開始遊戲！");
  else alert(`答案是：${answer}`);
});
