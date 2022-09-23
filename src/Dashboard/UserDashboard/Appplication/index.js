import React, { useEffect, useState } from "react";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationTab from "./ApplicationTab";
import API from "../../../api/index";
import { useParams } from "react-router-dom";

const Application = () => {
  const params = useParams();
  const { id } = params;
  const [userRequest, setUserRequest] = useState({});

  useEffect(() => {
    handleRequest();
  }, []);
  const handleRequest = async () => {
    await API("get", `/requests/${id}`)
      .then((res) => {
        setUserRequest(res?.data?.request);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <ApplicationHeader title={userRequest?.title} status={userRequest?.status} />
          <ApplicationTab userRequest={userRequest} />
        </div>
      </div>
    </>
  );
};

export default Application;
