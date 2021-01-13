import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import routes from './../../routes'

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  const showContentMenus = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index}
          path={route.path}
          exact={route.exact}
          component={route.main} />
      })
    }
    return result
  }

  return (
    <div className={classes.root}>
        <Header history={props.history}/>
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
          {showContentMenus(routes)}
          </Switch>
        </div>
    </div>
  );
}

export default withRouter(Layout);
