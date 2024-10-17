
import React, {  useEffect } from "react";
import {  useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, isProtected }) => {
//   const { authInfo } = useSelector((state) => state.login);
//   const [redirectPath, setRedirectPath] = useState(null);
//   const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = true

  useEffect(() => {
    // If user is not logged in and the route is protected, show login modal
    if (!isLoggedIn && isProtected) {
    //   setRedirectPath(location.pathname);
    console.log("User Not Login")
    }
  }, [isLoggedIn, isProtected,  location.pathname]);

 



//   // Show login modal for unauthenticated users
//   if (!isLoggedIn && isProtected) {
//     return (
//       <>
//         <Result
//           status='403'
//           title='403'
//           subTitle='You need to be logged in to view this page.'
//           extra={
//             <Button type='primary' onClick={handleLoginButtonClick}>
//               Login
//             </Button>
//           }
//         />
//         <LoginModal
//           isOpen={modalOpen}
//           onClose={handleModalClose}
//           onLogin={handleLoginSuccess}
//           onSignup={() => navigate("/sign-up")}
//         />
//       </>
//     );
//   }

 

  // Render the component for authenticated and verified users
  return <Component />;
};

export default ProtectedRoute;