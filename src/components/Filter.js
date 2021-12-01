import React, { Component } from "react";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSize: "All",
      filterStatus: "All",
    };
  }

  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFiltered(
      name === "filterSize" ? value : this.state.filterSize,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { filterSize, filterStatus } = this.state;
    return (
      <div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <select className="form-control" name="filterSize" value={filterSize} onChange={this.onChange}>
            <option value="All">All</option>
            <option value="S">S (Small)</option>
            <option value="M">M (Medium)</option>
            <option value="L">L (Large)</option>
          </select>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange}>
            <option value="All">All</option>
            <option value="open">open</option>
            <option value="confirmed">confirmed</option>
            <option value="cancel">cancel</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Filter;
