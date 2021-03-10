import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './GUI.scss';
import { IScriptItem, ISetting, UiEvent } from '../types';

const saveStorage = (scripts: Array<IScriptItem>) => {
  chrome.storage.local.set({ scripts });
};

const emitCode = (code?: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const { id } = tabs[0];
    if (id === undefined) return;
    chrome.tabs.sendMessage(
      id,
      { type: UiEvent.EMIT_CODE, code },
      (response) => {
        if (chrome.runtime.lastError) {
          console.log('lastError:', chrome.runtime.lastError);
        }
        if (response === 'ok') {
          // eslint-disable-next-line no-new
          new Notification(
            'Execution Succeed',
            { icon: '../icon48.png' },
          );
        }
      },
    );
  });
};

function render(result: { scripts?: Array<IScriptItem>, setting?: ISetting }) {
  const { scripts, setting } = result;
  ReactDOM.render(
    <App
      scripts={scripts}
      dark={setting?.dark}
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
    if (setting && setting.dark) {
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
