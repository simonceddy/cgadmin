import { createRef } from 'react';
import CreateBlogPost from './features/blog/CreateBlogPost';
import ListBlogPosts from './features/blog/ListBlogPosts';

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
    element: <div>Pages</div>,
    label: 'Pages',
  },
  {
    key: 'blog',
    nodeRef: createRef(),
    path: '/blog',
    element: <ListBlogPosts />,
    label: 'Blog',
  },
  {
    key: 'newBlogPost',
    nodeRef: createRef(),
    path: '/blog/newPost',
    element: <CreateBlogPost />,
  }
];

export default routes;
