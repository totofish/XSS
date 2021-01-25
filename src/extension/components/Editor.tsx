import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { js } from 'js-beautify';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/mode/javascript/javascript';
import { IScriptItem } from '../../types';
import Stage from '../styled/Stage';
import Input from '../styled/Input';
import Button, { IconButton } from '../styled/Button';
import { theme } from '../styled/theme';

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

/* Styled Components */

const InputTitle = styled(Input)`
  width: calc(100% - 246px);
  height: 26px;
  margin-bottom: 8px;
  display: inline-block;
  color: ${(props) => props.theme.color.yallow};
  border: 1px dashed ${(props) => props.theme.color.redLine};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: 14px;

  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeight.normal};
    color:rgba(80, 80, 80, 0.35);
  }
`;

const ButtonArea = styled.div`
  right: 10px;
  position: absolute;
  display: inline-flex;
`;

const TextareaScript = styled(CodeMirror)`
  width: 100%;
  height: calc(100% - 36px);

  .CodeMirror-vscrollbar,
  .CodeMirror-hscrollbar {
    outline: none;
  }

  .CodeMirror {
    height: 100%;
    box-shadow: ${(props) => props.theme.boxShadow};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    padding: 0 6px;
    border: 1px dashed ${(props) => props.theme.color.redLine};
  }
  .CodeMirror-focused .CodeMirror-selected,
  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: ${(props) => props.theme.color.selection} !important;
  }
`;

/* Editor Component */

const Editor: FC<EditorProps> = ({
  scriptData,
  onSave,
  onDel,
  onCancel,
}: EditorProps) => {
  const [title, setTitle] = useState(scriptData ? scriptData.title || '' : '');
  const [code, setCode] = useState(scriptData ? scriptData.code || '' : '');
  const [fullscreen, setFullscreen] = useState(false);

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

  const handleToggleFullscreen = useCallback(() => {
    setFullscreen(!fullscreen);
  }, [fullscreen]);

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value || '');
  }, []);

  const handleCodeChange = useCallback((editor: unknown, data: unknown, value: string) => {
    setCode(value);
  }, []);

  useEffect(() => {
    // Maximum width and height limits for Chrome extensions
    const [availWidth, availHeight] = [800, 600];
    if (fullscreen) {
      document.body.style.width = `${availWidth}px`;
      document.body.style.height = `${availHeight}px`;
      if (document.fullscreenElement === null) {
        void document.documentElement.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement !== null) {
        void document.exitFullscreen();
      }
      document.body.removeAttribute('style');
    }

    return () => {
      if (document.fullscreenElement !== null) {
        void document.exitFullscreen();
      }
      document.body.removeAttribute('style');
    };
  }, [fullscreen]);

  return (
    <Stage $editor>
      <InputTitle
        type="text"
        maxLength={100}
        placeholder="Please enter a script title"
        value={title}
        onChange={handleTitleChange}
      />
      <ButtonArea>
        <IconButton
          type="button"
          hoverColor={theme.button.red}
          title="delete"
          onClick={handleDel}
        >
          <svg width="24px" height="24px">
            <use xlinkHref="../imgs/icons.svg#del" />
          </svg>
        </IconButton>
        <IconButton
          type="button"
          title="format"
          onClick={handleFormat}
        >
          <svg width="24px" height="24px">
            <use xlinkHref="../imgs/icons.svg#format" />
          </svg>
        </IconButton>
        <IconButton
          scale={0.9}
          type="button"
          title={fullscreen ? 'exit fullscreen' : 'fullscreen'}
          onClick={handleToggleFullscreen}
        >
          <svg width="24px" height="24px">
            <use xlinkHref={`../imgs/icons.svg#${fullscreen ? 'close_fullscreen' : 'fullscreen'}`} />
          </svg>
        </IconButton>
        <Button type="button" red onClick={handleSave}>Save</Button>
        <Button type="button" gray onClick={onCancel}>Cancel</Button>
      </ButtonArea>
      <TextareaScript
        value={code}
        onBeforeChange={handleCodeChange}
        options={options}
      />
    </Stage>
  );
};

Editor.defaultProps = {
  scriptData: undefined,
};

export default Editor;
