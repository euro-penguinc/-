const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// CORS 설정
app.use(cors());

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, "client/build")));

// API 엔드포인트 설정 (예시)
app.post("/api/health-assessment", (req, res) => {
  // 데이터 처리 로직...
});

// 모든 요청에 대해 index.html을 반환
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
