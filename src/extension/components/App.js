import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Editor from './Editor';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      script1: props.script1,
      script2: props.script2,
      script3: props.script3,
      script4: props.script4,
      script5: props.script5,
      script6: props.script6,
      script7: props.script7,
      script8: props.script8,
      script9: props.script9,
      stage: 'list',
      editorTarget: null,
    }
  }

  handleSet = (scriptName) => {
    this.setState({
      stage: 'editor',
      editorTarget: scriptName,
    });
  }

  handleEmitCode = (scriptName) => {
    const { onEmitCode } = this.props;
    if (onEmitCode) onEmitCode(this.state[scriptName].code);
  }

  handleEditor = (value) => {
    const { editorTarget } = this.state;
    const { onSave } = this.props;
    if (value === null) {
      // cancel
      this.setState({
        stage: 'list',
        editorTarget: null,
      });
      return;
    }
    if (onSave) onSave(editorTarget, value);
    this.setState({
      [editorTarget]: value,
      stage: 'list',
      editorTarget: null,
    });
  }

  render() {
    const { stage, editorTarget, ...scripts } = this.state
    return (
      <>
        {
          stage === 'list'
            ? <List {...scripts} onSet={this.handleSet} onEmitCode={this.handleEmitCode} />
            : <Editor onSubmit={this.handleEditor} scriptData={scripts[editorTarget]} />
        }
      </>
    );
  }
}

App.defaultProps = {
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

App.propTypes = {
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
  onSave: PropTypes.func.isRequired,
  onEmitCode: PropTypes.func.isRequired,
};
