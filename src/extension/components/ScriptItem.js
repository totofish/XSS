import React from 'react';
import PropTypes from 'prop-types';

export default class ScriptItem extends React.Component {
  handleClickPlay = () => {
    const { name, onEmitCode} = this.props;
    if (onEmitCode) onEmitCode(name);
  }

  handleClickSet = () => {
    const { name, onSet} = this.props;
    if (onSet) onSet(name);
  }

  renderScript() {
    return (
      <>
        <div className="center-line" />
        <div className="half" onClick={this.handleClickPlay}>
          <img className="play-icon" src="../imgs/play.svg" />
        </div>
        <div className="half" onClick={this.handleClickSet}>
          <img className="set-icon" src="../imgs/settings.svg" />
        </div>
      </>
    );
  }

  renderEmptyScript() {
    return (
      <>
        <div className="full" onClick={this.handleClickSet}>
          <img className="set-icon" src="../imgs/settings.svg" />
        </div>
      </>
    );
  }

  render() {
    const {
      title,
      code,
    } = this.props;
    return (
      <div className="script-item">
        <img className="codeIcon" src="../imgs/code.svg" />
        <div className="script-title">
          { title }
        </div>
        <div className="mask">
          {
            title
              ? this.renderScript()
              : this.renderEmptyScript()
          }
        </div>
      </div>
    );
  }
}

ScriptItem.defaultProps = {
  title: null,
  code: null,
};

ScriptItem.propTypes = {
  title: PropTypes.string,
  code: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSet: PropTypes.func.isRequired,
  onEmitCode: PropTypes.func.isRequired,
};
