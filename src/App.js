import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

// import gives you a promise
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import('./pages/Blog').then((module) => module.loader()),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            // meta holds the params with the ID
            loader: (meta) =>
              import('./pages/Post').then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
