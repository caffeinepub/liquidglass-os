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

function PageTransition({
  children,
  routeKey,
}: {
  children: React.ReactNode;
  routeKey: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
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
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute inset-0">
          <BeamsBackground intensity="medium" />
        </div>
        <div className="block md:hidden absolute inset-0 bg-[#050505]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-700/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-purple-700/4 rounded-full blur-[140px] pointer-events-none" />
      </div>

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
