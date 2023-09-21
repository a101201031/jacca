import { Bootstrap } from 'bootstrap';
import { Base, Cafe, CafeList, Home } from 'page';
import { SignUp } from 'page/SignUp';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/',
    element: <Base />,
    children: [
      {
        path: '/cafe/:cafeId',
        element: <Cafe />,
      },
      {
        path: '/cafe',
        element: <CafeList />,
      },
      {
        path: '/',
        element: <Home />,
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
