import { ISetting } from '../types';

let settingData: ISetting = {
  dark: import.meta.env.VITE_DARK_THEME === 'true',
  notice: import.meta.env.VITE_NOTICE === 'true',
};

function saveOptions(data: Partial<ISetting>) {
  settingData = {
    ...settingData,
    ...data,
  };
  if (!chrome.storage) return;
  void chrome.storage.local.set({
    setting: settingData,
  });
}

function syncUI(setting?: ISetting) {
  const darkCheckbox = document.getElementById('dark')! as HTMLInputElement;
  const noticeCheckbox = document.getElementById('notice')! as HTMLInputElement;
  // theme
  if (setting && typeof setting.dark === 'boolean') {
    darkCheckbox.checked = setting.dark;
  } else {
    darkCheckbox.checked = (import.meta.env.VITE_DARK_THEME === 'true');
  }
  // notification
  if (setting && typeof setting.notice === 'boolean') {
    noticeCheckbox.checked = setting.notice;
  } else {
    noticeCheckbox.checked = (import.meta.env.VITE_NOTICE === 'true');
  }
}

function restoreOptions() {
  if (chrome.storage) {
    chrome.storage.local.get(
      ['setting'],
      (result: { setting?: ISetting }) => {
        const { setting } = result;
        if (setting) {
          settingData = setting;
        }
        syncUI(settingData);
      },
    );
  } else {
    syncUI(settingData);
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('dark')!.addEventListener('change', (event: Event) => {
  const checkBox = event.target! as HTMLInputElement;
  saveOptions({
    dark: checkBox.checked,
  });
});
document.getElementById('notice')!.addEventListener('change', (event: Event) => {
  const checkBox = event.target! as HTMLInputElement;
  saveOptions({
    notice: checkBox.checked,
  });
});
