import { ExtensionEvent, UiEvent } from '../types';

chrome.runtime.onMessage.addListener((
  data: { type: ExtensionEvent } | { type: UiEvent; code: string; },
  sender,
  sendResponse,
) => {
  switch (data.type) {
    // 偵聽 background 主程式訊息
    case ExtensionEvent.CHECK_STATE:
      // 確認是在普通網頁
      sendResponse(JSON.stringify({
        href: window.location.href,
      }));
      sendResponse('ok');
      break;
    case UiEvent.EMIT_CODE:
      // 執行自訂 script
      // eslint-disable-next-line no-eval
      window.eval(`
        (function() {
          ${data.code}
        })();
      `);
      sendResponse('ok');
      break;
    default:
  }
});
