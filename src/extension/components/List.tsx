import React, { FC, useState } from 'react';
import { Base64 } from 'js-base64';
import ScriptItem from './ScriptItem';
import { IScriptItem } from '../../types';

interface ListProps {
  scripts: Array<IScriptItem>;
  onEdit: (scriptIndex: number) => void;
  onEmitCode: (scriptIndex: number) => void;
  onImportScripts: (data: Array<IScriptItem>) => void;
  onAdd: () => void;
}

const List: FC<ListProps> = ({
  scripts,
  onEdit,
  onEmitCode,
  onImportScripts,
  onAdd,
}: ListProps) => {
  const [dragOver, setDragOver] = useState(false);

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer?.items) {
      const firstItem = event.dataTransfer.items[0];
      if (firstItem.kind === 'file') {
        const file = firstItem.getAsFile();
        if (file && /.json$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result !== 'string') return;
            const importData = Base64.decode(reader.result.replace('data:application/json;base64,', ''));
            onImportScripts(JSON.parse(importData));
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const renderItems = () => {
    const list = scripts.map((scriptItem, index) => (
      <ScriptItem
          // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={scriptItem.title}
        code={scriptItem.code}
        scriptIndex={index}
        onEdit={onEdit}
        onEmitCode={onEmitCode}
      />
    ));
    return [
      ...list,
      <div key="add" className="add-script-item" onClick={onAdd}>
        <img alt="" className="add-icon" src="../imgs/add.svg" />
      </div>,
    ];
  };

  const renderDropMask = () => {
    if (!dragOver) return <></>;

    return (
      <div className="drop-mask">
        <img width="469" height="348" alt="" src="../imgs/drop.svg" />
      </div>
    );
  };

  return (
    <div
      className="list"
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      { renderItems() }
      { renderDropMask() }
    </div>
  );
};

export default List;
