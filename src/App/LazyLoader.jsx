// import loadable from '@loadable/component';

// export const Home = loadable(() => import('../Pages/Home/Home'));
// export const Search = loadable(() => import('../Pages/Search/Search'));
// export const Register = loadable(() => import('../Pages/Register/Register'));
// export const Login = loadable(() => import('../Pages/Login/Login'));
// export const Posting = loadable(() => import('../Pages/Posting/Posting'));
// export const Account = loadable(() => import('../Pages/Account/Account'));
// export const JobRoutes = loadable(() => import('../Pages/Jobs/'));
// export const PostResume = loadable(() => import('../Pages/Resume/PostResume'));
// export const ForgotPassword = loadable(() =>
//   import('../Pages/ForgotPassword/ForgotPassword')
// );
// export const Confirmation = loadable(() =>
//   import('../Pages/Confirmation/Confirmation')
// );
// Component Imports  -- might not need code splitting here
// export const Nav = loadable(() => import('../Components/Nav'));
// export const Footer = loadable(() => import('../Components/Footer/Footer'));

export { default as Home } from 'Pages/Home/Home';
export { default as Search } from 'Pages/Search/Search';
export { default as Register } from 'Pages/Register/Register';
export { default as Login } from 'Pages/Login/Login';
export { default as Posting } from 'Pages/Posting/Posting';
export { default as Account } from 'Pages/Account';
export { default as JobRoutes } from 'Pages/Jobs/';
export { default as PostResume } from 'Pages/Resume/';
export { default as ResumeSearch } from 'Pages/ResumeSearch/ResumeSearch';
export { default as ForgotPassword } from 'Pages/ForgotPassword/ForgotPassword';
export { default as Confirmation } from 'Pages/Confirmation/Confirmation';
export { PurchaseForm } from 'Pages/PurchaseForm';

// Component Imports  -- might not need code splitting here
export { default as Nav } from 'Components/Nav';
export { default as Footer } from 'Components/Footer/Footer';
// const Footer = loadable(() => import('./Components/Footer/Footer'));
