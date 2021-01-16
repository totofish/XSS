import React, { FC, useCallback, useMemo } from 'react';

interface ScriptItemProps {
  title: string;
  code: string;
  scriptIndex: number;
  onEdit: (scriptIndex: number) => void;
  onEmitCode: (scriptIndex: number) => void;
}

/* ScriptItem Component */

const ScriptItem: FC<ScriptItemProps> = ({
  title,
  code,
  scriptIndex,
  onEdit,
  onEmitCode,
}: ScriptItemProps) => {
  const handleClickPlay = useCallback(() => {
    if (onEmitCode) onEmitCode(scriptIndex);
  }, [scriptIndex, onEmitCode]);

  const handleClickSet = useCallback(() => {
    if (onEdit) onEdit(scriptIndex);
  }, [scriptIndex, onEdit]);

  const renderScript = useMemo(() => (
    <>
      <div className="center-line" />
      <div className="half" onClick={handleClickPlay}>
        <img className="play-icon" alt="" src="../imgs/play.svg" />
      </div>
      <div className="half" onClick={handleClickSet}>
        <img className="set-icon" alt="" src="../imgs/settings.svg" />
      </div>
    </>
  ), [handleClickPlay, handleClickSet]);

  const renderEmptyScript = useMemo(() => (
    <>
      <div className="full" onClick={handleClickSet}>
        <img className="set-icon" alt="" src="../imgs/settings.svg" />
      </div>
    </>
  ), [handleClickSet]);

  return (
    <div className="script-item">
      <img className="code-icon" alt="" src={code ? '../imgs/code.svg' : '../imgs/no-code.svg'} />
      <div className="script-title">
        <div className="title">
          { title }
        </div>
      </div>
      <div className="mask">
        { code ? renderScript : renderEmptyScript }
      </div>
    </div>
  );
};

export default ScriptItem;
