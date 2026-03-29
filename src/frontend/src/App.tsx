import { useEffect, useState } from "react";
import { BeamsBackground } from "./components/ui/beams-background";
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

  return (
    <>
      <BeamsBackground intensity="medium" />
      {route === "nodes" ? <NodesPage /> : <MainSitePage />}
    </>
  );
}
