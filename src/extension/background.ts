import { js } from 'js-beautify';
import { Base64 } from 'js-base64';
import { IScriptItem, ExtensionEvent } from '../types';

/**
 * 外掛常駐背景程式
 * background.js 在打開 chrome 後只會觸發一次
 */

const control = {
  // disable extension
  disableExtension: () => {
    chrome.browserAction.setIcon({ path: 'icon16-gray.png' });
    chrome.browserAction.disable();
  },
  // enable extension
  enableExtension: () => {
    chrome.browserAction.setIcon({ path: 'icon16.png' });
    chrome.browserAction.enable();
  },
  // 更新 icon 狀態
  updateIcon: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // tabs 還未有資料或功能停用時
      if (tabs.length === 0) {
        control.disableExtension();
        return;
      }
      const { id, url } = tabs[0];
      // 偵測是否有狀態// 非正常網頁
      if (!url || !/^https?:/.test(url)) {
        control.disableExtension();
        return;
      }
      if (id === undefined) return;

      chrome.tabs.sendMessage(id, { type: ExtensionEvent.CHECK_STATE }, (response) => {
        if (chrome.runtime.lastError) {
          // 與 content 的連接尚未完成則跳脫
          control.disableExtension();
          return;
        }

        if (response) {
          control.enableExtension();
        } else {
          control.disableExtension();
        }
      });
    });
  },
};

// 導出所有腳本
function exportScripts() {
  chrome.storage.local.get([
    'script1',
    'script2',
    'script3',
    'script4',
    'script5',
    'script6',
    'script7',
    'script8',
    'script9',
  ], (result) => {
    const scriptsData = JSON.stringify(result);
    // Save as file
    const url = `data:application/json;base64,${Base64.encode(scriptsData)}`;
    chrome.downloads.download({
      url,
      filename: 'scripts.json',
    });
  });
}

// 頁籤更新
chrome.tabs.onUpdated.addListener(control.updateIcon);
// 頁籤切換
chrome.tabs.onActivated.addListener(control.updateIcon);

// 主選單設置 - 外掛安裝時
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'about-xss',
    title: 'About XSS',
    contexts: ['browser_action'],
  });
  chrome.contextMenus.create({
    id: 'export-scripts',
    title: 'Export Scripts',
    contexts: ['browser_action'],
  });
  // 塞入預設 script example
  const script1: IScriptItem = {
    title: 'Inject Jquery',
    code: js(`
      var script = document.createElement('script');
      document.getElementsByTagName("body")[0].appendChild(script);
      script.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
    `, { indent_size: 2 }),
  };
  const script2: IScriptItem = {
    title: 'Get Cookie',
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
  };
  chrome.storage.local.get([
    'script1',
    'script2',
  ], (result: { script1?: IScriptItem; script2?: IScriptItem; }) => {
    if (!result.script1 || (!result.script1.title && !result.script1.code)) {
      chrome.storage.local.set({ script1 });
    }
    if (!result.script2 || (!result.script2.title && !result.script2.code)) {
      chrome.storage.local.set({ script2 });
    }
  });
});

// 點擊自訂選單時
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'about-xss') {
    chrome.tabs.create({
      url: 'https://github.com/totofish/XSS',
    });
  } else if (info.menuItemId === 'export-scripts') {
    exportScripts();
  }
});
