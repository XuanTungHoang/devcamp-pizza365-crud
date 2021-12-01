import React, { Component } from "react";
import Filter from "./Filter";
import Search from "./Search";

class SearchAndSort extends Component {
  render() {
    return (
      <div className="row mt-15">
        <Search onSearch={this.props.onSearch} />
        <Filter onFiltered={this.props.onFiltered} />
      </div>
    );
  }
}

export default SearchAndSort;
