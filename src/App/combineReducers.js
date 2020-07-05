import { combineReducers } from 'redux';

import app from 'App/appReducer';
import search from 'Pages/Search/reducer';
import jobs from 'Pages/Jobs/reducer';
import account from 'Pages/Account/reducer';
import posting from 'Pages/Posting/reducer';
import resumeSearch from 'Pages/ResumeSearch/reducer';

export default combineReducers({
  app,
  search,
  jobs,
  account,
  posting,
  resumeSearch,
});
