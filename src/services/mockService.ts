import {
  AIAnalysis,
  Article,
  CoverageItem,
  Source,
  TimelineEvent,
  TrendingTopic,
} from "../types";
import {
  analysis,
  articles,
  coverage,
  sources,
  timeline,
  trendingTopics,
} from "../data/mockData";

const wait = <T,>(value: T, delay = 80): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay));

export const getArticles = async (): Promise<Article[]> => wait(articles);
export const getArticle = async (id: string): Promise<Article | undefined> =>
  wait(articles.find((article) => article.id === id));
export const getSources = async (): Promise<Source[]> => wait(sources);
export const getSource = async (id: string): Promise<Source | undefined> =>
  wait(sources.find((source) => source.id === id));
export const getTrendingTopics = async (): Promise<TrendingTopic[]> =>
  wait(trendingTopics);
export const getAIAnalysis = async (): Promise<AIAnalysis> => wait(analysis);
export const getCoverage = async (): Promise<CoverageItem[]> => wait(coverage);
export const getTimeline = async (): Promise<TimelineEvent[]> => wait(timeline);

export const findSource = (id: string) => sources.find((source) => source.id === id);
export const findArticle = (id: string) => articles.find((article) => article.id === id);
