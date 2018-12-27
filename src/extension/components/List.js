import React from 'react';
import PropTypes from 'prop-types';
import ScriptItem from './ScriptItem';
import { Base64 } from 'js-base64';

export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      dragOver: false
    };
  }

  onDrop = (event) => {
    event.preventDefault();
    this.setState({
      dragOver: false
    });
    if (event.dataTransfer.items) {
      const firstItem = event.dataTransfer.items[0];
      if (firstItem.kind === 'file') {
        const file = firstItem.getAsFile();
        if (/.json$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const scripts = Base64.decode(reader.result.replace('data:application/json;base64,', ''));
            this.props.onImportScripts(JSON.parse(scripts));
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }

  onDragOver = (event) => {
    event.preventDefault();
    this.setState({
      dragOver: true
    });
  }

  onDragLeave = (event) => {
    event.preventDefault();
    this.setState({
      dragOver: false
    });
  }

  renderDropMask() {
    const { dragOver } = this.state;
    if (!dragOver) return;

    return (
      <div className="drop-mask">
        <img width="469" height="348" src="../imgs/drop.svg" />
      </div>
    );
  }

  render() {
    const { onSet, onEmitCode, ...scripts } = this.props;
    const items = Object.keys(scripts)
      .filter(key => /^script/i.test(key))
      .map((key, index) => {
        const data = scripts[key] || { title: null, code: null };
        if (data.title === null && data.code !== null) data.title = 'No Title';
        return (
          <ScriptItem
            key={key}
            {...data}
            name={key}
            onSet={onSet}
            onEmitCode={onEmitCode}
          />
        );
      });
    return (
      <div
        className="list"
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        { items }
        { this.renderDropMask() }
      </div>
    );
  }
}

List.defaultProps = {
  script1: null,
  script2: null,
  script3: null,
  script4: null,
  script5: null,
  script6: null,
  script7: null,
  script8: null,
  script9: null,
};

List.propTypes = {
  script1: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script2: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script3: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script4: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script5: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script6: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script7: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script8: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  script9: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  onSet: PropTypes.func.isRequired,
  onEmitCode: PropTypes.func.isRequired,
  onImportScripts: PropTypes.func.isRequired,
};
