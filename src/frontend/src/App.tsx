import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BeamsBackground } from "./components/ui/beams-background";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MainSitePage from "./pages/MainSitePage";
import NodeListPage from "./pages/NodeListPage";
import NodesPage from "./pages/NodesPage";

type Route = "home" | "login" | "dashboard" | "node-list" | "nodes";

function getRoute(): { route: Route; nodeId?: string } {
  const hash = window.location.hash;
  if (hash.startsWith("#/nodes/")) {
    const id = hash.replace("#/nodes/", "");
    return { route: "nodes", nodeId: id };
  }
  if (hash === "#/nodes") return { route: "node-list" };
  if (hash === "#/node-list") return { route: "node-list" };
  if (hash === "#/login") return { route: "login" };
  if (hash === "#/dashboard") return { route: "dashboard" };
  return { route: "home" };
}

// Fast, lightweight page transition — opacity only, 120ms max
function PageTransition({
  children,
  routeKey,
}: {
  children: React.ReactNode;
  routeKey: string;
}) {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [{ route, nodeId }, setRouteState] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRouteState(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      {/* Persistent background — never re-mounts on route change */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute inset-0">
          <BeamsBackground intensity="medium" />
        </div>
        <div className="block md:hidden absolute inset-0 bg-[#050505]" />
      </div>

      {/* Cinematic scan line — drifts slowly across screen */}
      <div className="scan-line" />

      <div className="relative z-10">
        {route === "home" && (
          <PageTransition routeKey="home">
            <MainSitePage />
          </PageTransition>
        )}
        {route === "login" && (
          <PageTransition routeKey="login">
            <LoginPage />
          </PageTransition>
        )}
        {route === "dashboard" && (
          <PageTransition routeKey="dashboard">
            <DashboardPage />
          </PageTransition>
        )}
        {route === "node-list" && (
          <PageTransition routeKey="node-list">
            <NodeListPage />
          </PageTransition>
        )}
        {route === "nodes" && (
          <PageTransition routeKey={`nodes-${nodeId ?? "0"}`}>
            <NodesPage nodeId={nodeId} />
          </PageTransition>
        )}
      </div>
    </>
  );
}
