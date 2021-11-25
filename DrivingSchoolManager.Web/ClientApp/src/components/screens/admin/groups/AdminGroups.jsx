import React, { useState, useEffect } from "react";
import "../../../../styles/screens/admin/_groups.scss";

import { getUserInfo } from "../../../../utils/jwt";
import {
  getGroupsByDrivingSchoolId,
  deleteGroup,
} from "../../../../services/groups";

import SectionSeperator from "../../../helpers/SectionSeperator";
import Modal from "../../../helpers/Modal";
import Dialog from "../../../helpers/Dialog";

import GroupList from "./GroupList";
import GroupForm from "./GroupForm";

const groupsPerPage = 5;

const AdminGroups = () => {
  const [page, setPage] = useState(0);
  const [groups, setGroups] = useState({ data: [], count: 0 });
  const [formToggle, setFormToggle] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = (offset = 0) => {
    const userInfo = getUserInfo();
    getGroupsByDrivingSchoolId(
      userInfo.drivingSchoolId,
      groupsPerPage,
      offset
    ).then(({ data }) => {
      setGroups(data);
    });
  };

  const handlePageChange = (data) => {
    const newPage = data.selected;
    const offset = newPage * groupsPerPage;
    setPage(newPage);
    fetchGroups(offset);
  };

  const handleFormToggle = (id = null) => {
    setSelectedGroupId(id);
    setFormToggle(!formToggle);
  };

  const handleGroupDelete = () => {
    if (groupToDelete)
      deleteGroup(groupToDelete.id).then(() => {
        fetchGroups();
        setGroupToDelete(null);
        setPage(0);
      });
  };

  return (
    <main className="admin-groups">
      <SectionSeperator
        title="Groups"
        button="+ Add"
        buttonClickHandler={handleFormToggle}
      />
      <GroupList
        page={page}
        groups={groups}
        groupsPerPage={groupsPerPage}
        formToggleHandler={handleFormToggle}
        setGroupToDelete={setGroupToDelete}
        pageChangeHandler={handlePageChange}
      />
      <Modal
        title={selectedGroupId ? "Edit group" : "Add group"}
        toggle={formToggle}
        toggleHandler={handleFormToggle}>
        <GroupForm
          fetchGroups={fetchGroups}
          setFormToggle={setFormToggle}
          selectedGroupId={selectedGroupId}
          setPage={setPage}
        />
      </Modal>
      <Dialog
        title="Delete group"
        toggle={groupToDelete}
        toggleHandler={() => setGroupToDelete()}
        actionHandler={() => handleGroupDelete(groupToDelete.id)}>
        Are you sure you want to delete {groupToDelete && groupToDelete.name}{" "}
        group?
      </Dialog>
    </main>
  );
};

export default AdminGroups;
