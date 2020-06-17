import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HOME_PAGE, NOT_FOUND, ADMIN_SIGN_IN, SIGN_IN } from '../../locations';
import Loading from "../Loading";
import PrivateRoute from "./components/PrivateRoute";
import { CUSTOMER } from "../../constants/roles";

const HomePage = lazy(() => import("../HomePage"));
const NotFoundPage = lazy(() => import("../NotFoundPage"));
const AdminSignInPage = lazy(() => import("../AdminSignInPage"));
const SignInPage = lazy(() => import("../SignInPage"));

export default function ClientRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={ADMIN_SIGN_IN()} component={AdminSignInPage} />
        <Route exact path={SIGN_IN()} component={SignInPage} />
        <PrivateRoute exact path={HOME_PAGE()} component={HomePage} redirect={SIGN_IN()} roles={[CUSTOMER]} />
        <Route exact path={NOT_FOUND()} component={NotFoundPage} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Suspense>
  );
}