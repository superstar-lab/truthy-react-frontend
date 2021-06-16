/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  changePasswordAction,
  changeUsernameAction,
  onFormValidation,
} from 'containers/LoginPage/actions';
import {
  makeErrorSelector,
  makeIsLoadingSelector,
  makePasswordSelector,
  makeUsernameSelector,
} from 'containers/LoginPage/selectors';
import { Card, Form } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import AuthFormGroupWrapper from 'components/AuthFormGroupWrapper';
import messages from 'components/LoginForm/messages';
import { FormattedMessage } from 'react-intl';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import FormButtonWrapper from 'components/FormButtonWrapper';

const stateSelector = createStructuredSelector({
  username: makeUsernameSelector(),
  password: makePasswordSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const submitLoginForm = (e) =>
    dispatch(onFormValidation()) && e.preventDefault();
  const onChangePassword = (e) =>
    dispatch(changePasswordAction(e.target.value));
  const onChangeUsername = (e) =>
    dispatch(changeUsernameAction(e.target.value));

  const { username, password, errors, isLoading } = useSelector(stateSelector);
  return (
    <Form
      noValidate
      validated={errors.length < 1}
      className="mt-4"
      onSubmit={submitLoginForm}
    >
      <AuthFormGroupWrapper
        label={messages.email}
        name="username"
        id="username"
        type="text"
        value={username}
        icon={faEnvelope}
        required={false}
        focus={false}
        placeholder={messages.emailPlaceHolder}
        changeHandler={onChangeUsername}
        error={errors.username}
      />

      <AuthFormGroupWrapper
        label={messages.password}
        name="password"
        id="password"
        type="password"
        value={password}
        icon={faLock}
        required={false}
        focus={false}
        placeholder={messages.passwordPlaceHolder}
        changeHandler={onChangePassword}
        error={errors.password}
      />

      <Form.Group>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Card.Link as={Link} to="/forgot-password" className="small text-end">
            <FormattedMessage {...messages.lostPassword} />
          </Card.Link>
        </div>
      </Form.Group>

      <FormButtonWrapper
        variant="primary"
        className="w-100"
        disabled={isLoading}
        label={messages.submit}
      />
    </Form>
  );
};
export default LoginForm;
