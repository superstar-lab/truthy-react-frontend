/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'containers.LoginPage';

export default defineMessages({
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Go Back',
  },
  errorLogin: {
    id: `${scope}.errorLogin`,
    defaultMessage: 'Invalid credentials',
  },
  sessionOut: {
    id: `${scope}.sessionOut`,
    defaultMessage: 'Your session has expired',
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please try again in a moment!',
  },
  loginToTheSystem: {
    id: `${scope}.loginToTheSystem`,
    defaultMessage: 'Log in',
  },
  loginSuccess: {
    id: `${scope}.loginSuccess`,
    defaultMessage: 'Successfully logged in!',
  },
  helmetLoginTitle: {
    id: `${scope}.HelmetLoginTitle`,
    defaultMessage: 'Login',
  },
});
