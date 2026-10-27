import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Shell } from "./components/Shell";
import { Projects } from "./pages/Projects";
import { Build } from "./pages/Build";
import { Review } from "./pages/Review";
import { Preview } from "./pages/Preview";
import { Queue } from "./pages/Queue";
import { Package, ProductionView } from "./pages/Package";
import { Library } from "./pages/Library";
import { Settings } from "./pages/Settings";
import "./index.css";

const qc = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: true, retry: 1 } } });
const ToBuild = () => <Navigate to={`/p/${useParams().slug}/build`} replace />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/p/:slug" element={<ToBuild />} />
            <Route path="/p/:slug/build" element={<Build />} />
            <Route path="/p/:slug/review" element={<Review />} />
            <Route path="/p/:slug/preview" element={<Preview />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/packages/:id" element={<Package />} />
            <Route path="/productions/:folder" element={<ProductionView />} />
            <Route path="/library" element={<Library />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
