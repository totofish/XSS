import { js } from 'js-beautify';
import { Base64 } from 'js-base64';

/**
 * 外掛常駐背景程式
 * background.js 在打開 chrome 後只會觸發一次
 */

let timeOutId;

// 更新 icon 狀態
const updateIcon = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // tabs 還未有資料或功能停用時
    if (tabs.length === 0) {
      chrome.browserAction.setIcon({ path: 'icon16-gray.png' });
      chrome.browserAction.disable();
      return;
    }
    // 偵測是否有狀態
    chrome.tabs.sendMessage(tabs[0].id, { type: 'checkState' }, (response) => {
      if (response) {
        chrome.browserAction.setIcon({ path: 'icon16.png' });
        chrome.browserAction.enable();
      } else {
        chrome.browserAction.setIcon({ path: 'icon16-gray.png' });
        chrome.browserAction.disable();
      }
    });
  });
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
      filename: 'scripts.json'
    });
  });
}

// 頁籤更新
chrome.tabs.onUpdated.addListener(() => {
  clearTimeout(timeOutId);
  timeOutId = setTimeout(updateIcon, 100);
});
// 頁籤切換
chrome.tabs.onSelectionChanged.addListener(updateIcon);


// 主選單設置 - 外掛安裝時
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: 'about-xss',
    title: "About XSS",
    contexts:['browser_action']
  });
  chrome.contextMenus.create({
    id: 'export-scripts',
    title: "Export Scripts",
    contexts:['browser_action']
  });
  // 塞入預設 script example
  const script1 = {
    title: 'Inject Jquery',
    code: js(`
      var script = document.createElement('script');
      document.getElementsByTagName("body")[0].appendChild(script);
      script.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
    `, { indent_size: 2 }),
  }
  const script2 = {
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
  }
  chrome.storage.local.get([
    'script1',
    'script2',
  ], (result) => {
    if (!result['script1'] || (!result['script1'].title && !result['script1'].code)) chrome.storage.local.set({ script1 });
    if (!result['script2'] || (!result['script2'].title && !result['script2'].code)) chrome.storage.local.set({ script2 });
  });
});

// 點擊自訂選單時
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'about-xss') {
    chrome.tabs.create({
      url: 'https://github.com/totofish/XSS'
    });
  } else if (info.menuItemId === 'export-scripts') {
    exportScripts();
  }
});


updateIcon();