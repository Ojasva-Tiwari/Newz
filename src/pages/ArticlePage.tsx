import { Navigate, useParams } from "react-router-dom";
import { findArticle } from "../services/mockService";
import { useBookmarks } from "../hooks/useBookmarks";
import { ArticleView } from "../components/article/ArticleView";

export function ArticlePage() {
  const { id } = useParams();
  const article = findArticle(id || "");
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!article) return <Navigate to="/" replace />;

  return (
    <ArticleView
      article={article}
      bookmarked={isBookmarked(article.id)}
      onBookmark={() => toggleBookmark(article.id)}
    />
  );
}
