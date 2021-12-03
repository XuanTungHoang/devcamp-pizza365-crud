import React, { Component } from "react";
//import { Button } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import "./global.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dsDoUong: [],
      vourcher: [],
      isEdit: false,
      isShowModal: false,
      isSave: false,
      id: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
      diaChi: "",
      loiNhan: "",
      trangThai: "",
      idVourcher: "",
      thanhTien: "",
      loaiPizza: "",
      kichCo: "",
      duongKinh: "",
      suon: "",
      salad: "",
      idLoaiNuocUong: "",
      soLuongNuoc: "",
    };
  }

  //chạy lần đầu khi hiện component
  componentDidMount() {
    this.fetchData();
    if (this.props.order && this.props.isEdit) {
      this.setState({
        id: this.props.order.id,
        orderId: this.props.order.orderId,
        hoTen: this.props.order.hoTen,
        email: this.props.order.email,
        soDienThoai: this.props.order.soDienThoai,
        diaChi: this.props.order.diaChi,
        loiNhan: this.props.order.loiNhan,
        trangThai: this.props.order.trangThai,
        idVourcher: this.props.order.idVourcher,
        thanhTien: this.props.order.thanhTien,
        loaiPizza: this.props.order.loaiPizza,
        kichCo: this.props.order.kichCo,
        duongKinh: this.props.order.duongKinh,
        suon: this.props.order.suon,
        salad: this.props.order.salad,
        idLoaiNuocUong: this.props.order.idLoaiNuocUong,
        soLuongNuoc: this.props.order.soLuongNuoc,
        isEdit: this.props.isEdit,
      });
    }
  }

  //lấy tất cả đồ uống
  async fetchData() {
    const res = await axios.get(
      "http://42.115.221.44:8080/devcamp-pizza365/drinks"
    );
    const { data } = await res;
    this.setState({ dsDoUong: data });
  }

  //nhận biết thay đổi khi nhập vào các trường
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var pickedSize = {};
    if (name === "kichCo") {
      if (value === "S") {
        pickedSize = {
          duongKinh: "20",
          suon: "2",
          salad: "200",
          soLuongNuoc: "2",
          thanhTien: "150000",
        };
      } else if (value === "M") {
        pickedSize = {
          duongKinh: "25",
          suon: "4",
          salad: "300",
          soLuongNuoc: "3",
          thanhTien: "200000",
        };
      } else if (value === "L") {
        pickedSize = {
          duongKinh: "30",
          suon: "8",
          salad: "500",
          soLuongNuoc: "4",
          thanhTien: "250000",
        };
      } else {
        pickedSize = {
          duongKinh: "0",
          suon: "0",
          salad: "0",
          soLuongNuoc: "0",
          thanhTien: "0",
        };
      }
    }
    //  console.log(name, value, pickedSize);
    if (this.state.isEdit) {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        duongKinh: pickedSize.duongKinh ? pickedSize.duongKinh : "",
        suon: pickedSize.suon ? pickedSize.suon : "",
        salad: pickedSize.salad ? pickedSize.salad : "",
        soLuongNuoc: pickedSize.soLuongNuoc ? pickedSize.soLuongNuoc : "",
        thanhTien: pickedSize.thanhTien ? pickedSize.thanhTien : "",
        [name]: value,
      });
    }
  };

  //kiểm tra thêm đơn hàng mới hoặc sửa đơn hàng cũ
  onHandleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.isEdit) {
      axios({
        method: "get",
        url: `http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/${this.state.idVourcher}`,
      })
        .then((res) => {
          console.log("api res", res);
          var { data } = res;
          this.setState({ vourcher: data });
          console.log("data voucher", this.state.vourcher);
          this.setState({
            isShowModal: true,
          });
        })
        .catch((err) => {
          console.log("api err", err);
          var data = {
            phanTramGiamGia: "0",
          };
          console.log("data", data);
          this.setState({ vourcher: data });
          console.log("data voucher err", this.state.vourcher);
          this.setState({
            isShowModal: true,
          });
          toast.error("Mã giảm giá chưa hợp lệ!");
        });
    } else {
      console.log("before submit: ");
      this.props.onSubmit(this.state);
      this.onCloseForm();
    }
  };

  //Xác nhận và gửi đăng kí đơn hàng
  onSubmit = () => {
    this.props.onSubmit(this.state);
    this.onCloseForm();
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  //hiên modal
  onShowModal = () => {
    var isValidate = this.state.idLoaiNuocUong !== "" ? true : false;
    //  console.log(isValidate);

    this.setState({
      isShowModal: true,
      isSave: isValidate,
    });
  };

  //đóng modal
  onCloseModal = () => {
    this.setState({
      isShowModal: false,
    });
  };

  render() {
    //  tính tiền kèm mã giảm giá
    var { isEdit, dsDoUong, isShowModal, vourcher } = this.state;
    var giamGia = vourcher.phanTramGiamGia ? vourcher.phanTramGiamGia : "0";

    var thanhTien =
      (Number.parseInt(this.state.thanhTien, 10) *
        (100 - Number.parseInt(giamGia, 10))) /
      100;
    var val = `Xác nhận: ${this.state.hoTen}, Số điện thoại: ${this.state.soDienThoai}, địa chỉ: ${this.state.diaChi}  \n
Menu: ${this.state.kichCo}, sườn nướng: ${this.state.suon}, salad: ${this.state.salad}g, loại nước uống: ${this.state.idLoaiNuocUong}\n
Loại pizza: ${this.state.loaiPizza}, giá: ${this.state.thanhTien}, Mã giảm giá: ${this.state.idVourcher}\n
Phải thanh toán: ${thanhTien} vnd (Giảm giá ${giamGia}%)`;
    return (
      <div>
        <div className="panel panel-warning">
          {/* Toast hiện thông báo */}
          <ToastContainer />
          <div className="panel-heading">
            <h3 className="panel-title">
              {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm"}
              <span
                className="fa fa-times-circle text-right ml-10"
                onClick={this.onCloseForm}
              ></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onHandleSubmit}>
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="form-group">
                    <input
                      type="hidden"
                      className="form-control"
                      name="id"
                      value={this.state.id}
                    />
                  </div>
                  <div className="form-group">
                    <label>Họ & Tên :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="hoTen"
                      required="required"
                      disabled={isEdit}
                      value={this.state.hoTen}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email :</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      disabled={isEdit}
                      required="required"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="soDienThoai"
                      required="required"
                      disabled={isEdit}
                      value={this.state.soDienThoai}
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
                      disabled={isEdit}
                      value={this.state.diaChi}
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
                      disabled={isEdit}
                      value={this.state.loiNhan}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Trạng thái đơn hàng :</label>
                    {/* <input type="text" className="form-control" name="trangthai" value="open" disabled={true} /> */}
                    <select
                      className="form-control"
                      required="required"
                      name="trangThai"
                      disabled={!isEdit}
                      value={this.state.trangThai}
                      onChange={this.onChange}
                    >
                      <option value="open">Open</option>
                      <option value="cancel">Cancel</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Voucher Id :</label>
                    <input
                      type="number"
                      className="form-control"
                      name="idVourcher"
                      required="required"
                      disabled={isEdit}
                      value={this.state.idVourcher}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Thành tiền :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="thanhTien"
                      value={this.state.thanhTien}
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="form-group">
                    <label>Loại pizza :</label>
                    <select
                      className="form-control required"
                      required="required"
                      disabled={isEdit}
                      name="loaiPizza"
                      value={this.state.loaiPizza}
                      onChange={this.onChange}
                    >
                      {!isEdit ? <option value="">chọn loại pizza</option> : ""}
                      <option value="Seafood">Seafood</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Bacon">Bacon</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Cỡ combo :</label>
                    <select
                      className="form-control"
                      required="required"
                      disabled={isEdit}
                      name="kichCo"
                      value={this.state.kichCo}
                      onChange={this.onChange}
                    >
                      {!isEdit ? <option value="">chọn cỡ</option> : ""}
                      <option value="S">S (small)</option>
                      <option value="M">M (medium)</option>
                      <option value="L">L (large)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Đường kính Pizza :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duongKinh"
                      value={this.state.duongKinh}
                      disabled={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sườn nướng :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="suon"
                      value={this.state.suon}
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Salad :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="salad"
                      value={this.state.salad}
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Đồ uống :</label>
                    <select
                      className="form-control"
                      required="required"
                      disabled={isEdit}
                      name="idLoaiNuocUong"
                      value={this.state.idLoaiNuocUong}
                      onChange={this.onChange}
                    >
                      {!isEdit ? <option value="">chọn đồ uống</option> : ""}
                      {dsDoUong.map((item, index) => (
                        <option key={index} value={item.maNuocUong}>
                          {item.maNuocUong}
                        </option>
                      ))}

                      {/* <option value="coca">COCA</option> */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Số lượng nước uống :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="soLuongNuoc"
                      value={this.state.soLuongNuoc}
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="text-center">
                {isEdit ? (
                  <button type="submit" className="btn btn-warning">
                    Lưu Lại
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Xác nhận
                  </button>
                )}
                <Modal
                  size="lg"
                  aria-labelledby="example-modal-sizes-title-lg"
                  centered={true}
                  style={{ opacity: 1 }}
                  show={isShowModal}
                  onHide={this.onCloseModal}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <label>Họ & Tên :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="hoTen"
                            required="required"
                            disabled={true}
                            value={this.state.hoTen}
                          />
                        </div>
                        <div className="form-group">
                          <label>Số điện thoại :</label>
                          <input
                            type="number"
                            className="form-control"
                            name="soDienThoai"
                            required="required"
                            disabled={true}
                            value={this.state.soDienThoai}
                          />
                        </div>
                        <div className="form-group">
                          <label>Địa chỉ :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="diaChi"
                            required="required"
                            disabled={true}
                            value={this.state.diaChi}
                          />
                        </div>
                        <div className="form-group">
                          <label>Lời nhắn :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="loiNhan"
                            required="required"
                            disabled={true}
                            value={this.state.loiNhan}
                          />
                        </div>
                        <div className="form-group">
                          <label>Voucher Id :</label>
                          <input
                            type="text"
                            className="form-control"
                            name="idVourcher"
                            required="required"
                            disabled={true}
                            value={this.state.idVourcher}
                          />
                        </div>
                        <div className="form-group">
                          <label>Thông tin chi tiết :</label>
                          <textarea
                            rows="9"
                            className="form-control"
                            disabled={true}
                            value={val}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.onCloseModal}>
                      Close
                    </Button>
                    <Button onClick={this.onSubmit} variant="primary">
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onCloseForm}
                >
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddOrder;
