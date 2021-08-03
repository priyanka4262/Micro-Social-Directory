import axios from "axios";
import react, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

import { userContext } from "./GetData";
import "./DisplayUserDetails.scss";
const DisplayUserDetails = (props) => {
  const [userData, setUserData] = useState([]);
  const params = useParams();
  const history = useHistory();
  console.log(params, `https://randomuser.me/api/?phone=${params.id}`);
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?phone={params.id}")
      .then((response) => {
        console.log(response.data.results);
        setUserData(response.data.results[0]);
      });
  }, []);
  const onClickListHandler = () => {
    history.push("/");
  };
  return (
    <div class="d-flex align-items-center flex-column">
      <div className="card text-center" style={{ width: "29rem" }}>
        <div className="userDetails table-primary">User Details</div>
        <div className="card-body">
          <div className="text-center">
            <img className="userImg" src={userData.picture?.large}></img>
          </div>

          <table className="table mt-4 ">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  {userData.name?.first}
                  {userData.name?.last}
                </td>
              </tr>
              <tr>
                <td>Email ID</td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{userData.phone}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{userData.gender}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{userData.dob?.date}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{userData.dob?.age}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <a
        type="button"
        className="line-dark pe-auto backToList"
        onClick={onClickListHandler}
      >
        Back to list
      </a>
    </div>
  );
};
export default DisplayUserDetails;
