import { Home } from 'page';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />} />),
);

export function App() {
  return <RouterProvider router={router} />;
}
