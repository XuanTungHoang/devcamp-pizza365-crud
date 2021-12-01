//import axios from "axios";
import React, { Component } from "react";
import OderItem from "./OderItem";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    var { orders } = this.props; // var tasks = this.props.tasks
    //  var { filterSize, filterStatus } = this.state;
    var elmTasks = orders.map((order, index) => {
      return (
        <OderItem
          key={index}
          index={index}
          order={order}
          onDelete={this.props.onDelete}
          onEditOrder={this.props.onEditOrder}
        />
      );
    });
    return (
      <div>
        {/* <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <label for="size">Board size:</label>
          <select className="form-control" name="filterStatus" value={filterSize} onChange={this.onChange}>
            <option value="All">All</option>
            <option value="S">S (Small)</option>
            <option value="M">M (Medium)</option>
            <option value="L">L (Large)</option>
          </select>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange}>
            <option value={-1}>All</option>
            <option value={0}>Open</option>
            <option value={1}>Confirmed</option>
            <option value={2}>Cancel</option>
          </select>
        </div> */}

        <table className="table table-bordered table-hover mt-15">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Kích cỡ</th>
              <th>Đường kính (cm)</th>
              <th>Sườn (miếng)</th>
              <th>Salad (g)</th>
              <th>Số lượng nước</th>
              <th>Thành tiền</th>
              <th>loaiPizza</th>
              <th>idVoucher</th>
              <th>Loại nước uống</th>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Số điện hoại</th>
              <th>Địa chỉ</th>
              <th>Lời nhắn</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>{elmTasks}</tbody>
        </table>
      </div>
    );
  }
}

export default OrderList;
