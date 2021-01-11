import React, { FC, useState } from 'react';
import { Base64 } from 'js-base64';
import ScriptItem from './ScriptItem';
import { IScriptItem, SaveScriptItems, ScriptItemKeys } from '../../types';

interface ListProps {
  script1?: IScriptItem;
  script2?: IScriptItem;
  script3?: IScriptItem;
  script4?: IScriptItem;
  script5?: IScriptItem;
  script6?: IScriptItem;
  script7?: IScriptItem;
  script8?: IScriptItem;
  script9?: IScriptItem;
  onSet: (scriptName: ScriptItemKeys) => void;
  onEmitCode: (scriptName: ScriptItemKeys) => void;
  onImportScripts: (data: SaveScriptItems) => void;
}

const List: FC<ListProps> = ({
  script1,
  script2,
  script3,
  script4,
  script5,
  script6,
  script7,
  script8,
  script9,
  onSet,
  onEmitCode,
  onImportScripts,
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
            const scripts = Base64.decode(reader.result.replace('data:application/json;base64,', ''));
            onImportScripts(JSON.parse(scripts));
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

  const renderItems = () => [
    script1, script2, script3,
    script4, script5, script6,
    script7, script8, script9,
  ].map((scriptItem, index) => {
    const item = scriptItem || {};
    if (!item.title && item.code) {
      item.title = 'No Title';
    }
    return (
      <ScriptItem
          // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={item.title}
        name={`script${index + 1}` as ScriptItemKeys}
        onSet={onSet}
        onEmitCode={onEmitCode}
      />
    );
  });

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

List.defaultProps = {
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

export default List;
