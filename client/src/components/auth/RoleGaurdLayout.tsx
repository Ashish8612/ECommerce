import { useAuthStore } from "@/features/auth/store";
import type { UserRole } from "@/lib/types";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


type RoleGuardLayoutProps = {
  allow: UserRole[];
};

// Simple fallback loader component to avoid missing import
const Commonloader = () => <div>Loading...</div>;

export function RoleGuardLayout({ allow }: RoleGuardLayoutProps) {
  const { isBootstrapped, status, user } = useAuthStore();

  if (!isBootstrapped || status === "loading") {
    return <Commonloader />;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!allow.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
