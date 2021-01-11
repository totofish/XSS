import React, { FC, useState } from 'react';
import List from './List';
import Editor from './Editor';
import { SaveScriptItems, IScriptItem, ScriptItemKeys } from '../../types';

interface AppProps {
  script1?: IScriptItem;
  script2?: IScriptItem;
  script3?: IScriptItem;
  script4?: IScriptItem;
  script5?: IScriptItem;
  script6?: IScriptItem;
  script7?: IScriptItem;
  script8?: IScriptItem;
  script9?: IScriptItem;
  onSave: (storageName: string, script: IScriptItem) => void;
  onEmitCode: (code: string | undefined) => void;
}

enum Stage {
  LIST = 'LIST',
  EDITOR = 'EDITOR',
}

const App: FC<AppProps> = ({
  script1,
  script2,
  script3,
  script4,
  script5,
  script6,
  script7,
  script8,
  script9,
  onSave,
  onEmitCode,
}: AppProps) => {
  const [scriptState1, setScriptState1] = useState(script1);
  const [scriptState2, setScriptState2] = useState(script2);
  const [scriptState3, setScriptState3] = useState(script3);
  const [scriptState4, setScriptState4] = useState(script4);
  const [scriptState5, setScriptState5] = useState(script5);
  const [scriptState6, setScriptState6] = useState(script6);
  const [scriptState7, setScriptState7] = useState(script7);
  const [scriptState8, setScriptState8] = useState(script8);
  const [scriptState9, setScriptState9] = useState(script9);
  const [stage, setStage] = useState(Stage.LIST);
  const [editorTarget, setEditorTarget] = useState<ScriptItemKeys>();

  const handleSet = (scriptName: ScriptItemKeys) => {
    setStage(Stage.EDITOR);
    setEditorTarget(scriptName);
  };

  const scriptData = (scriptName?: ScriptItemKeys): IScriptItem | undefined => {
    switch (scriptName) {
      case 'script1':
        return scriptState1;
      case 'script2':
        return scriptState2;
      case 'script3':
        return scriptState3;
      case 'script4':
        return scriptState4;
      case 'script5':
        return scriptState5;
      case 'script6':
        return scriptState6;
      case 'script7':
        return scriptState7;
      case 'script8':
        return scriptState8;
      case 'script9':
        return scriptState9;
      default:
        return undefined;
    }
  };

  const handleEmitCode = (scriptName: ScriptItemKeys) => {
    if (!onEmitCode) return;

    switch (scriptName) {
      case 'script1':
        onEmitCode(script1?.code);
        break;
      case 'script2':
        onEmitCode(script2?.code);
        break;
      case 'script3':
        onEmitCode(script3?.code);
        break;
      case 'script4':
        onEmitCode(script4?.code);
        break;
      case 'script5':
        onEmitCode(script5?.code);
        break;
      case 'script6':
        onEmitCode(script6?.code);
        break;
      case 'script7':
        onEmitCode(script7?.code);
        break;
      case 'script8':
        onEmitCode(script8?.code);
        break;
      case 'script9':
        onEmitCode(script9?.code);
        break;
      default:
    }
  };

  const handleImportScripts = (data: SaveScriptItems) => {
    const scriptRange = ['script1', 'script2', 'script3', 'script4', 'script5', 'script6', 'script7', 'script8', 'script9'];
    Object.keys(data).forEach((key) => {
      if (scriptRange.includes(key)) {
        const value = data[key as keyof SaveScriptItems]!;
        if (onSave) onSave(key, value);
        switch (key) {
          case 'script1':
            setScriptState1(value);
            break;
          case 'script2':
            setScriptState2(value);
            break;
          case 'script3':
            setScriptState3(value);
            break;
          case 'script4':
            setScriptState4(value);
            break;
          case 'script5':
            setScriptState5(value);
            break;
          case 'script6':
            setScriptState6(value);
            break;
          case 'script7':
            setScriptState7(value);
            break;
          case 'script8':
            setScriptState8(value);
            break;
          case 'script9':
            setScriptState9(value);
            break;
          default:
        }
      }
    });
  };

  const handleEditor = (value?: IScriptItem) => {
    if (!value) {
      // cancel
      setStage(Stage.LIST);
      setEditorTarget(undefined);
      return;
    }
    if (onSave && editorTarget) onSave(editorTarget, value);

    switch (editorTarget) {
      case 'script1':
        setScriptState1(value);
        break;
      case 'script2':
        setScriptState2(value);
        break;
      case 'script3':
        setScriptState3(value);
        break;
      case 'script4':
        setScriptState4(value);
        break;
      case 'script5':
        setScriptState5(value);
        break;
      case 'script6':
        setScriptState6(value);
        break;
      case 'script7':
        setScriptState7(value);
        break;
      case 'script8':
        setScriptState8(value);
        break;
      case 'script9':
        setScriptState9(value);
        break;
      default:
    }
    setStage(Stage.LIST);
    setEditorTarget(undefined);
  };

  return stage === Stage.LIST
    ? (
      <List
        script1={scriptState1}
        script2={scriptState2}
        script3={scriptState3}
        script4={scriptState4}
        script5={scriptState5}
        script6={scriptState6}
        script7={scriptState7}
        script8={scriptState8}
        script9={scriptState9}
        onSet={handleSet}
        onEmitCode={handleEmitCode}
        onImportScripts={handleImportScripts}
      />
    )
    : (
      <Editor
        onSubmit={handleEditor}
        scriptData={scriptData(editorTarget)}
      />
    );
};

App.defaultProps = {
  script1: undefined,
  script2: undefined,
  script3: undefined,
  script4: undefined,
  script5: undefined,
  script6: undefined,
  script7: undefined,
  script8: undefined,
  script9: undefined,
};

export default App;
