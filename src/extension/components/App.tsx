import React, { FC, useState } from 'react';
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

const App: FC<AppProps> = ({
  scripts,
  onSave,
  onEmitCode,
}: AppProps) => {
  const [scriptList, setScriptList] = useState(scripts || [] as Array<IScriptItem>);
  const [stage, setStage] = useState(Stage.LIST);
  const [editorTarget, setEditorTarget] = useState<number | undefined>(undefined);

  const handleEdit = (scriptIndex: number) => {
    setStage(Stage.EDITOR);
    setEditorTarget(scriptIndex);
  };

  const getScriptData = (
    scriptIndex?: number,
  ): IScriptItem | undefined => (
    scriptIndex === undefined ? undefined : scriptList[scriptIndex]
  );

  const handleEmitCode = (scriptIndex: number) => {
    if (!onEmitCode) return;
    const script = getScriptData(scriptIndex);
    if (script) onEmitCode(script.code);
  };

  const save = (savelist: Array<IScriptItem>) => {
    setScriptList(savelist);
    if (onSave) onSave(savelist);
    setStage(Stage.LIST);
    setEditorTarget(undefined);
  };

  const handleImportScripts = (data: Array<IScriptItem>) => {
    if (!Array.isArray(data)) return;

    let savelist: Array<IScriptItem> = [...data];
    savelist = savelist.filter((item) => (
      Object.prototype.hasOwnProperty.call(item, 'title')
        && Object.prototype.hasOwnProperty.call(item, 'code')
    ));
    savelist.map((item) => ({ title: item.title, code: item.code }));

    save(savelist);
  };

  const handleEditorCancel = () => {
    setStage(Stage.LIST);
    setEditorTarget(undefined);
  };

  const handleEditorDel = () => {
    if (editorTarget === undefined) return;

    let savelist: Array<IScriptItem> = [...scriptList];
    savelist.splice(editorTarget, 1);
    savelist = savelist.filter((item) => item);

    save(savelist);
  };

  const handleEditorSave = (value: IScriptItem) => {
    if (editorTarget === undefined) return;

    let savelist: Array<IScriptItem> = [...scriptList];
    savelist[editorTarget] = value;
    savelist = savelist.filter((item) => item);

    save(savelist);
  };

  const handleAddScript = () => {
    setStage(Stage.EDITOR);
    setEditorTarget(scriptList.length);
  };

  const handleSort = (startIndex: number, endIndex: number) => {
    const savelist = [...scriptList];
    const [removed] = savelist.splice(startIndex, 1);
    savelist.splice(endIndex, 0, removed);
    save(savelist);
  };

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
