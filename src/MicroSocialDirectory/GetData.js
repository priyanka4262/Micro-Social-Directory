import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ReactPaginate from "react-paginate";
import "./GetData.scss";

const GetData = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [sortIcon, setSortIcon] = useState("/sort-asc.png");
  const usersPerPage = 24;
  const pageCount = Math.ceil(users.length / usersPerPage);
  let serialNumber = pageNumber * usersPerPage + 1;

  const onUserClickHandler = (user) => {
    setSelectedUser(user);
    history.push(`/userDetails/${user.phone}`);
  };

  const changePage = ({ selected }) => {
    const usersVisited = selected * usersPerPage;
    setPageNumber(selected);
    setDisplayUsers(users.slice(usersVisited, usersVisited + usersPerPage));
  };

  const onSortHandler = () => {
    const data = [...displayUsers];
    let sortedUsers = [];
    if (sortIcon === "./sort-dsc.png") {
      sortedUsers = data.sort((a, b) => {
        return a.name.first < b.name.first ? 1 : -1;
      });
      setSortIcon("./sort-asc.png");
    } else {
      sortedUsers = data.sort((a, b) => {
        return a.name.first > b.name.first ? 1 : -1;
      });
      setSortIcon("./sort-dsc.png");
    }
    setDisplayUsers(sortedUsers);
  };

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=100")
      .then((response) => {
        setUsers(response.data.results);
        setDisplayUsers(response.data.results.slice(0, usersPerPage));
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div>
      <table className="table table-bordered mainTable mt-3">
        <thead className=" text-center table-primary">
          <tr>
            <th>ID</th>
            <th>
              Name
              <img
                className="ascendingImg"
                onClick={onSortHandler}
                src={sortIcon}
              />
            </th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {displayUsers.map((user, index) => (
            <tr key={index} onClick={() => onUserClickHandler(user)}>
              <td>{index + serialNumber} </td>
              <td id="nameElement">{user.name.first}</td>
              <td>
                <img src={user.picture.thumbnail}></img>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        onPageChange={changePage}
        pageCount={pageCount}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};
export default GetData;
