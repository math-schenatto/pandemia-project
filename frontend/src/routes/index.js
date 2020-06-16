import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import OngFreeAppointment from '../pages/OngFreeAppointment';
import Donate from '../pages/Donate';

export default function Routes() {

  return (
    <Switch>
      <Route path="/" exact component={SignIn}/>
      <Route path="/register" component={SignUp}/>

      <Route path="/dashboard" component={Dashboard} isPrivate/>
      <Route path="/profile" component={Profile} isPrivate/>
      <Route path="/ong/:provider_id" exact component={OngFreeAppointment} isPrivate/>
      <Route path="/ong/:provider_id/:date/donate" exact component={Donate} isPrivate/>
    </Switch>
  );

}