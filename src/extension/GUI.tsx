import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './GUI.scss';
import { IScriptItem, UiEvent } from '../types';

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

chrome.storage.local.get(
  ['scripts'],
  (result: { scripts?: Array<IScriptItem> }) => {
    ReactDOM.render(
      <App
        scripts={result.scripts}
        onSave={saveStorage}
        onEmitCode={emitCode}
      />,
      document.getElementById('root'),
    );
  },
);
