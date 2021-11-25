import React from "react";
import SectionSeperator from "../../../helpers/SectionSeperator";

import User from "./User";
import ReactPaginate from "react-paginate";

const UserList = ({
  page,
  users,
  formToggleHandler,
  usersPerPage,
  pageChangeHandler,
  setUserToDelete,
}) => {
  return (
    <>
      <SectionSeperator
        title="Users"
        button="+ Add"
        buttonClickHandler={() => formToggleHandler()}
      />
      <section className="users__data">
        <table className="crud-table">
          <thead>
            <tr>
              <th className="crud-table__cell">Image</th>
              <th className="crud-table__cell">Firstname</th>
              <th className="crud-table__cell">Lastname</th>
              <th className="crud-table__cell">Role</th>
              <th className="crud-table__cell">Email</th>
              <th className="crud-table__cell">Phone number</th>
              <th className="crud-table__cell">Category</th>
              <th className="crud-table__cell">Group</th>
              <th className="crud-table__cell">Instructor</th>
              <th className="crud-table__cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user, index) => (
              <User
                user={user}
                formToggleHandler={formToggleHandler}
                setUserToDelete={setUserToDelete}
                key={index}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="10" className="crud-table__cell">
                {users.count > 0 && (
                  <ReactPaginate
                    forcePage={page}
                    pageCount={Math.ceil(users.count / usersPerPage)}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}
                    onPageChange={pageChangeHandler}
                    containerClassName="pagination"
                    pageClassName="pagination__page"
                    activeClassName="pagination__page pagination__page--active"
                    nextClassName="pagination__action"
                    disabledClassName="pagination__action--disabled"
                    previousClassName="pagination__action"
                    breakClassName="pagination__break"
                  />
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </>
  );
};
export default UserList;
