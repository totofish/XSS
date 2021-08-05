import React, { FC, useCallback, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import List from './List';
import Editor from './Editor';
import GlobalStyle from '../styled/GlobalStyle';
import { themes } from '../styled/theme';
import { IScriptItem } from '../../types';
import { StyleTheme } from '../../styled.d';

interface AppProps {
  scripts?: Array<IScriptItem>;
  dark?: boolean;
  onSave: (scripts: Array<IScriptItem>) => void;
  onEmitCode: (script: IScriptItem) => void;
}

enum Stage {
  LIST = 'LIST',
  EDITOR = 'EDITOR',
}

/* App Component */

const App: FC<AppProps> = ({
  scripts,
  dark,
  onSave,
  onEmitCode,
}: AppProps) => {
  const [currentTheme] = useState<StyleTheme>(
    dark ? StyleTheme.DARK : StyleTheme.LIGHT,
  );
  const [scriptList, setScriptList] = useState(scripts || [] as Array<IScriptItem>);
  const [stage, setStage] = useState(Stage.LIST);
  const [editorTarget, setEditorTarget] = useState<number | undefined>(undefined);

  const handleEdit = useCallback((scriptIndex: number) => {
    setStage(Stage.EDITOR);
    setEditorTarget(scriptIndex);
  }, []);

  const getScriptData = useCallback((
    scriptIndex?: number,
  ): IScriptItem | undefined => (
    scriptIndex === undefined ? undefined : scriptList[scriptIndex]
  ), [scriptList]);

  const handleEmitCode = useCallback((scriptIndex: number) => {
    if (!onEmitCode) return;
    const script = getScriptData(scriptIndex);
    if (script) onEmitCode(script);
  }, [getScriptData, onEmitCode]);

  const save = useCallback((savelist: Array<IScriptItem>) => {
    setScriptList(savelist);
    if (onSave) onSave(savelist);
    setStage(Stage.LIST);
    setEditorTarget(undefined);
  }, [onSave]);

  const handleToggleAutoExecute = useCallback((scriptIndex: number) => {
    const savelist: Array<IScriptItem> = [...scriptList];
    savelist[scriptIndex].autoExecute = !savelist[scriptIndex].autoExecute;
    save(savelist);
  }, [scriptList, save]);

  const handleImportScripts = useCallback((data: Array<IScriptItem>) => {
    if (!Array.isArray(data)) return;

    let savelist: Array<IScriptItem> = [...data];
    savelist = savelist.filter((item) => (
      Object.prototype.hasOwnProperty.call(item, 'title')
        && Object.prototype.hasOwnProperty.call(item, 'code')
    ));
    savelist.map((item) => ({ title: item.title, code: item.code }));

    save(savelist);
  }, [save]);

  const handleEditorCancel = useCallback(() => {
    setStage(Stage.LIST);
    setEditorTarget(undefined);
  }, []);

  const handleEditorDel = useCallback(() => {
    if (editorTarget === undefined) return;

    let savelist: Array<IScriptItem> = [...scriptList];
    savelist.splice(editorTarget, 1);
    savelist = savelist.filter((item) => item);

    save(savelist);
  }, [scriptList, editorTarget, save]);

  const handleEditorSave = useCallback((value: IScriptItem) => {
    if (editorTarget === undefined) return;

    let savelist: Array<IScriptItem> = [...scriptList];
    savelist[editorTarget] = value;
    savelist = savelist.filter((item) => item);

    save(savelist);
  }, [scriptList, editorTarget, save]);

  const handleAddScript = useCallback(() => {
    setStage(Stage.EDITOR);
    setEditorTarget(scriptList.length);
  }, [scriptList]);

  const handleSort = useCallback((startIndex: number, endIndex: number) => {
    const savelist = [...scriptList];
    const [removed] = savelist.splice(startIndex, 1);
    savelist.splice(endIndex, 0, removed);
    save(savelist);
  }, [scriptList, save]);

  const view = stage === Stage.LIST
    ? (
      <List
        scripts={scriptList}
        onMoveSort={handleSort}
        onEdit={handleEdit}
        onEmitCode={handleEmitCode}
        onImportScripts={handleImportScripts}
        onAdd={handleAddScript}
        onToggleAutoExecute={handleToggleAutoExecute}
      />
    )
    : (
      <Editor
        dark={dark}
        onSave={handleEditorSave}
        onDel={handleEditorDel}
        onCancel={handleEditorCancel}
        scriptData={getScriptData(editorTarget)}
      />
    );

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyle />
      { view }
    </ThemeProvider>
  );
};

App.defaultProps = {
  scripts: [],
  dark: false,
};

export default App;
