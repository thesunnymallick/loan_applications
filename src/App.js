import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from './AppRoutes';
// import NotFound from './components/AppPages/NotFound';
import ProtectedRoute from './config/ProtectedRoute'; // To protect certain routes
import { SyncLoader} from "react-spinners"
const App = () => {



  const Loading = () => (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner from react-spinners */}
        <SyncLoader  color="#00A300" />
  
        {/* Loading Text */}
        <span className="text-2xl font-semibold text-gray-900 mt-4">
          Please wait...
        </span>
      </div>
    </div>
  );


  return (
    <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Routes>
        {routes.map(
          (
            { path, element: Element, layout: Layout, protected: isProtected, loginType, 
             loanType, allowedRoles },
            index
          ) => {
            const RouteElement = isProtected ? (
              <ProtectedRoute 
              loanType={loanType}
              element={Element} 
              isProtected={isProtected} 
              allowedRoles={allowedRoles} />
            ) : (
              <Element loginType={loginType} />
            );

            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    {RouteElement}
                  </Layout>
                }
              />
            );
          }
        )}
        {/* Catch-all route for 404 */}
        {/* <Route
          path="*"
          element={
            <RootLayout>
              <NotFound />
            </RootLayout>
          }
        /> */}
      </Routes>
    </BrowserRouter>
    </Suspense>
  );
};

export default App;
