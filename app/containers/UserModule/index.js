/**
 *
 * UserModule
 *
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/UserModule/reducer';
import { createStructuredSelector } from 'reselect';
import saga from 'containers/UserModule/saga';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/UserModule/messages';
import {
  makeIdSelector,
  makeIsLoadingSelector,
  makePageNumberSelector,
  makePageSizeSelector,
} from 'containers/UserModule/selectors';
import {
  getUserByIdAction,
  queryRolesListAction,
  queryUsersAction,
  setFormMethodAction,
  setIdAction,
  setSearchKeywordAction,
} from 'containers/UserModule/actions';
import SearchInput from 'components/SearchInput';
import UserTable from 'containers/UserModule/userTable';
import CreateUserModal from 'containers/UserModule/createUserModal';
import { POST, PUT } from 'utils/constants';
import EditUserModal from 'containers/UserModule/editUserModal';
import { Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

const key = 'userModule';

const stateSelector = createStructuredSelector({
  pageNumber: makePageNumberSelector(),
  pageSize: makePageSizeSelector(),
  isLoading: makeIsLoadingSelector(),
  id: makeIdSelector(),
});

const UserModule = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [createUser, setCreateUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const { pageNumber, pageSize, isLoading, id } = useSelector(stateSelector);
  const loadUsers = () => dispatch(queryUsersAction());
  const loadRoles = () => dispatch(queryRolesListAction());
  const onKeywordChange = (keywords) =>
    dispatch(setSearchKeywordAction(keywords)) && loadUsers();
  const onchangeFormMethod = (formMethod) =>
    dispatch(setFormMethodAction(formMethod));
  const onSetId = (entityId) => dispatch(setIdAction(entityId));

  const onCreate = () => {
    onchangeFormMethod(POST);
    setCreateUser(true);
  };

  const onEdit = (updateId) => {
    onSetId(updateId);
    onchangeFormMethod(PUT);
    setEditUser(true);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getUserByIdAction(id));
    }
  }, [id]);

  useEffect(() => {
    loadUsers();
  }, [pageNumber, pageSize]);

  return (
    <div className="truthy-wrapper">
      <FormattedMessage {...messages.helmetTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <div className="truthy-breadcrumb">
        <h2>User Management</h2>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/" className="links">
              Dashboard
            </NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="current active">
            User Management
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="truthy-content-header">
        <div className="d-flex">
          {/* <div className="add-wrap">

          </div> */}
          <div className="d-flex ml-auto search-wrap">
            <SearchInput isLoading={isLoading} onSearch={onKeywordChange} />
          </div>
        </div>
      </div>

      <div className="truthy-table ">
        <UserTable onCreate={onCreate} onEdit={onEdit} />
      </div>
      <CreateUserModal
        visible={createUser}
        onCancel={() => setCreateUser(false)}
        onCreate={() => setCreateUser(false)}
      />
      <EditUserModal
        visible={editUser}
        onCancel={() => setEditUser(false)}
        onCreate={() => setEditUser(false)}
      />
    </div>
  );
};

export default UserModule;
