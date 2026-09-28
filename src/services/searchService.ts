import { articles, sources } from "../data/mockData";
import {
  aiLaunches,
  aiResearchPapers,
  latestAINewsArticles,
  openSourceAIProjects,
} from "../data/aiInsightsData";
import { cityDataMap } from "../data/locationData";
import {
  AILaunch,
  AIProject,
  AIResearch,
  Article,
  LocalEvent,
  LocalNews,
  Source,
} from "../types";

export interface UnifiedSearchResults {
  articles: Article[];
  aiLaunches: AILaunch[];
  aiResearch: AIResearch[];
  aiProjects: AIProject[];
  localNews: LocalNews[];
  localEvents: LocalEvent[];
  sources: Source[];
  totalCount: number;
}

const allArticles: Article[] = [
  ...articles,
  ...latestAINewsArticles.filter(
    (item) => !articles.some((a) => a.id === item.id)
  ),
];

const allLocalNews: LocalNews[] = Object.values(cityDataMap).flatMap(
  (bundle) => bundle.news
);

const allLocalEvents: LocalEvent[] = Object.values(cityDataMap).flatMap(
  (bundle) => bundle.events
);

/**
 * Unified Search Service
 * Ready to be connected to FastAPI search endpoints: GET /api/v1/search?q=...
 */
export const searchEverything = async (
  query: string,
  category = "All",
  sourceId = "All"
): Promise<UnifiedSearchResults> => {
  const q = query.toLowerCase().trim();

  // Search articles
  const matchedArticles = allArticles.filter((article) => {
    const matchesQuery =
      !q ||
      [
        article.title,
        article.summary,
        article.category,
        article.tags.join(" "),
        article.sourceId,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);

    const matchesCategory =
      category === "All" || article.category === category;
    const matchesSource =
      sourceId === "All" || article.sourceId === sourceId;

    return matchesQuery && matchesCategory && matchesSource;
  });

  // Search AI Launches
  const matchedLaunches = !q
    ? []
    : aiLaunches.filter((launch) =>
        [launch.name, launch.organization, launch.shortDescription, launch.type]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

  // Search AI Research
  const matchedResearch = !q
    ? []
    : aiResearchPapers.filter((paper) =>
        [
          paper.title,
          paper.organization,
          paper.researchTopic,
          paper.shortSummary,
          paper.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

  // Search AI Open Source Projects
  const matchedProjects = !q
    ? []
    : openSourceAIProjects.filter((proj) =>
        [proj.project, proj.organization, proj.description, proj.license]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

  // Search Local News
  const matchedLocalNews = !q
    ? []
    : allLocalNews.filter((ln) =>
        [ln.headline, ln.summary, ln.locationRelevance, ln.category]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

  // Search Local Events
  const matchedLocalEvents = !q
    ? []
    : allLocalEvents.filter((ev) =>
        [ev.name, ev.approximateArea, ev.category, ev.shortDescription]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

  // Search Sources
  const matchedSources = !q
    ? []
    : sources.filter((src) =>
        [src.name, src.shortName, src.description, src.location]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );

  const totalCount =
    matchedArticles.length +
    matchedLaunches.length +
    matchedResearch.length +
    matchedProjects.length +
    matchedLocalNews.length +
    matchedLocalEvents.length +
    matchedSources.length;

  return {
    articles: matchedArticles,
    aiLaunches: matchedLaunches,
    aiResearch: matchedResearch,
    aiProjects: matchedProjects,
    localNews: matchedLocalNews,
    localEvents: matchedLocalEvents,
    sources: matchedSources,
    totalCount,
  };
};
