import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Stepper from './Stepper/Stepper';
import Purchase from './Purchase';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/post-job/stepper/" component={Stepper} />"
        <Route path="/post-job/purchase-jobs" component={Purchase} />
      </Switch>
    </div>
  );
}
