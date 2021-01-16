import React, { FC, useCallback, useState } from 'react';
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

const options = {
  lineNumbers: false,
  mode: 'javascript',
  theme: 'neo',
};

/* Editor Component */

const Editor: FC<EditorProps> = ({
  scriptData,
  onSave,
  onDel,
  onCancel,
}: EditorProps) => {
  const [title, setTitle] = useState(scriptData ? scriptData.title || '' : '');
  const [code, setCode] = useState(scriptData ? scriptData.code || '' : '');

  const handleSave = useCallback(() => {
    const data: IScriptItem = {
      title: title ? title.trim() : '',
      code: code ? code.trim() : '',
    };
    if (onSave) onSave(data);
  }, [title, code, onSave]);

  const handleDel = useCallback(() => {
    setTitle('');
    setCode('');
    if (onDel) onDel();
  }, [onDel]);

  const handleFormat = useCallback(() => {
    setCode(
      js(code, { indent_size: 2 }),
    );
  }, [code]);

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value || '');
  }, []);

  const handleCodeChange = useCallback((editor: unknown, data: unknown, value: string) => {
    setCode(value);
  }, []);

  return (
    <section className="editor">
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
        <button type="button" className="gray" onClick={onCancel}>Cancel</button>
      </div>
      <CodeMirror
        className="textarea-script"
        value={code}
        onBeforeChange={handleCodeChange}
        options={options}
      />
    </section>
  );
};

Editor.defaultProps = {
  scriptData: undefined,
};

export default Editor;
