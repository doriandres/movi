import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { NOT_FOUND, ADMIN_SIGN_IN, ADMIN_LANDING, ADMIN_ROUTES, ADMIN_DRIVERS, ADMIN_USERS, DRIVERS_SIGN_IN, DRIVERS_LANDING, DRIVERS_CHECKOUT, DRIVERS_INCOMES, DRIVERS_REJECTED, CUSTOMERS_LANDING, CUSTOMERS_SIGN_IN, CUSTOMERS_SIGN_UP, CUSTOMERS_BALANCE, CUSTOMERS_DEPOSIT, CUSTOMERS_EXPENSES, CUSTOMERS_TRIPS, ADMIN_INACTIVE_USERS } from '../../locations';
import Loading from "../Loading";
import PrivateRoute from "./components/PrivateRoute";
import { ADMIN, DRIVER, CUSTOMER } from "../../constants/roles";

const NotFoundPage = lazy(() => import("../NotFoundPage"));
const AdminSignInPage = lazy(() => import("../AdminSignInPage"));
const AdminLandingPage = lazy(() => import("../AdminLandingPage"));
const AdminRoutesPage = lazy(() => import("../AdminRoutesPage"));
const AdminDriversPage = lazy(() => import("../AdminDriversPage"));
const AdminUsersPage = lazy(() => import("../AdminUsersPage"));
const AdminInactiveUsersPage = lazy(() => import("../AdminInactiveUsersPage"));
const DriversSignInPage = lazy(() => import("../DriversSignInPage"));
const DriversLandingPage = lazy(() => import("../DriversLandingPage"));
const DriversUsersCheckout = lazy(() => import("../DriversUsersCheckout"));
const DriversIncomesReport = lazy(() => import("../DriversIncomesReport"));
const DriversRejectedUsersReport = lazy(() => import("../DriversRejectedUsersReport"));
const CustomersSignInPage = lazy(() => import("../CustomersSignInPage"));
const CustomerLandingPage = lazy(() => import("../CustomerLandingPage"));
const CustomersSignUp = lazy(() => import("../CustomersSignUp"));
const CustomerMyBalancePage = lazy(() => import("../CustomerMyBalancePage"));
const CustomerDepositPage = lazy(() => import("../CustomerDepositPage"));
const CustomerExpensesPage = lazy(() => import("../CustomerExpensesPage"));
const CustomersTripsPage = lazy(() => import("../CustomersTripsPage"));

export default function ClientRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={ADMIN_SIGN_IN()} component={AdminSignInPage} />
        <Route exact path={DRIVERS_SIGN_IN()} component={DriversSignInPage} />
        <Route exact path={CUSTOMERS_SIGN_IN()} component={CustomersSignInPage} />
        <Route exact path={CUSTOMERS_SIGN_UP()} component={CustomersSignUp} />
        <PrivateRoute exact path={ADMIN_LANDING()} component={AdminLandingPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_ROUTES()} component={AdminRoutesPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_USERS()} component={AdminUsersPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_INACTIVE_USERS()} component={AdminInactiveUsersPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={ADMIN_DRIVERS()} component={AdminDriversPage} redirect={ADMIN_SIGN_IN()} roles={[ADMIN]} />
        <PrivateRoute exact path={DRIVERS_LANDING()} component={DriversLandingPage} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <PrivateRoute exact path={DRIVERS_CHECKOUT()} component={DriversUsersCheckout} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <PrivateRoute exact path={DRIVERS_INCOMES()} component={DriversIncomesReport} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <PrivateRoute exact path={DRIVERS_REJECTED()} component={DriversRejectedUsersReport} redirect={DRIVERS_SIGN_IN()} roles={[DRIVER]} />
        <PrivateRoute exact path={CUSTOMERS_LANDING()} component={CustomerLandingPage} redirect={CUSTOMERS_SIGN_IN()} roles={[CUSTOMER]} />
        <PrivateRoute exact path={CUSTOMERS_BALANCE()} component={CustomerMyBalancePage} redirect={CUSTOMERS_SIGN_IN()} roles={[CUSTOMER]} />
        <PrivateRoute exact path={CUSTOMERS_DEPOSIT()} component={CustomerDepositPage} redirect={CUSTOMERS_SIGN_IN()} roles={[CUSTOMER]} />
        <PrivateRoute exact path={CUSTOMERS_EXPENSES()} component={CustomerExpensesPage} redirect={CUSTOMERS_SIGN_IN()} roles={[CUSTOMER]} />
        <PrivateRoute exact path={CUSTOMERS_TRIPS()} component={CustomersTripsPage} redirect={CUSTOMERS_SIGN_IN()} roles={[CUSTOMER]} />
        <Route exact path={NOT_FOUND()} component={NotFoundPage} />
        <Route path="*">
          <Redirect to={NOT_FOUND()} />
        </Route>
      </Switch>
    </Suspense>
  );
}