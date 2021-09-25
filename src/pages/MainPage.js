import React, { useEffect, useState } from "react";
//import { Menu, Layout } from "antd";
import { Menu } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";
import SeedReport from "./seedReportTable";
import AdminTools from "./adminTools";
import RedeemPage from "./redeemPage";
import PeerCoupon from "./peerCouponTable";
import FillConsentForm from "./consentForm";
import Welcome from "./welcome";
import Thankyou from "./thankyou";
import ThankYouNotConsented from "./thankyouNotConsent";
import TestScheduleReport from "./testScheduleTable";
import AddPeers from "./addPeers";
import Survey from "./survey";
import CohortTablePage from "./cohortManagementTable";

/**
 * Route Config Data
 */
const ROUTE_CONFIG = [
  {
    path: "/redeem",
    component: RedeemPage,
  },
  {
    path: "/seedreport",
    component: SeedReport,
  },
  {
    path: "/cohort",
    component: CohortTablePage,
  },
  {
    path: "/admintools",
    component: AdminTools,
  },
  {
    path: "/consent",
    component: FillConsentForm,
  },
  {
    path: "/survey",
    component: Survey,
  },
  {
    path: "/peers",
    component: AddPeers,
  },
  {
    path: "/thankyou",
    component: Thankyou,
  },
  {
    path: "/thankyounotconsent",
    component: ThankYouNotConsented,
  },
  {
    path: "/participants",
    component: PeerCoupon,
  },
  {
    path: "/testschedule",
    component: TestScheduleReport,
  },
  {
    path: "/",
    component: Welcome,
  },
];

/**
 * Menu Config Data
 */
const MENU_CONFIG = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Seeds Report",
    path: "/seedreport",
  },
  {
    label: "Cohort Management",
    path: "/cohort",
  },
  {
    label: "Peer Coupon Distribution",
    path: "/participants",
  },
  {
    label: "Schedule Test For Peers",
    path: "/testschedule",
  },
  {
    label: "Admin Tools",
    path: "/admintools",
  },
];

/**
 * Router Wrapper component
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

/**
 * Menu navigation
 */
const MenuNav = withRouter((props) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onSelect = ({ key }) => {
    setSelectedKeys([key]);
  };

  useEffect(() => {
    setSelectedKeys([props.location.pathName]);
  }, [props.location]);

  return (
    <Menu mode="horizontal" selectedKeys={selectedKeys} onSelect={onSelect}>
      {MENU_CONFIG.map((menu) => (
        <Menu.Item key={menu.path}>
          <Link to={menu.path}>{menu.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
});

/**
 * creating Main page
 */
const MainPage = (props) => {
  return (
    <Router>
      <MenuNav></MenuNav>
      <Switch>
        {ROUTE_CONFIG.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
};

export default MainPage;
