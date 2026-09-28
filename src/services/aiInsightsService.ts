import {
  AICompanyDevelopment,
  AIInsight,
  AILaunch,
  AIProject,
  AIRanking,
  AIRankingCategory,
  AIResearch,
  AITimelineItem,
  Article,
} from "../types";
import {
  aiCompanyDevelopments,
  aiLaunches,
  aiRankings,
  aiResearchPapers,
  aiTimeline,
  featuredAIDevelopment,
  latestAINewsArticles,
  openSourceAIProjects,
} from "../data/aiInsightsData";

const delay = <T,>(value: T, ms = 70): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

/**
 * AI Insights Service Layer
 * Designed to cleanly swap between MockService and future FastAPI ApiService endpoints.
 */
export const getAIInsights = async (): Promise<AIInsight> => {
  return delay(featuredAIDevelopment);
};

export const getLatestAINews = async (): Promise<Article[]> => {
  return delay(latestAINewsArticles);
};

export const getAILaunches = async (): Promise<AILaunch[]> => {
  return delay(aiLaunches);
};

export const getAIRankings = async (
  category?: AIRankingCategory
): Promise<AIRanking[]> => {
  if (!category) return delay(aiRankings);
  return delay(aiRankings.filter((item) => item.category === category));
};

export const getAIResearch = async (): Promise<AIResearch[]> => {
  return delay(aiResearchPapers);
};

export const getOpenSourceAI = async (): Promise<AIProject[]> => {
  return delay(openSourceAIProjects);
};

export const getAICompanyDevelopments = async (): Promise<
  AICompanyDevelopment[]
> => {
  return delay(aiCompanyDevelopments);
};

export const getAITimeline = async (): Promise<AITimelineItem[]> => {
  return delay(aiTimeline);
};
