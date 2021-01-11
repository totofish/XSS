import React, { FC } from 'react';

interface ScriptItemProps {
  title: string;
  code: string;
  scriptIndex: number;
  onEdit: (scriptIndex: number) => void;
  onEmitCode: (scriptIndex: number) => void;
}

const ScriptItem: FC<ScriptItemProps> = ({
  title,
  code,
  scriptIndex,
  onEdit,
  onEmitCode,
}: ScriptItemProps) => {
  const handleClickPlay = () => {
    if (onEmitCode) onEmitCode(scriptIndex);
  };

  const handleClickSet = () => {
    if (onEdit) onEdit(scriptIndex);
  };

  const renderScript = () => (
    <>
      <div className="center-line" />
      <div className="half" onClick={handleClickPlay}>
        <img className="play-icon" alt="" src="../imgs/play.svg" />
      </div>
      <div className="half" onClick={handleClickSet}>
        <img className="set-icon" alt="" src="../imgs/settings.svg" />
      </div>
    </>
  );

  const renderEmptyScript = () => (
    <>
      <div className="full" onClick={handleClickSet}>
        <img className="set-icon" alt="" src="../imgs/settings.svg" />
      </div>
    </>
  );

  return (
    <div className="script-item">
      <img className="code-icon" alt="" src={code ? '../imgs/code.svg' : '../imgs/no-code.svg'} />
      <div className="script-title">
        <div className="title">
          { title }
        </div>
      </div>
      <div className="mask">
        {
          code
            ? renderScript()
            : renderEmptyScript()
        }
      </div>
    </div>
  );
};

export default ScriptItem;
