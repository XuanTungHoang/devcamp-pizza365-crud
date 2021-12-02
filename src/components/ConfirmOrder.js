import React, { Component } from "react";

class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   componentDidMount() {
  //     if (this.props.order && this.props.isEdit) {
  //       this.setState({
  //         id: this.props.order.id,
  //         orderId: this.props.order.orderId,
  //         hoTen: this.props.order.hoTen,
  //         email: this.props.order.email,
  //         soDienThoai: this.props.order.soDienThoai,
  //         diaChi: this.props.order.diaChi,
  //         loiNhan: this.props.order.loiNhan,
  //         trangthai: this.props.order.trangThai,
  //         idVourcher: this.props.order.idVourcher,
  //         thanhTien: this.props.order.thanhTien,
  //         loaiPizza: this.props.order.loaiPizza,
  //         kichCo: this.props.order.kichCo,
  //         duongKinh: this.props.order.duongKinh,
  //         suon: this.props.order.suon,
  //         salad: this.props.order.salad,
  //         idLoaiNuocUong: this.props.order.idLoaiNuocUong,
  //         soLuongNuoc: this.props.order.soLuongNuoc,
  //         isEdit: this.props.isEdit,
  //       });
  //     }
  //   }

  //   onChange = event => {
  //     var target = event.target;
  //     var name = target.name;
  //     var value = target.value;
  //     var pickedSize = {};
  //     if (name === "kichCo") {
  //       if (value === "S") {
  //         pickedSize = {
  //           duongKinh: "20",
  //           suon: "2",
  //           salad: "200",
  //           soLuongNuoc: "2",
  //           thanhTien: "150000",
  //         };
  //       }
  //       if (value === "M") {
  //         pickedSize = {
  //           duongKinh: "25",
  //           suon: "4",
  //           salad: "300",
  //           soLuongNuoc: "3",
  //           thanhTien: "200000",
  //         };
  //       }
  //       if (value === "L") {
  //         pickedSize = {
  //           duongKinh: "30",
  //           suon: "8",
  //           salad: "500",
  //           soLuongNuoc: "4",
  //           thanhTien: "250000",
  //         };
  //       }
  //     }
  //     //  console.log(name, value, pickedSize);
  //     if (this.state.isEdit) {
  //       this.setState({
  //         [name]: value,
  //       });
  //     } else {
  //       this.setState({
  //         duongKinh: pickedSize.duongKinh ? pickedSize.duongKinh : "20",
  //         suon: pickedSize.suon ? pickedSize.suon : "2",
  //         salad: pickedSize.salad ? pickedSize.salad : "200",
  //         soLuongNuoc: pickedSize.soLuongNuoc ? pickedSize.soLuongNuoc : "2",
  //         thanhTien: pickedSize.thanhTien ? pickedSize.thanhTien : "150000",
  //         [name]: value,
  //       });
  //     }
  //   };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onCloseForm();
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  render() {
    var { order } = this.props;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {"Thông tin sản phẩm"}
            <span className="fa fa-times-circle text-right ml-10" onClick={this.onCloseForm}></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div class="row">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <input type="hidden" className="form-control" name="id" value={this.state.id} />
                </div>
                <div className="form-group">
                  <label>Họ & Tên :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hoTen"
                    required="required"
                    value={order.hoTen}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required="required"
                    value={order.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại :</label>
                  <input
                    type="number"
                    className="form-control"
                    name="soDienThoai"
                    required="required"
                    value={order.soDienThoai}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="diaChi"
                    required="required"
                    value={order.diaChi}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Lời nhắn :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="loiNhan"
                    required="required"
                    value={order.loiNhan}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label>Voucher Id :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="idVourcher"
                    required="required"
                    value={order.idVourcher}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Thành tiền :</label>
                  <input
                    type="text"
                    className="form-control"
                    name="thanhTien"
                    value={order.thanhTien}
                    disabled="true"
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Lưu Lại
              </button>
              &nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onCloseForm}>
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ConfirmOrder;
