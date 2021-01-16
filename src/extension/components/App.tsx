import React, { FC, useCallback, useState } from 'react';
import List from './List';
import Editor from './Editor';
import { IScriptItem } from '../../types';

interface AppProps {
  scripts?: Array<IScriptItem>;
  onSave: (scripts: Array<IScriptItem>) => void;
  onEmitCode: (code?: string) => void;
}

enum Stage {
  LIST = 'LIST',
  EDITOR = 'EDITOR',
}

/* App Component */

const App: FC<AppProps> = ({
  scripts,
  onSave,
  onEmitCode,
}: AppProps) => {
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
    if (script) onEmitCode(script.code);
  }, [getScriptData, onEmitCode]);

  const save = useCallback((savelist: Array<IScriptItem>) => {
    setScriptList(savelist);
    if (onSave) onSave(savelist);
    setStage(Stage.LIST);
    setEditorTarget(undefined);
  }, [onSave]);

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

  return stage === Stage.LIST
    ? (
      <List
        scripts={scriptList}
        onMoveSort={handleSort}
        onEdit={handleEdit}
        onEmitCode={handleEmitCode}
        onImportScripts={handleImportScripts}
        onAdd={handleAddScript}
      />
    )
    : (
      <Editor
        onSave={handleEditorSave}
        onDel={handleEditorDel}
        onCancel={handleEditorCancel}
        scriptData={getScriptData(editorTarget)}
      />
    );
};

App.defaultProps = {
  scripts: [],
};

export default App;
