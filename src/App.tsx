import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { TrendingPage } from "./pages/TrendingPage";
import { CategoryPage } from "./pages/CategoryPage";
import { ArticlePage } from "./pages/ArticlePage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { SourcePage } from "./pages/SourcePage";
import { IntelligencePage } from "./pages/IntelligencePage";
import { AIInsightsPage } from "./pages/AIInsightsPage";
import { NearbyPage } from "./pages/NearbyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/nearby" element={<NearbyPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/source/:id" element={<SourcePage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/intelligence/:topic" element={<IntelligencePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
