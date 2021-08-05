import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import ScriptItemBox from '../styled/ScriptItemBox';
import SwitchButton from './SwitchButton';

/* Styled Components */

const ScriptItemWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const CenterLine = styled.div`
  width: 1px;
  height: 23px;
  background-image: linear-gradient(${(props) => props.theme.color.hoverLine} 60%, transparent 0%);
  background-position: right;
  background-size: 1px 5px;
  background-repeat: repeat-y;
  position: absolute;
  left: 50%;
  top: 8px;
`;

const HalfArea = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.35;
  position: absolute;
  cursor: pointer;
  transition: ${(props) => props.theme.transitionTime};

  &:nth-child(3) {
    margin-left: 50%;
  }

  &:hover {
    opacity: 1;
  }

  img {
    pointer-events: none;
  }
`;

const FullArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    pointer-events: none;
  }
`;

const CodeIcon = styled.img`
  position: absolute;
  pointer-events: none;
  top: 7px;
  right: 8px;
`;

const ScriptTitle = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 35px 0 10px;

  .title {
    width: 100%;
    color: ${(props) => props.theme.color.yallow};
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;

/* ScriptItem Component */

interface ScriptItemProps {
  title: string;
  code: string;
  autoExecute: boolean;
  scriptIndex: number;
  onEdit: (scriptIndex: number) => void;
  onEmitCode: (scriptIndex: number) => void;
  onToggleAutoExecute: (scriptIndex: number) => void;
}

const ScriptItem: FC<ScriptItemProps> = ({
  title,
  code,
  autoExecute,
  scriptIndex,
  onEdit,
  onEmitCode,
  onToggleAutoExecute,
}: ScriptItemProps) => {
  const handleClickPlay = useCallback(() => {
    if (onEmitCode) onEmitCode(scriptIndex);
  }, [scriptIndex, onEmitCode]);

  const handleClickSet = useCallback(() => {
    if (onEdit) onEdit(scriptIndex);
  }, [scriptIndex, onEdit]);

  const handleToggleAutoExecute = useCallback(() => {
    if (onToggleAutoExecute) onToggleAutoExecute(scriptIndex);
  }, [scriptIndex, onToggleAutoExecute]);

  const renderScript = useMemo(() => (
    <>
      <CenterLine />
      <HalfArea onClick={handleClickPlay}>
        <img alt="" src="../imgs/play.svg" />
      </HalfArea>
      <HalfArea onClick={handleClickSet}>
        <img alt="" src="../imgs/settings.svg" />
      </HalfArea>
    </>
  ), [handleClickPlay, handleClickSet]);

  const renderEmptyScript = useMemo(() => (
    <>
      <FullArea onClick={handleClickSet}>
        <img alt="" src="../imgs/settings.svg" />
      </FullArea>
    </>
  ), [handleClickSet]);

  return (
    <ScriptItemWrapper>
      <SwitchButton title="Auto Execute" style={{ left: 8, top: 17 }} checked={autoExecute} onChange={handleToggleAutoExecute} />
      <ScriptItemBox title={title}>
        <CodeIcon alt="" src={code ? '../imgs/code.svg' : '../imgs/no-code.svg'} />
        <ScriptTitle>
          <div className="title">
            { title }
          </div>
        </ScriptTitle>
        <div className="mask">
          { code ? renderScript : renderEmptyScript }
        </div>
      </ScriptItemBox>
    </ScriptItemWrapper>

  );
};

export default ScriptItem;
