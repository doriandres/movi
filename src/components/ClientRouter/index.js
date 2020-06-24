import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { NOT_FOUND, ADMIN_SIGN_IN, ADMIN_LANDING, ADMIN_ROUTES, ADMIN_DRIVERS, ADMIN_USERS } from '../../locations';
import Loading from "../Loading";
import PrivateRoute from "./components/PrivateRoute";
import { ADMIN } from "../../constants/roles";

const NotFoundPage = lazy(() => import("../NotFoundPage"));
const AdminSignInPage = lazy(() => import("../AdminSignInPage"));
const AdminLandingPage = lazy(() => import("../AdminLandingPage"));
const AdminRoutesPage = lazy(() => import("../AdminRoutesPage"));
const AdminDriversPage = lazy(() => import("../AdminDriversPage"));
const AdminUsersPage = lazy(() => import("../AdminUsersPage"));

export default function ClientRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={ADMIN_SIGN_IN()} component={AdminSignInPage} />
        <PrivateRoute exact path={ADMIN_LANDING()} component={AdminLandingPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_ROUTES()} component={AdminRoutesPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_USERS()} component={AdminUsersPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_DRIVERS()} component={AdminDriversPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <Route exact path={NOT_FOUND()} component={NotFoundPage} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Suspense>
  );
}