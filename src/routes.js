import { createRef } from 'react';
import ListPages from './features/pages/ListPages';
import EditPage from './features/pages/EditPage';

const routes = [
  {
    key: 'home',
    nodeRef: createRef(),
    path: '/',
    element: <div>Home</div>,
    label: 'Dashboard',
  },
  {
    key: 'pages',
    nodeRef: createRef(),
    path: '/pages',
    element: <ListPages />,
    label: 'Pages',
  },
  // {
  //   key: 'blog',
  //   nodeRef: createRef(),
  //   path: '/blog',
  //   element: <ListBlogPosts />,
  //   label: 'Blog',
  // },
  {
    key: 'editPage',
    nodeRef: createRef(),
    path: '/edit/:slug',
    element: <EditPage />,
  }
];

export default routes;
