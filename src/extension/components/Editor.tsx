import React, { FC, useState } from 'react';
import { js } from 'js-beautify';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/mode/javascript/javascript';
import { IScriptItem } from '../../types';

interface EditorProps {
  scriptData?: IScriptItem;
  onSave: (value: IScriptItem) => void,
  onDel: () => void,
  onCancel: () => void,
}

const Editor: FC<EditorProps> = ({
  scriptData,
  onSave,
  onDel,
  onCancel,
}: EditorProps) => {
  const [title, setTitle] = useState(scriptData ? scriptData.title || '' : '');
  const [code, setCode] = useState(scriptData ? scriptData.code || '' : '');

  const handleSave = () => {
    const data: IScriptItem = {
      title: title ? title.trim() : '',
      code: code ? code.trim() : '',
    };
    if (onSave) onSave(data);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleDel = () => {
    setTitle('');
    setCode('');
    if (onDel) onDel();
  };

  const handleFormat = () => {
    setCode(
      js(code, { indent_size: 2 }),
    );
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
        maxLength={100}
        placeholder="Please enter a script title"
        value={title}
        onChange={handleTitleChange}
      />
      <div className="btns">
        <button type="button" className="del" title="delete" onClick={handleDel}>
          <svg width="26px" height="26px">
            <use xlinkHref="../imgs/del.svg#del" />
          </svg>
        </button>
        <button type="button" className="format" title="format" onClick={handleFormat}>
          <svg width="26px" height="26px">
            <use xlinkHref="../imgs/format-line-icon.svg#format_line_icon" />
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
