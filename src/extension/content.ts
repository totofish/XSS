import { IScriptItem, UiEvent } from '../types';

function execute(code: string) {
  const script = document.createElement('script');
  document.documentElement.appendChild(script);
  // 使用 Promise 來延遲執行，確保 script.remove(); 先執行完畢，這樣讀取 document.body 內容時就不會讀到本身 script
  script.innerHTML = `
    (new Promise((resolve, reject) => {
      resolve()
    })).then(() => {
      ${code}
    })
  `;
  script.remove();
}

chrome.storage.local.get(
  ['scripts'],
  (result: { scripts?: Array<IScriptItem> }) => {
    if (result.scripts) {
      result.scripts.forEach((scriptItem) => {
        if (scriptItem.autoExecute && scriptItem.code) {
          execute(scriptItem.code);
        }
      });
    }
  },
);

chrome.runtime.onMessage.addListener((
  event: { type: UiEvent; code: string; },
  sender,
  sendResponse,
) => {
  switch (event.type) {
    case UiEvent.EMIT_CODE:
      // 執行自訂 script
      execute(event.code);
      sendResponse('ok');
      break;
    default:
  }
});
