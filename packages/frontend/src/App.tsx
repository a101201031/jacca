import { Bootstrap } from 'bootstrap';
import { Base, Cafe, Home } from 'page';
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
      { path: '/cafe/:cafeId', element: <Cafe /> },
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
