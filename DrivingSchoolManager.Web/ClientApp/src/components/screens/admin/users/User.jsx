import React from "react";
import UserImage from "../../../../assets/images/default-profile-image.jpg";

const User = ({ user, formToggleHandler, setUserToDelete }) => {
  return (
    <tr>
      <td className="crud-table__cell crud-table__cell--centered">
        <img
          src={user.imageUri ?? UserImage}
          className="crud-table__user-image"
        />
      </td>
      <td className="crud-table__cell">{user.firstName}</td>
      <td className="crud-table__cell">{user.lastName}</td>
      <td className="crud-table__cell">{user.role}</td>
      <td className="crud-table__cell">{user.email}</td>
      <td className="crud-table__cell">
        {user.phoneNumber ? user.phoneNumber : "N/A"}
      </td>
      <td className="crud-table__cell">
        {user.category ? user.category : "N/A"}
      </td>
      <td className="crud-table__cell">
        {user.group ? user.group.name : "N/A"}
      </td>
      <td className="crud-table__cell">
        {user.instructor
          ? user.instructor.firstName + " " + user.instructor.lastName
          : "N/A"}
      </td>
      <td className="crud-table__cell crud-table__cell--centered">
        <button
          onClick={() => formToggleHandler(user.id)}
          className="crud-table__action">
          Edit
        </button>
        <button
          onClick={() => setUserToDelete(user)}
          className="crud-table__action crud-table__action--red">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
