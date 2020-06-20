import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ADMIN, CUSTOMER, DRIVER } from '../../../constants/roles';
import { selectAuth } from '../../../redux/selectors';
import { NOT_FOUND } from '../../../locations';

export default function PrivateRoute(props) {
  const { roles = [ADMIN, CUSTOMER, DRIVER] } = props;
  const { redirect = NOT_FOUND() } = props;
  const adminAuth = useSelector(selectAuth(ADMIN));
  const customerAuth = useSelector(selectAuth(CUSTOMER));
  const driverAuth = useSelector(selectAuth(DRIVER));

  if (
    (roles.includes(ADMIN) && adminAuth) ||
    (roles.includes(CUSTOMER) && customerAuth) ||
    (roles.includes(DRIVER) && driverAuth)
  ) {
    return <Route  {...props} />
  } else {
    return <Redirect to={redirect} />
  }
}