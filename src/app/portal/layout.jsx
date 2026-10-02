import PortalGuard from "@/app/components/auth/PortalGuard";
import PortalSidebar from "@/app/components/portal/PortalSidebar";

/**
 * Portal layout — wraps every page under /portal/*.
 * PortalGuard handles auth-checking and redirects.
 * PortalSidebar provides role-aware navigation.
 */
export default function PortalLayout({ children }) {
  return (
    <PortalGuard>
      <div className="portal-layout">
        <PortalSidebar />
        <div className="portal-main">
          {children}
        </div>
      </div>
    </PortalGuard>
  );
}
