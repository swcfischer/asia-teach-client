import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Progress from 'Components/Progress';

import ResumeDetails from './ResumeDetails';
import ProfileCrop from './ProfileCrop';
import ResumeUpload from './ResumeUpload';
import ResumePreview from './ResumePreview/ResumePreview';

const linkArray = [
  { stepperType: 'details', text: 'Resume Details' },
  { stepperType: 'profile-image', text: 'Profile Image' },
  { stepperType: 'resume', text: 'Resume or Rich Text' },
  { stepperType: 'preview', text: 'Preview' },
];

const Routes = (props) => {
  return (
    <div style={{ marginBottom: '100px' }}>
      <Route path="/post-resume/:type/:uuid">
        <Progress
          linkArray={linkArray}
          baseLink="/post-resume/"
          containerClassName="resume-progress-container"
        />
      </Route>
      <Switch>
        <Route
          path="/post-resume/details/:userUuid"
          component={ResumeDetails}
        />
        <Route
          path="/post-resume/profile-image/:userUuid"
          component={ProfileCrop}
        />
        <Route path="/post-resume/resume/:userUuid" component={ResumeUpload} />
        <Route
          path="/post-resume/preview/:userUuid"
          component={ResumePreview}
        />
      </Switch>
    </div>
  );
};

export default Routes;
