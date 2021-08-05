import { IScriptItem, UiEvent } from '../types';

function execute(code: string) {
  // eslint-disable-next-line no-eval
  window.eval(`(function(){${code}})();`);
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
