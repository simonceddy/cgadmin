import { createRef } from 'react';
import ListPages from './features/pages/ListPages';
import EditPage from './features/pages/EditPage';
import CreatePage from './features/pages/CreatePage';

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
  {
    key: 'createPage',
    nodeRef: createRef(),
    path: '/create/page',
    element: <CreatePage />,
    label: 'Create Page',
  },
  {
    key: 'editPage',
    nodeRef: createRef(),
    path: '/edit/:slug',
    element: <EditPage />,
  }
];

export default routes;
