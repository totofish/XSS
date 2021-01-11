import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './GUI.scss';
import { IScriptItem, UiEvent } from '../types';

const saveStorage = (storageName: string, script: IScriptItem) => {
  chrome.storage.local.set({ [storageName]: script });
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
  ReactDOM.render(
    <App
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...result}
      onSave={saveStorage}
      onEmitCode={emitCode}
    />,
    document.getElementById('root'),
  );
});
