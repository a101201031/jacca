import { Bootstrap } from 'bootstrap';
import { Base, Cafe, CafeList, Home } from 'page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cafe/:cafeId',
        element: <Cafe />,
      },
      {
        path: '/cafe',
        element: <CafeList />,
      },
    ],
  },
]);

export function App() {
  return (
    <Bootstrap>
      <RouterProvider router={router} />
    </Bootstrap>
  );
}
