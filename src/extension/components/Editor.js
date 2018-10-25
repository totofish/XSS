import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/mode/javascript/javascript';

export default class Editor extends React.Component {
  constructor(props) {
    super();
    this.state = props.scriptData || {
      title: '',
      code: '',
    };
  }

  handleSave = () => {
    const {
      title,
      code,
    } = this.state;
    const { onSubmit } = this.props;
    let data = null;
    if (title || code) {
      data = {
        title: title ? title.trim() : '',
        code: code ? code.trim() : '',
      };
    }
    if (onSubmit) onSubmit(data);
  }

  handleClear = () => {
    this.setState({
      title: '',
      code: '',
    });
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleCodeChange = (editor, data, value) => {
    this.setState({
      code: value,
    });
  }

  render() {
    const { title, code } = this.state;
    const options = {
      lineNumbers: false,
      mode: 'javascript',
      theme: 'neo',
    };
    return (
      <div className="editor">
        <input
          type="text"
          className="input-title"
          maxLength="30"
          placeholder="Please enter a script title"
          value={title}
          onChange={this.handleTitleChange}
        />
        <div className="btns">
          <button type="button" className="red" onClick={this.handleSave}>Save</button>
          <button type="button" className="gray" onClick={this.handleClear}>Clear</button>
        </div>
        <CodeMirror
          className="textarea-script"
          value={code}
          onBeforeChange={this.handleCodeChange}
          options={options}
        />
      </div>
    );
  }
}

Editor.defaultProps = {
  scriptData: null,
};

Editor.propTypes = {
  scriptData: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};
