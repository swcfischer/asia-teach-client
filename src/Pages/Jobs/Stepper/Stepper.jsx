import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Details from '../JobDetails/JobDetails';
import RichText from '../RichText/RichText';
import ImageCrop from '../ImageCrop/ImageCrop';
import ImageUpload from '../ImageUpload/ImageUpload';
import Preview from '../Preview/';
import Progress from 'Components/Progress';

const linkArray = [
  { stepperType: 'details', text: 'Job Criteria' },
  { stepperType: 'description', text: 'Job Description' },
  { stepperType: 'image-crop', text: 'Upload Image Head' },
  { stepperType: 'carousel-images', text: 'Carousel Image Upload' },
  { stepperType: 'preview', text: 'Preview Job Posting' },
];

const JobStepper = () => {
  return (
    <div style={{ paddingBottom: '50px' }}>
      <Route path="/post-job/stepper/:type/:uuid">
        <Progress linkArray={linkArray} baseLink="/post-job/stepper/" />
      </Route>
      <Switch>
        <Route
          path="/post-job/stepper/description/:uuid"
          component={RichText}
        />
        <Route
          path="/post-job/stepper/image-crop/:uuid"
          component={ImageCrop}
        />
        <Route
          path="/post-job/stepper/carousel-images/:uuid"
          component={ImageUpload}
        />
        <Route path="/post-job/stepper/preview/:uuid" component={Preview} />
        <Route path="/post-job/stepper/details/:uuid" component={Details} />
        <Redirect to="/post-job" />
      </Switch>
    </div>
  );
};

export default JobStepper;
