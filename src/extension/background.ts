import { js } from 'js-beautify';
import { Base64 } from 'js-base64';
import { IScriptItem, MenuItemId } from '../types';

/**
 * 外掛常駐背景程式
 * background.js 在打開 chrome 後只會觸發一次
 */

// 導出所有腳本
function exportScripts() {
  chrome.storage.local.get(
    ['scripts'], (result: { scripts?: Array<IScriptItem> }) => {
      const scriptsData = JSON.stringify(result.scripts);
      // Save as file
      const url = `data:application/json;base64,${Base64.encode(scriptsData)}`;
      chrome.downloads.download({
        url,
        filename: 'scripts.json',
      });
    },
  );
}

// 主選單設置 - 外掛安裝時
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MenuItemId.ABOUT_XSS,
    title: 'About XSS',
    contexts: ['browser_action'],
  });
  chrome.contextMenus.create({
    id: MenuItemId.EXPORT_SCRIPTS,
    title: 'Export Scripts',
    contexts: ['browser_action'],
  });
  // 塞入預設 script example
  const scripts: Array<IScriptItem> = [
    {
      title: 'Inject Jquery',
      autoExecute: false,
      code: js(`
        var script = document.createElement('script');
        document.documentElement.appendChild(script);
        script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
      `, { indent_size: 2 }),
    }, {
      title: 'Get Cookie',
      autoExecute: false,
      code: js(`
        function getCookie() {
          if (document.cookie.length > 0) {
            const cookies = document.cookie.split(';');
            if (cookies.length > 0) {
              return cookies.reduce((obj, text) => {
                const fragment = text.split('=');
                if (fragment.length > 1) {
                  return Object.assign(obj, {
                    [fragment[0]]: unescape(fragment.splice(1).join('')),
                  });
                }
                return obj;
              }, {});
            }
          }
          return {};
        }
        alert(JSON.stringify(getCookie(), null, 2));
      `, { indent_size: 2 }),
    },
  ];
  chrome.storage.local.get(
    ['scripts'],
    (result: { scripts?: Array<IScriptItem> }) => {
      if (!result.scripts) {
        void chrome.storage.local.set({ scripts });
      }
    },
  );
});

// 點擊自訂選單時
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === MenuItemId.ABOUT_XSS) {
    void chrome.tabs.create({
      url: 'https://github.com/totofish/XSS',
    });
  } else if (info.menuItemId === MenuItemId.EXPORT_SCRIPTS) {
    exportScripts();
  }
});

chrome.runtime.onMessage.addListener((event: { type: MenuItemId; }, sender, sendResponse) => {
  switch (event.type) {
    case MenuItemId.EXPORT_SCRIPTS:
      exportScripts();
      sendResponse('ok');
      break;
    default:
  }
});
