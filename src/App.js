import "./App.css";
import React, { Component } from "react";
import AddOrder from "./components/AddOrder";
import SearchAndFilter from "./components/SearchAndFilter";
import OrderList from "./components/OrderList";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isDisplayForm: false,
      isEdit: false,
      isShowModal: false,
      idDelete: "",
      orderEditing: [],
      keyword: "",
      filterSize: "All",
      filterStatus: "All",
      show: false,
      isShowDelete: false,
    };
  }

  onShowDelete = id => {
    //  var isValidate = this.state.idLoaiNuocUong !== "" ? true : false;
    this.setState({
      isShowDelete: true,
      idDelete: id,
    });
  };

  onCloseDelete = () => {
    this.setState({
      isShowDelete: false,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios({
      method: "get",
      url: "http://42.115.221.44:8080/devcamp-pizza365/orders",
      data: null,
    })
      .then(res => {
        console.log(res);
        this.setState({
          orders: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onTogleForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      isEdit: false,
      isShowModal: false,
      keyword: "",
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onSubmit = data => {
    const lastData = { trangThai: data.trangThai };
    if (data.isEdit) {
      axios({
        method: "put",
        url: `http://42.115.221.44:8080/devcamp-pizza365/orders/${data.id}`,
        data: lastData,
      })
        .then(res => {
          this.fetchData();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      console.log("sua");
      toast("Đã sửa đơn hàng thành công!");
    } else {
      axios({
        method: "post",
        url: "http://42.115.221.44:8080/devcamp-pizza365/orders",
        data: data,
      })
        .then(res => {
          this.fetchData();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      toast("Đã thêm đơn hàng thành công!");
    }
  };

  onDelete = () => {
    console.log(this.state.idDelete);
    axios({
      method: "delete",
      url: `http://42.115.221.44:8080/devcamp-pizza365/orders/${this.state.idDelete}`,
      data: null,
    })
      .then(res => {
        this.fetchData();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    this.onCloseForm();
    this.onCloseDelete();
    toast("Đã xoá đơn hàng thành công!");
  };

  onEditOrder = id => {
    var { orders } = this.state;
    orders.forEach((order, index) => {
      if (order.id === id) {
        var orderEditing = orders[index];
        this.setState({
          orderEditing: orderEditing,
          isEdit: true,
        });
      }
    });
    this.onShowForm();
  };

  onSearch = keyword => {
    //  keyword = keyword.parseString();
    console.log(keyword);
    this.setState({
      keyword: keyword,
    });
  };

  onFiltered = (filterSize, filterStatus) => {
    this.setState({
      filterSize: filterSize.toLowerCase(),
      filterStatus: filterStatus.toLowerCase(),
    });
  };

  render() {
    var { orders, isDisplayForm, orderEditing, isEdit, filterSize, filterStatus, keyword } = this.state;
    console.log(filterSize, filterStatus);
    if (filterSize) {
      orders = orders.filter(order => {
        if (filterSize === "all" || filterSize === "All") {
          return order;
        } else {
          return order.kichCo.toLowerCase().indexOf(filterSize) !== -1;
        }
      });

      orders = orders.filter(order => {
        if (filterStatus === "all" || filterStatus === "All") {
          return order;
        } else {
          return order.trangThai.toLowerCase().indexOf(filterStatus) !== -1;
        }
      });
    }
    if (keyword) {
      console.log("orders", orders);
      orders = orders.filter(order => {
        return order.soDienThoai.indexOf(keyword) !== -1;
      });
    }
    var elmAddForm = isDisplayForm ? (
      <AddOrder onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} order={orderEditing} isEdit={isEdit} />
    ) : (
      ""
    );

    return (
      <div className="main" style={{ paddingLeft: "20px" }}>
        <ToastContainer />
        <Modal
          style={{ opacity: 1 }}
          show={this.state.isShowDelete}
          onHide={this.onCloseDelete}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xoá đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn xoá đơn hàng không?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.onCloseDelete}>
              Không
            </Button>
            <Button variant="primary" onClick={this.onDelete}>
              Có
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="text-center">
          <h1>Danh sách đơn hàng</h1>
          <hr />
        </div>
        <div className="row">
          {isDisplayForm ? (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">{elmAddForm}</div>
          ) : (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <SearchAndFilter onSearch={this.onSearch} onFiltered={this.onFiltered} />
              <button
                style={{ marginTop: "100px" }}
                type="button"
                className="btn btn-primary"
                onClick={this.onTogleForm}
              >
                <span className="fa fa-plus mr-5" />
                Thêm sản phẩm
              </button>
              <div style={{ marginTop: "20px" }}>
                <OrderList orders={orders} onDelete={this.onShowDelete} onEditOrder={this.onEditOrder} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
