import React, { Component } from "react";
import ConfirmOrder from "./ConfirmOrder";
import { Button, ButtonToolbar } from "react-bootstrap";
import axios from "axios";
class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dsDoUong: [],
      isEdit: false,
      isShowModal: false,
      id: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
      diaChi: "",
      loiNhan: "",
      trangThai: "",
      idVourcher: "",
      thanhTien: "150000",
      loaiPizza: "",
      kichCo: "S",
      duongKinh: "20",
      suon: "2",
      salad: "200",
      idLoaiNuocUong: "",
      soLuongNuoc: "2",
    };
  }

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

  async fetchData() {
    const res = await axios.get("http://42.115.221.44:8080/devcamp-pizza365/drinks");
    const { data } = await res;
    this.setState({ dsDoUong: data });
  }

  // fetchData = () => {
  //   axios({
  //     method: "get",
  //     url: "http://42.115.221.44:8080/devcamp-pizza365/drinks",
  //     data: null,
  //   })
  //     .then(res => {
  //       console.log(res);
  //       this.setState({
  //         dsDoUong: res.data,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  onChange = event => {
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
      }
      if (value === "M") {
        pickedSize = {
          duongKinh: "25",
          suon: "4",
          salad: "300",
          soLuongNuoc: "3",
          thanhTien: "200000",
        };
      }
      if (value === "L") {
        pickedSize = {
          duongKinh: "30",
          suon: "8",
          salad: "500",
          soLuongNuoc: "4",
          thanhTien: "250000",
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
        duongKinh: pickedSize.duongKinh ? pickedSize.duongKinh : "20",
        suon: pickedSize.suon ? pickedSize.suon : "2",
        salad: pickedSize.salad ? pickedSize.salad : "200",
        soLuongNuoc: pickedSize.soLuongNuoc ? pickedSize.soLuongNuoc : "2",
        thanhTien: pickedSize.thanhTien ? pickedSize.thanhTien : "150000",
        [name]: value,
      });
    }
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onCloseForm();
  };

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  render() {
    var { isEdit, dsDoUong } = this.state;
    //  var elmCofirmModal = isShowModal ? <ConfirmOrder addingOrder={this.state} /> : "";
    let onHideModal = () => {
      this.setState({ isShowModal: false });
    };
    console.log(dsDoUong);
    return (
      <div>
        {/* {isShowModal ? <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">{elmCofirmModal} </div> : ""} */}
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {isEdit ? "S???a s???n ph???m" : "Th??m s???n ph???m"}
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
                    <label>H??? & T??n :</label>
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
                    <label>S??? ??i???n tho???i :</label>
                    <input
                      type="number"
                      className="form-control"
                      name="soDienThoai"
                      required="required"
                      disabled={isEdit}
                      value={this.state.soDienThoai}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>?????a ch??? :</label>
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
                    <label>L???i nh???n :</label>
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
                    <label>Tr???ng th??i ????n h??ng :</label>
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
                      type="text"
                      className="form-control"
                      name="idVourcher"
                      required="required"
                      disabled={isEdit}
                      value={this.state.idVourcher}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Th??nh ti???n :</label>
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
                    <label>Lo???i pizza :</label>
                    <select
                      className="form-control required"
                      required="required"
                      disabled={isEdit}
                      name="loaiPizza"
                      value={this.state.loaiPizza}
                      onChange={this.onChange}
                    >
                      {!isEdit ? <option value="">ch???n lo???i pizza</option> : ""}
                      <option value="Seafood">Seafood</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Bacon">Bacon</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>C??? combo :</label>
                    <select
                      className="form-control"
                      required="required"
                      disabled={isEdit}
                      name="kichCo"
                      value={this.state.kichCo}
                      onChange={this.onChange}
                    >
                      <option value="S">S (small)</option>
                      <option value="M">M (medium)</option>
                      <option value="L">L (large)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>???????ng k??nh Pizza :</label>
                    <input
                      type="text"
                      className="form-control"
                      name="duongKinh"
                      value={this.state.duongKinh}
                      disabled={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>S?????n n?????ng :</label>
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
                    <label>????? u???ng :</label>
                    <select
                      className="form-control"
                      required="required"
                      disabled={isEdit}
                      name="idLoaiNuocUong"
                      value={this.state.idLoaiNuocUong}
                      onChange={this.onChange}
                    >
                      {!isEdit ? <option value="">ch???n ????? u???ng</option> : ""}
                      {dsDoUong.map((item, index) => (
                        <option key={index} value={item.maNuocUong}>
                          {item.maNuocUong}
                        </option>
                      ))}

                      {/* <option value="coca">COCA</option> */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>S??? l?????ng n?????c u???ng :</label>
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
                <button
                  type="submit"
                  className="btn btn-warning"
                  // show={this.state.isShowModal}
                  // onHide={this.onHideModal}
                >
                  L??u L???i
                </button>
                {/* <ConfirmOrder show={this.state.isShowModal} onHide={this.onHideModal} /> */}
                {/* <ButtonToolbar>
                  <Button type="submit" variant="warning">
                    L??u L???i
                  </Button>
                  <ConfirmOrder show={this.state.isShowModal} onHide={this.onHideModal} />
                </ButtonToolbar> */}
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onCloseForm}>
                  H???y B???
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
