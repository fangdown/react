import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Bundle from '@common/component/asyncLoad/Bundle.jsx';

const AsyncStateLoad = () => import('@modules/experience/asyncState/AsyncState.jsx');
const AsyncState = (props) => {
  return (
    <Bundle name="TestPop" load={AsyncStateLoad}>
      {(Comp) => { return <Comp {...props} />; }}
    </Bundle>
  );
};
const Experience = ({ match }) => {
  return (
    <div>111
      <Switch>
        <Route exact path="/experience/asyncState" component={AsyncState} />
      </Switch>
    </div>
  );
};
export default Experience;
