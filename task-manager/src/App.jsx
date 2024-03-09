import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Details = lazy(() => import("./Details"));
const Error404 = lazy(() => import("./Error404"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id/:type" element={<Details />} />
          <Route path="/notFound" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
