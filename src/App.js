import "./App.css";
import React, { Component } from "react";
import AddOrder from "./components/AddOrder";
import SearchAndFilter from "./components/SearchAndFilter";
import OrderList from "./components/OrderList";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isDisplayForm: false,
      isEdit: false,
      orderEditing: [],
      keyword: "",
      filterSize: "All",
      filterStatus: "All",
    };
  }

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
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onSubmit = data => {
    const lastData = { trangThai: data.trangthai };
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
    }
  };

  onDelete = id => {
    axios({
      method: "delete",
      url: `http://42.115.221.44:8080/devcamp-pizza365/orders/${id}`,
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

  // onSearch = keyword => {
  //   this.setState({
  //     keyword: keyword.toLowerCase(),
  //   });
  // };

  onFiltered = (filterSize, filterStatus) => {
    // console.log(filterSize, filterStatus);
    //filterStatus = parseInt(filterStatus);
    this.setState({
      filterSize: filterSize.toLowerCase(),
      filterStatus: filterStatus.toLowerCase(),
    });
    //  console.log(typeof filterStatus);
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
    var elmAddForm = isDisplayForm ? (
      <AddOrder onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} order={orderEditing} isEdit={isEdit} />
    ) : (
      ""
    );

    return (
      <div className="main" style={{ paddingLeft: "20px" }}>
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
                <OrderList orders={orders} onDelete={this.onDelete} onEditOrder={this.onEditOrder} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
