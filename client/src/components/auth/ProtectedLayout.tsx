import { useAuth } from "@clerk/react";
import { useAuthStore } from "@/features/auth/store";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
// Local fallback loader to avoid import resolution issues for ../common/Loader
const Commonloader = () => <div />;

export function ProtectedLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootstrapped, status } = useAuthStore();
  const location = useLocation();

  if (!isLoaded || (isSignedIn && (!isBootstrapped || status === "loading")))
    return <Commonloader />;

  // if user not logged in return to signIn page

  if (!isSignedIn) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}
