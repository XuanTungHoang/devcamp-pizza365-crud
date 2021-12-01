import React, { Component } from "react";

class OrderItem extends Component {
  onDelete = () => {
    this.props.onDelete(this.props.order.id);
  };
  onEditOrder = () => {
    this.props.onEditOrder(this.props.order.id);
  };
  render() {
    var { order, index } = this.props;
    return (
      <tr>
        <td>{order.orderId}</td>
        <td>{order.kichCo}</td>
        <td>{order.duongKinh}</td>
        <td>{order.suon}</td>
        <td>{order.salad}</td>
        <td>{order.soLuongNuoc}</td>
        <td>{order.thanhTien}</td>
        <td>{order.loaiPizza}</td>
        <td>{order.idVourcher}</td>
        <td>{order.idLoaiNuocUong}</td>
        <td>{order.hoTen}</td>
        <td>{order.email}</td>
        <td>{order.soDienThoai}</td>
        <td>{order.diaChi}</td>
        <td>{order.loiNhan}</td>
        <td>{order.trangThai}</td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onEditOrder}>
            <span className="fa fa-pencil mr-5" />
            Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <span className="fa fa-trash mr-5" />
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default OrderItem;
