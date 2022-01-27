import React, {
  FC, useCallback, useState, useEffect, useMemo,
} from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { lighten } from 'polished';
import fileHelper from '../utility/fileHelper';
import importFormatHelper from '../utility/importFormatHelper';
import { ISetting, IScriptItem } from '../../types';
import { Color } from '../styled/theme';

interface ICheckbox {
  id: string;
  label: string;
  checked: boolean;
}

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  color: ${Color.LIGHT_RED} !important;
  background: ${Color.WHITE} !important;
  border-radius: 4px;
  border: 2px solid ${Color.LIGHT_RED};
  margin: 0 12px 0 0;
  padding: 0 8px;
  font-weight: 600;
  height: 35px;
  cursor: pointer;
  box-shadow: none !important;
  text-shadow: none !important;

  img {
    margin-right: 2px;
  }

  &:last-of-type {
    margin-right: 0;
  }

  &:focus {
    border-color: ${Color.LIGHT_RED} !important;
  }

  &:hover {
    background-image: none !important;
    color: ${lighten(0.12, Color.LIGHT_RED)} !important;
    border-color: ${lighten(0.12, Color.LIGHT_RED)} !important;
  }

  ${(props) => props.primary && css`
    background: ${Color.LIGHT_RED} !important;
    color: ${Color.WHITE} !important;

    &:hover {
      background-image: none !important;
      background: ${lighten(0.05, Color.LIGHT_RED)} !important;
      color: ${Color.WHITE} !important;
      border-color: ${lighten(0.05, Color.LIGHT_RED)} !important;
    }
  `}
`;

interface AreaProps {
  desc: string;
}

const Area = styled.div<AreaProps>`
  position: relative;
  display: flex;
  border: 1px solid ${Color.LIGHT_GRAY};
  padding: 20px 16px;
  border-radius: 3px;
  margin-top: 16px;

  &:first-of-type {
    margin-top: 8px;
  }

  ${(props) => css`
    &::after {
      position: absolute;
      content: '${props.desc}';
      color: ${Color.LIGHT_GRAY};
      padding: 0 8px;
      background: white;
      left: 12px;
      top: -10px;
      font-size: 14px;
      font-weight: 600;
    }
  `}
`;

const Label = styled.label`
  display: inline-block;
  margin-right: 20px;
  color: ${Color.DARK};

  input {
    margin-right: 5px !important;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const Container = styled.section`
  padding: 10px;
`;

const DropMask = styled.div`
  pointer-events: none;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.75);

  .drop-mask-line {
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    border: 2px dashed ${Color.YALLOW};
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
`;

const useCheckbox = ({ id, label, checked }: ICheckbox) => {
  const [value, setValue] = useState(checked);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  }, [setValue]);
  const input = (
    <Label htmlFor={id}>
      <input id={id} checked={value} type="checkbox" onChange={handleChange} />
      {label}
    </Label>
  );
  return [value, input];
};

/* App Component */

interface AppProps {
  setting: ISetting;
  onSave: (setting: ISetting) => void;
  onImportScripts: (scripts: Array<IScriptItem>) => void;
  onExportScripts: () => void;
}

const App: FC<AppProps> = ({
  setting,
  onSave,
  onImportScripts,
  onExportScripts,
}: AppProps) => {
  const [dark, darkCheckbox] = useCheckbox({ id: 'dark', label: 'Dark Theme', checked: setting.dark });
  const [notice, noticeCheckbox] = useCheckbox({ id: 'notice', label: 'Execution Notice', checked: setting.notice });

  const [importState, setImportState] = useState<'' | 'success' | 'error'>('');
  const handleDrop = useCallback(async (acceptedFiles: Array<File>) => {
    const data = await fileHelper<Array<IScriptItem>>(acceptedFiles).catch(() => {
      setImportState('error');
    });
    if (!Array.isArray(data)) return;
    const savelist = importFormatHelper(data);
    setImportState('success');
    onImportScripts(savelist);
  }, [onImportScripts]);

  const {
    getRootProps, getInputProps, open, isDragActive,
  } = useDropzone({ onDrop: handleDrop, noClick: true, noKeyboard: true });

  const renderDropMask = useMemo(() => {
    if (!isDragActive) return <></>;
    return (
      <DropMask>
        <div className="drop-mask-line">
          <img width="40" height="40" alt="" src="../imgs/drop.svg" />
        </div>
      </DropMask>
    );
  }, [isDragActive]);

  useEffect(() => {
    onSave({
      dark,
      notice,
    } as ISetting);
  }, [dark, notice, onSave]);

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Container {...getRootProps()}>
      <Area desc="Setting">
        { darkCheckbox }
        { noticeCheckbox }
      </Area>
      <Area desc="Scripts">
        <input {...getInputProps()} />
        <Button type="button" primary onClick={open}>
          {
            importState === ''
              ? null
              : <img width="25" height="25" alt={importState} src={`../imgs/${importState}.svg`} />
          }
          <span>Import Scripts</span>
        </Button>
        <Button type="button" onClick={onExportScripts}>Export Scripts</Button>
      </Area>
      { renderDropMask }
    </Container>
  );
};

App.defaultProps = {};

export default App;
