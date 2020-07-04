import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { NOT_FOUND, ADMIN_SIGN_IN, ADMIN_LANDING, ADMIN_ROUTES, ADMIN_DRIVERS, ADMIN_USERS, HOME_PAGE, DRIVERS_SIGN_IN, DRIVERS_LANDING, DRIVERS_CHECKOUT, DRIVERS_INCOMES, DRIVERS_REJECTED } from '../../locations';
import Loading from "../Loading";
import PrivateRoute from "./components/PrivateRoute";
import { ADMIN, DRIVER } from "../../constants/roles";

const NotFoundPage = lazy(() => import("../NotFoundPage"));
const AdminSignInPage = lazy(() => import("../AdminSignInPage"));
const AdminLandingPage = lazy(() => import("../AdminLandingPage"));
const AdminRoutesPage = lazy(() => import("../AdminRoutesPage"));
const AdminDriversPage = lazy(() => import("../AdminDriversPage"));
const AdminUsersPage = lazy(() => import("../AdminUsersPage"));
const DriversSignInPage = lazy(() => import("../DriversSignInPage"));
const DriversLandingPage = lazy(() => import("../DriversLandingPage"));
const DriversUsersCheckout = lazy(() => import("../DriversUsersCheckout"));
const DriversIncomesReport = lazy(() => import("../DriversIncomesReport"));
const DriversRejectedUsersReport = lazy(() => import("../DriversRejectedUsersReport"));

export default function ClientRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={ADMIN_SIGN_IN()} component={AdminSignInPage} />
        <Route exact path={DRIVERS_SIGN_IN()} component={DriversSignInPage} />
        <PrivateRoute exact path={ADMIN_LANDING()} component={AdminLandingPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_ROUTES()} component={AdminRoutesPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_USERS()} component={AdminUsersPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_DRIVERS()} component={AdminDriversPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={DRIVERS_LANDING()} component={DriversLandingPage} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <PrivateRoute exact path={DRIVERS_CHECKOUT()} component={DriversUsersCheckout} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <PrivateRoute exact path={DRIVERS_INCOMES()} component={DriversIncomesReport} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <PrivateRoute exact path={DRIVERS_REJECTED()} component={DriversRejectedUsersReport} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <Route exact path={HOME_PAGE()}>
          <Redirect to={ADMIN_SIGN_IN()} />
        </Route>
        <Route exact path={NOT_FOUND()} component={NotFoundPage} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Suspense>
  );
}