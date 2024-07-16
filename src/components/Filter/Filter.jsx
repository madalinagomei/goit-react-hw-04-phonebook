import { Component } from 'react';
import propTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { handleFilterChange, filter } = this.props;
    return (
      <>
        <input type="text" onChange={handleFilterChange} value={filter} />
      </>
    );
  }
}

Filter.propTypes = {
  handleFilterChange: propTypes.func,
  filter: propTypes.string,
};

export default Filter;
