import React, { useState, useEffect } from "react";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function ManageSlider() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    loadSliders();
  }, []);

  const loadSliders = () => {
    setIsLoading(true);
    Service.getSliders().then((res) => {
      setSliderData(res.data);
      setIsLoading(false);
    });
  };

  const addNewSlider = () => {
    localStorage.setItem("PageName", "Add New Slider");
    history.push("/admin/slider");
  };

  const deleteRecord = (item) => {
    setIsLoading(true);
    Service.deleteSlider(item.SId).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        loadSliders();
      }
      setIsLoading(false);
    });
  };

  const editRecord = (item) => {
    localStorage.setItem("PageName", "Edit Slider");
    localStorage.setItem("SliderDataForEdit", JSON.stringify(item));
    history.push("/admin/slider");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header">
        <h1>Manage Sliders</h1>
        <hr />
        <div className="text-right mb10">
          <a
            onClick={() => addNewSlider()}
            className="btn btn-primary min-width"
            style={{ marginRight: "1rem"}}
          >
            Add New Slider
          </a>
        </div>
      </div>

      {/* End .page-header */}

      {showMsg == true ? (
        <div className={msgClass} role="alert">
          <strong>{msgText}</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Heading</th>
              <th>Url</th>
              <th>Image</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sliderData.map((item, index) => (
              <tr key={index}>
                 <td className="price-col">{index+1}</td>
                <td className="price-col">{item.Heading}</td>
                <td className="price-col">{item.Url}</td>
                <td>
                  <img src={item.Image} alt="" style={{width:'150px',height:'100px'}}/>
                </td>
                <td className="delete-col">
                  <i
                    className="fa fa-pencil fa-lg"
                    style={{ marginRight: "2rem" }}
                    aria-hidden="true"
                    onClick={() => editRecord(item)}
                  ></i>
                  <i
                    className="fa fa-trash fa-lg"
                    aria-hidden="true"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you want to delete this category..?"
                      );
                      if (confirmBox === true) {
                        deleteRecord(item);
                      }
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageSlider;
