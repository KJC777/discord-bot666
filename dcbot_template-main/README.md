# Discord Bot Template

## 開始使用

1. 請先安裝 [Node.js](https://nodejs.org/) 18 或以上版本
2. 進入專案資料夾，執行 `npm i` 安裝相依模組

## 結構

```bash
.
├── README.md
├── index.js
├── commands
│   └── ping.js
├── package.json
├── package-lock.json
└── node_modules
```

- `README.md`：包含專案說明和使用指南的文件，就是你現在看到的這個文件。
- `index.js`：機器人的主程式，用來啟動 Discord Bot，並且載入所有指令和聆聽事件。
- `commands/`：資料夾，用來存放機器人指令的程式碼。每個指令都會是一個獨立的 JavaScript 文件。
  - `commands/ping.js`：Discord Bot 中 `ping` 指令的程式碼。
- `package.json`：JSON 文件，描述專案的基本資訊，包括專案名稱、版本、依賴的 Node.js 模組等等。
- `package-lock.json`：JSON 文件，記錄了專案當前所有安裝的 Node.js 模組的具體版本。（自動生成的，不要手動編輯它）
- `node_modules/`：資料夾，用來存放所有安裝的 Node.js 模組，你不需要在乎它的內容。

## 開發用命令

以下命令都需要在專案資料夾中執行。

- `npm i`：安裝專案所需的 Node.js 模組。
- `npm start`：啟動機器人。
- `npm run format`：使用 [Prettier](https://prettier.io/) 格式化程式碼。
