/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { FC, useCallback } from 'react';
import { Base64 } from 'js-base64';
import { useDropzone } from 'react-dropzone';
import {
  DragDropContext, Droppable, Draggable, DropResult,
} from 'react-beautiful-dnd';
import ScriptItem from './ScriptItem';
import { IScriptItem } from '../../types';

interface ListProps {
  scripts: Array<IScriptItem>;
  onMoveSort: (startIndex: number, endIndex: number) => void;
  onEdit: (scriptIndex: number) => void;
  onEmitCode: (scriptIndex: number) => void;
  onImportScripts: (data: Array<IScriptItem>) => void;
  onAdd: () => void;
}

const List: FC<ListProps> = ({
  scripts,
  onMoveSort,
  onEdit,
  onEmitCode,
  onImportScripts,
  onAdd,
}: ListProps) => {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    if (file && /.json$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') return;
        const importData = Base64.decode(reader.result.replace('data:application/json;base64,', ''));
        onImportScripts(JSON.parse(importData));
      };
      reader.readAsDataURL(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const startIndex = result.source.index;
      const endIndex = result.destination.index;
      onMoveSort(startIndex, endIndex);
    }
  };

  const renderDropMask = () => {
    if (!isDragActive) return <></>;

    return (
      <div className="drop-mask">
        <div className="drop-mask-line">
          <img width="80" height="80" alt="" src="../imgs/drop.svg" />
        </div>
      </div>
    );
  };

  const renderItems = () => scripts.map((scriptItem, index) => (
    <Draggable
      key={`${scriptItem.title}_${index}`}
      draggableId={`script_${index}`}
      index={index}
    >
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <ScriptItem
            key={index}
            title={scriptItem.title}
            code={scriptItem.code}
            scriptIndex={index}
            onEdit={onEdit}
            onEmitCode={onEmitCode}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <section
      className="list"
      {...getRootProps()}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {
            (provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="droppable"
              >
                { renderItems() }
                { provided.placeholder }
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
      <div key="add" className="add-script-item" onClick={onAdd}>
        <img alt="" className="add-icon" src="../imgs/add.svg" />
      </div>
      { renderDropMask() }
    </section>
  );
};

export default List;
