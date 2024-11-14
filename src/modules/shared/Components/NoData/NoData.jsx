import React from "react";
import noData from "./../../../../assets/images/noData.png";
export default function NoData() {
  return (
    <div className="text-center py-5">
      <img src={noData} alt="" />
      <h4>No Data!</h4>
      <p className="text-muted">are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  );
}
