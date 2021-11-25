import React, { useState, useEffect } from "react";
import { getUsers } from "../../../services/users";

import UserImage from "../../../assets/images/default-profile-image.jpg";

const usersPerPage = 1000;

const UsersSelector = ({ userType, selectedUserId, setUserId }) => {
  const [users, setUsers] = useState({ data: [], count: 0 });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = (offset) => {
    getUsers(userType, usersPerPage, offset).then(({ data }) => {
      setUsers(data);
    });
  };

  return (
    <div className="selector">
      <div className="selector__list">
        {users.data.map((user) => (
          <div
            key={user.id}
            className={`selector__user ${
              user.id === selectedUserId ? "selector__user--highlighted" : ""
            }`}
            onClick={() => setUserId(user.id)}>
            <img src={UserImage} className="selector__image" />
            <div>
              <div className="selector__fullname">
                {user.firstName} {user.lastName}
              </div>
              <div className="selector__email">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersSelector;
