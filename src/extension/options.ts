import { ISetting } from '../types';

function saveOptions(dark: boolean) {
  chrome.storage.local.set({
    setting: {
      dark,
    } as ISetting,
  });
}

function restoreOptions() {
  chrome.storage.local.get(
    ['setting'],
    (result: { setting?: ISetting }) => {
      const { setting } = result;
      const checkBox = document.getElementById('dark')! as HTMLInputElement;
      if (setting && setting.dark) {
        checkBox.checked = true;
      } else {
        checkBox.checked = false;
      }
    },
  );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('dark')!.addEventListener('change', (event: Event) => {
  const checkBox = event.target! as HTMLInputElement;
  saveOptions(checkBox.checked);
});
