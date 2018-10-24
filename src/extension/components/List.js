import React from 'react';
import PropTypes from 'prop-types';
import ScriptItem from './ScriptItem';

export default class List extends React.Component {
  constructor() {
    super();
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
      <div className="list">
        { items }
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
};
