import { Bootstrap } from 'bootstrap';
import { Home } from 'page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export function App() {
  return (
    <Bootstrap>
      <RouterProvider router={router} />
    </Bootstrap>
  );
}
