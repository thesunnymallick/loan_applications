import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from './AppRoutes';
// import NotFound from './components/AppPages/NotFound';
import ProtectedRoute from './config/ProtectedRoute'; // To protect certain routes

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(
          (
            { path, element: Element, layout: Layout, protected: isProtected, loginType, allowedRoles },
            index
          ) => {
            const RouteElement = isProtected ? (
              <ProtectedRoute element={Element} isProtected={isProtected} allowedRoles={allowedRoles} />
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
  );
};

export default App;
