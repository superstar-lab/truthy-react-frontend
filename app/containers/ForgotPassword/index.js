/**
 *
 * ForgotPasswordPage
 *
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/ForgotPassword/saga';
import reducer from 'containers/ForgotPassword/reducer';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeFieldAction,
  validateFormAction,
} from 'containers/ForgotPassword/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeEmailSelector,
  makeErrorsSelector,
  makeIsLoadingSelector,
} from 'containers/ForgotPassword/selectors';
import { Helmet } from 'react-helmet';
import { hideHeaderAction } from 'containers/App/actions';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/ForgotPassword/messages';
import loginMessage from 'components/LoginForm/messages';
import FormButtonWrapper from 'components/FormButtonWrapper';
import { Card, Col, Container, Form, Row } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import BgImage from 'assets/img/illustrations/signin.svg';
import AuthFormGroupWrapper from 'components/AuthFormGroupWrapper';

const key = 'forgotPassword';

const stateSelector = createStructuredSelector({
  email: makeEmailSelector(),
  errors: makeErrorsSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const hideHeader = () => dispatch(hideHeaderAction(true));
  const submitForgotPasswordForm = (e) =>
    dispatch(validateFormAction()) && e.preventDefault();
  const onChangeField = (e) =>
    dispatch(changeFieldAction(e.target.name, e.target.value));
  const { email, errors, isLoading } = useSelector(stateSelector);
  useEffect(() => {
    hideHeader();
  }, []);

  return (
    <main>
      <FormattedMessage {...messages.helmetForgotPwdTitle}>
        {(title) => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to="/" className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
              <FormattedMessage {...messages.back} />
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">
                    <FormattedMessage {...messages.forgotPassword} />
                  </h3>
                </div>
                <Form
                  noValidate
                  validated={errors.length < 1}
                  className="mt-4"
                  onSubmit={submitForgotPasswordForm}
                >
                  <AuthFormGroupWrapper
                    label={loginMessage.email}
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    icon={faEnvelope}
                    required={false}
                    focus={false}
                    placeholder={loginMessage.emailPlaceHolder}
                    changeHandler={onChangeField}
                    error={errors.email}
                  />
                  <FormButtonWrapper
                    className="w-100"
                    variant="primary"
                    disabled={isLoading}
                    label={messages.forgotPasswordBtn}
                  />
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
