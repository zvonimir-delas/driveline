import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../../../services/users";

import "../../../../styles/screens/admin/_users.scss";
import UserList from "./UserList";
import UserForm from "./UserForm";
import Modal from "../../../helpers/Modal";
import Dialog from "../../../helpers/Dialog";

const usersPerPage = 10;

const Users = () => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState({ data: [], count: 0 });
  const [formToggle, setFormToggle] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    handleUsersUpdate(0);
  }, []);

  const handleUsersUpdate = (offset, roleAsInt) => {
    getUsers(roleAsInt, usersPerPage, offset).then(({ data }) =>
      setUsers(data)
    );
  };

  const handlePageChange = (data) => {
    const newPage = data.selected;
    const offset = newPage * usersPerPage;
    setPage(newPage);
    handleUsersUpdate(offset);
  };

  const handleFormToggle = (id) => {
    setSelectedUserId(id);
    setFormToggle(!formToggle);
  };

  const handleUserDelete = () => {
    userToDelete &&
      deleteUser(userToDelete).then(() => {
        handleUsersUpdate(page * usersPerPage, -1);
        setUserToDelete(null);
        setPage(0);
      });
  };

  return (
    <>
      <main className="users">
        <UserList
          page={page}
          users={users}
          formToggleHandler={handleFormToggle}
          setUserToDelete={setUserToDelete}
          usersPerPage={usersPerPage}
          pageChangeHandler={handlePageChange}
        />
      </main>
      <Modal
        title={selectedUserId ? "Edit user" : "Add user"}
        toggle={formToggle}
        toggleHandler={handleFormToggle}>
        <UserForm
          usersUpdateHandler={handleUsersUpdate}
          selectedUserId={selectedUserId}
          formToggleHandler={handleFormToggle}
          setPage={setPage}
        />
      </Modal>
      <Dialog
        title="Delete user"
        toggle={userToDelete}
        toggleHandler={() => setUserToDelete()}
        actionHandler={handleUserDelete}>
        Are you sure you want to delete user{" "}
        {userToDelete && userToDelete.firstName}{" "}
        {userToDelete && userToDelete.lastName}?
      </Dialog>
    </>
  );
};

export default Users;
