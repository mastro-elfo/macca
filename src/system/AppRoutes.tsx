import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FallbackLayout from "../layouts/FallbackLayout/FallbackLayout";

const MapPage = lazy(() => import("../features/map/MapPage/MapPage"));
const ArtworkListPage = lazy(
  () => import("../features/artwork/ArtworkListPage/ArtworkListPage")
);
const ArtworkDetailPage = lazy(
  () => import("../features/artwork/ArtworkDetailPage/ArtworkDetailPage")
);
const AuthorListPage = lazy(
  () => import("../features/author/AuthorListPage/AuthorListPage")
);
const AuthorDetailPage = lazy(
  () => import("../features/author/AuthorDetailPage/AuthorDetailPage")
);
const WhatIsMaccaPage = lazy(
  () => import("../pages/WhatIsMaccaPage/WhatIsMaccaPage")
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/map" />} />
      <Route path="map">
        <Route
          path=""
          element={
            <Navigate to="/map/43.54773160834968/10.720531940460207/16" />
          }
        />
        <Route
          path=":lat/:lng"
          element={<Navigate to="18" relative="path" />}
        />
        <Route path=":lat/:lng/:zoom" element={<MapPage />} />
        <Route path=":lat/:lng/:zoom/:id" element={<MapPage />} />
      </Route>
      <Route path="artworks">
        <Route path="" element={<ArtworkListPage />} />
        <Route path=":id" element={<ArtworkDetailPage />} />
      </Route>
      <Route path="authors">
        <Route path="" element={<AuthorListPage />} />
        <Route path=":id" element={<AuthorDetailPage />} />
      </Route>
      <Route path="what-is-macca" element={<WhatIsMaccaPage />} />
      <Route path="fallback" element={<FallbackLayout />} />
    </Routes>
  );
}
