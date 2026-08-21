import { useAuth } from "@clerk/react";
import { useAuthStore } from "@/features/auth/store";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Commonloader } from "../common/loader";



export function PublicOnlyLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootstrapped, status } = useAuthStore();
  const location = useLocation();

  if (!isLoaded) return null;

  if (isSignedIn && (!isBootstrapped || status === "loading")) {
   return <Commonloader />;
   
    
  }

  if (
    isSignedIn &&
    (location.pathname === "/sign-in" || location.pathname === "/sign-up")
  ) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}