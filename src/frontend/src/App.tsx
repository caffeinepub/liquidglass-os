import { useEffect, useState } from "react";
import MainSitePage from "./pages/MainSitePage";
import NodesPage from "./pages/NodesPage";

function getRoute() {
  const hash = window.location.hash;
  if (hash.startsWith("#/nodes")) return "nodes";
  return "home";
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "nodes") return <NodesPage />;
  return <MainSitePage />;
}
