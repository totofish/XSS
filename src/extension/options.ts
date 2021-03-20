import { ISetting } from '../types';

let settingData: ISetting = {
  dark: process.env.DARK_THEME === 'true',
  notice: process.env.NOTICE === 'true',
};

function saveOptions(data: Partial<ISetting>) {
  settingData = {
    ...settingData,
    ...data,
  };
  chrome.storage.local.set({
    setting: settingData,
  });
}

function restoreOptions() {
  chrome.storage.local.get(
    ['setting'],
    (result: { setting?: ISetting }) => {
      const { setting } = result;
      const darkCheckbox = document.getElementById('dark')! as HTMLInputElement;
      const noticeCheckbox = document.getElementById('notice')! as HTMLInputElement;
      if (setting) {
        settingData = setting;
      }
      // theme
      if (setting && typeof setting.dark === 'boolean') {
        darkCheckbox.checked = setting.dark;
      } else {
        darkCheckbox.checked = false;
      }
      // notification
      if (setting && typeof setting.notice === 'boolean') {
        noticeCheckbox.checked = setting.notice;
      } else {
        noticeCheckbox.checked = false;
      }
    },
  );
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
