import React, { FC, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/mode/javascript/javascript';
import { IScriptItem } from '../../types';

interface EditorProps {
  scriptData?: IScriptItem;
  onSubmit: (value?: IScriptItem) => void,
}

const Editor: FC<EditorProps> = ({
  scriptData,
  onSubmit,
}: EditorProps) => {
  const [title, setTitle] = useState(scriptData ? scriptData.title || '' : '');
  const [code, setCode] = useState(scriptData ? scriptData.code || '' : '');

  const handleSave = () => {
    let data;
    if (title || code) {
      data = {
        title: title ? title.trim() : '',
        code: code ? code.trim() : '',
      };
    }
    if (onSubmit) onSubmit(data);
  };

  const handleCancel = () => {
    if (onSubmit) onSubmit(undefined);
  };

  const handleDel = () => {
    const data = {
      title: '',
      code: '',
    };
    setTitle('');
    setCode('');
    if (onSubmit) onSubmit(data);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value || '');
  };

  const handleCodeChange = (editor: unknown, data: unknown, value: string) => {
    setCode(value);
  };

  const options = {
    lineNumbers: false,
    mode: 'javascript',
    theme: 'neo',
  };

  return (
    <div className="editor">
      <input
        type="text"
        className="input-title"
        maxLength={30}
        placeholder="Please enter a script title"
        value={title}
        onChange={handleTitleChange}
      />
      <div className="btns">
        <button type="button" className="del" title="del" onClick={handleDel}>
          <svg width="26px" height="26px">
            <use xlinkHref="../imgs/del.svg#del" />
          </svg>
        </button>
        <button type="button" className="red" onClick={handleSave}>Save</button>
        <button type="button" className="gray" onClick={handleCancel}>Cancel</button>
      </div>
      <CodeMirror
        className="textarea-script"
        value={code}
        onBeforeChange={handleCodeChange}
        options={options}
      />
    </div>
  );
};

Editor.defaultProps = {
  scriptData: undefined,
};

export default Editor;
