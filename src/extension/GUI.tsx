import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './GUI.scss';
import { IScriptItem, ISetting, UiEvent } from '../types';

let settingData: ISetting = {
  dark: process.env.DARK_THEME === 'true',
  notice: process.env.NOTICE === 'true',
};

const saveStorage = (scripts: Array<IScriptItem>) => {
  chrome.storage.local.set({ scripts });
};

const emitCode = (script: IScriptItem) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const { id } = tabs[0];
    if (id === undefined) return;
    chrome.tabs.sendMessage(
      id,
      { type: UiEvent.EMIT_CODE, code: script.code },
      (response) => {
        if (chrome.runtime.lastError) {
          console.log('lastError:', chrome.runtime.lastError);
        }
        if (response === 'ok' && settingData.notice) {
          // eslint-disable-next-line no-new
          new Notification(
            `Execute Script: ${script.title}`,
            { icon: '../icon48.png' },
          );
        }
      },
    );
  });
};

function render(result: { scripts?: Array<IScriptItem>, setting?: ISetting }) {
  const { scripts } = result;
  ReactDOM.render(
    <App
      scripts={scripts}
      dark={settingData.dark}
      onSave={saveStorage}
      onEmitCode={emitCode}
    />,
    document.getElementById('root'),
  );
}

chrome.storage.local.get(
  ['scripts', 'setting'],
  (result: { scripts?: Array<IScriptItem>, setting?: ISetting }) => {
    const { setting } = result;
    if (setting) {
      settingData = { ...settingData, ...setting };
    }
    if (settingData && settingData.dark) {
      document.documentElement.classList.add('dark');
    }

    const ready = () => {
      document.removeEventListener('DOMContentLoaded', ready, false);
      render(result);
    };

    if (document.getElementById('root')) {
      render(result);
    } else {
      document.addEventListener('DOMContentLoaded', ready, false);
    }
  },
);
