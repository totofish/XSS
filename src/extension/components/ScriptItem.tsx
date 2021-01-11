import React, { FC } from 'react';
import { ScriptItemKeys } from '../../types';

interface ScriptItemProps {
  title?: string;
  name: ScriptItemKeys;
  onSet: (scriptName: ScriptItemKeys) => void;
  onEmitCode: (scriptName: ScriptItemKeys) => void;
}

const ScriptItem: FC<ScriptItemProps> = ({
  title,
  name,
  onSet,
  onEmitCode,
}: ScriptItemProps) => {
  const handleClickPlay = () => {
    if (onEmitCode) onEmitCode(name);
  };

  const handleClickSet = () => {
    if (onSet) onSet(name);
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
      <img className="codeIcon" alt="" src="../imgs/code.svg" />
      <div className="script-title">
        { title }
      </div>
      <div className="mask">
        {
          title
            ? renderScript()
            : renderEmptyScript()
        }
      </div>
    </div>
  );
};

ScriptItem.defaultProps = {
  title: '',
};

export default ScriptItem;
