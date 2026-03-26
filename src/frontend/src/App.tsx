import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import MainSitePage from "./pages/MainSitePage";

type Page = "landing" | "main";

function getInitialPage(): Page {
  if (typeof window !== "undefined") {
    const hash = window.location.hash;
    if (hash === "#/home" || hash.startsWith("#/home")) return "main";
  }
  return "landing";
}

export default function App() {
  const [page, setPage] = useState<Page>(getInitialPage);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/home" || hash.startsWith("#/home")) {
        setPage("main");
      } else if (hash === "" || hash === "#/") {
        setPage("landing");
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (page === "main") {
    return <MainSitePage />;
  }

  return <LandingPage />;
}
