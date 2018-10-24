import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './GUI.scss';

const saveStorage = (storageName, script) => {
  chrome.storage.local.set({ [storageName]: script });
};

const emitCode = (code) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        type: 'emitCode',
        code,
      },
      (response) => {
        if (response === 'ok'){
          new Notification(
            'Execution Succeed',
            { icon: '../icon48.png' },
          );
        }
      });
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
      {...result}
      onSave={saveStorage}
      onEmitCode={emitCode}
    />,
    document.getElementById('root'),
  );
});