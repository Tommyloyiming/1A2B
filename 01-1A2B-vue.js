const { createApp } = Vue;

createApp({
  data() {
    return {
      answer: "",
      gameStarted: false,
      guessCount: 0,
      guessInput: "",
      historyList: []
    };
  },
  
  methods: {
    // 產生不重複的四位數字
    generateAnswer() {
      let digits = [];
      while (digits.length < 4) {
        const num = Math.floor(Math.random() * 10);
        if (!digits.includes(num)) digits.push(num);
      }
      return digits.join("");
    },
    
    // 比對 A、B 結果
    checkGuess(guess, answer) {
      let A = 0, B = 0;
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) A++;
        else if (answer.includes(guess[i])) B++;
      }
      return `${A}A${B}B`;
    },
    
    // 開始遊戲
    startGame() {
      this.answer = this.generateAnswer();
      this.gameStarted = true;
      this.guessCount = 0;
      this.historyList = [];
      this.guessInput = "";
      alert("遊戲開始！請輸入四位不重複數字 🎯");
    },
    
    // 提交猜測
    submitGuess() {
      if (!this.gameStarted) {
        alert("請先按『開始』！");
        return;
      }
      
      const guess = this.guessInput.trim();
      
      // 驗證輸入
      if (!/^\d{4}$/.test(guess)) {
        alert("請輸入 4 位數字！");
        return;
      }
      
      if (new Set(guess).size !== 4) {
        alert("請輸入不重複的 4 位數字！");
        return;
      }
      
      // 計算結果
      const result = this.checkGuess(guess, this.answer);
      
      // 新增到歷史紀錄（最新的在最上方）
      this.historyList.unshift({
        result: result,
        guess: guess
      });
      
      this.guessCount++;
      
      // 檢查是否答對
      if (result === "4A0B") {
        alert(`🎉 恭喜你答對了！答案是 ${this.answer}\n總共猜了 ${this.guessCount} 次！`);
        this.gameStarted = false;
      }
      
      // 清空輸入框
      this.guessInput = "";
    },
    
    // 重設遊戲
    resetGame() {
      this.gameStarted = false;
      this.guessCount = 0;
      this.historyList = [];
      this.guessInput = "";
      alert("遊戲已重設 🔁");
    },
    
    // 顯示答案
    showAnswer() {
      if (!this.gameStarted) {
        alert("請先開始遊戲！");
      } else {
        alert(`答案是：${this.answer}`);
      }
    }
  }
}).mount("#app");
