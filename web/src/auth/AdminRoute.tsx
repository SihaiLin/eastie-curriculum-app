import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function AdminRoute({ children }: { children: ReactNode }) {
  const { currentUser, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return <main className="admin-page"><p className="auth-status">Checking account access...</p></main>;
  }

  if (!currentUser) {
    const redirect = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate replace to={`/login?redirect=${encodeURIComponent(redirect)}`} />;
  }

  if (currentUser.role !== "admin") {
    return (
      <main className="admin-page">
        <section className="dashboard-section">
          <h1>Admin access required</h1>
          <p>This feedback review page is available to EASTIE admin users only.</p>
        </section>
      </main>
    );
  }

  return children;
}
