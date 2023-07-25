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

// function RequireAuth({ children }: { children: JSX.Element }) {
//   let auth = useAuth();
//   let location = useLocation();

//   if (!auth.user) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }

// const userLoader = async () => {
//   const user = await useRecoilValue(userSelector);
//   if (!user) {
//     return redirect('/login');
//   }
//   return null;
// };

export function App() {
  return (
    <Bootstrap>
      <RouterProvider router={router} />
    </Bootstrap>
  );
}
