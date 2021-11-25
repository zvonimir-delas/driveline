import React from "react";

const Group = ({ group, formToggleHandler, setGroupToDelete }) => {
  return (
    <tr>
      <td className="crud-table__cell">{group.name}</td>
      <td className="crud-table__cell">
        {group.students.length > 0
          ? group.students.map(
              (student) => `${student.firstName} ${student.lastName}, `
            )
          : "No students"}
      </td>
      <td className="crud-table__cell crud-table__cell--centered">
        <button
          onClick={() => formToggleHandler(group.id)}
          className="crud-table__action">
          Edit
        </button>
        <button
          onClick={() => setGroupToDelete(group)}
          className="crud-table__action crud-table__action--red">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Group;
