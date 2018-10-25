chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  switch (data.type) {
    case 'checkState': // 偵聽 background 主程式訊息
      // 確認是在普通網頁
      sendResponse(JSON.stringify({
        href: window.location.href
      }));
      break;
    case 'emitCode':
      // 執行自訂 script
      window.eval(`
        (function() {
          ${data.code}
        })();
      `);
      sendResponse('ok');
      break;
    default:
      //
  }
});
