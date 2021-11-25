import React from "react";

import ReactPaginate from "react-paginate";
import Group from "./Group";

const GroupList = ({
  page,
  groups,
  groupsPerPage,
  formToggleHandler,
  setGroupToDelete,
  pageChangeHandler,
}) => {
  return (
    <table className="crud-table">
      <thead>
        <tr>
          <th className="crud-table__cell">Name</th>
          <th className="crud-table__cell">Students</th>
          <th className="crud-table__cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.data.length > 0 &&
          groups.data.map((group) => (
            <Group
              key={group.id}
              group={group}
              formToggleHandler={formToggleHandler}
              setGroupToDelete={setGroupToDelete}
            />
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td
            colSpan="3"
            className="crud-table__cell crud-table__cell--centered">
            <ReactPaginate
              forcePage={page}
              pageCount={Math.ceil(groups.count / groupsPerPage)}
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
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default GroupList;
