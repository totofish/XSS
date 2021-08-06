<img width="150" src="docs/Icon.png">

[![GitHub license](https://img.shields.io/github/license/totofish/XSS.svg)](https://github.com/totofish/XSS/blob/master/LICENSE)
![main workflow](https://github.com/totofish/XSS/actions/workflows/main.yml/badge.svg)

## Introduction

此為 chrome extension 工具，可以注入自訂 `Script` 於當前網頁頁面中，例如將 Jquery 載入頁面來方便操作 DOM，或是讀取 cookie 資訊等任何其他想執行的 JS Script，用以方便作為測試或開發除錯等目的。

## Extension Install

至 [Chrome 線上應用程式商店](https://chrome.google.com/webstore/detail/xss/bebjbdbgpmgdlfehkibnmgmbkcniaeij) 安裝

## Export and Import Scripts

對外掛小圖示按右鍵選擇 `Export Scripts` 會將目前所有 Scripts 下載為 `scripts.json`，可讓別人將檔案 Drag 進 XSS 開啟的視窗介面 import 便能匯入 Scripts。

## Auto Execute

v1.1.0 版新增 Auto Execute 功能，切換前方 Auto Execute 狀態後，重整網頁時會在一開始便直接執行 scripts，方便執行一些需要一開始便執行的任務，例如使用 [Polly.js](https://netflix.github.io/pollyjs/) 來處理 mock api 的行為。不過須自己注意所攥寫的 script 不會造成無限重整頁面。

```js
// 例如這一段 script 啟用 Auto Execute 後會一直重整頁面
location.reload()
```

## Extension

<img width="469" src="docs/dark_theme_1.png">
<img width="800" src="docs/dark_theme_2.png">

## Dark Theme

外掛小圖示按右鍵選擇 `選項` 可取消 `Dark Theme` 改使用 `Light Theme`

<img width="469" src="docs/light_theme_1.png">
<img width="800" src="docs/light_theme_2.png">

## Tips

於 Chrome Extension 中執行的 script 可以直接取得 document 並實際修改頁面元素，但安全性考量上 script 執行的 window 環境是與 browser 頁面的 window 環境隔離的，因此你無法直接取得或修改 window 上的參數資料。

例如頁面上有一 data 資料，你將無法直接透過執行 `console.log(data)` 來取得頁面上的資料。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script>
      var data = 1;
    </script>
</head>
```

如果你必須這麼做用以進行後續的自動化行為你可以用此方法讓 script 執行於頁面本身實際的 window 環境上。

```js
const script = document.createElement('script');
document.body.appendChild(script);
// 實際要運行的 code
script.innerHTML = `
  console.log(data);
  data++;
  console.log(data);
`;
```