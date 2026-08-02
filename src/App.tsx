import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
import { LoadingProvider } from "./context/LoadingProvider";
import { logVisitor } from "./utils/visitorTracker";
import { useEffect } from "react";

import { ContentProvider } from "./context/ContentProvider";

const App = () => {
  useEffect(() => {
    logVisitor();
  }, []);

  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoadingProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <MainContainer>
                    <Suspense fallback={null}>
                      <CharacterModel />
                    </Suspense>
                  </MainContainer>
                </Suspense>
              </LoadingProvider>
            }
          />
          <Route
            path="/myworks"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyWorks />
              </Suspense>
            }
          />
          <Route
            path="/play"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Play />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminDashboard />
              </Suspense>
            }
          />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </ContentProvider>
  );
};

export default App;
