export type Category =
  | "World"
  | "India"
  | "Technology"
  | "Business"
  | "Science"
  | "Sports"
  | "Entertainment";

export type Perspective = "Neutral" | "Market lens" | "Policy lens" | "Human impact";

export interface Source {
  id: string;
  name: string;
  shortName: string;
  description: string;
  location: string;
  accent: string;
  founded: string;
}

export interface Author {
  name: string;
  role: string;
  initials: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  body: string[];
  category: Category;
  sourceId: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  image: string;
  tags: string[];
  featured?: boolean;
  developing?: boolean;
  relatedIds: string[];
}

export interface TrendingTopic {
  id: string;
  title: string;
  category: Category;
  articleCount: number;
  sourceCount: number;
  momentum: number;
  status?: "Developing" | "Active" | "Monitoring";
  description: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  type: "report" | "official" | "analysis" | "update";
}

export interface CoverageItem {
  sourceId: string;
  headline: string;
  timestamp: string;
  summary: string;
  perspective: Perspective;
}

export interface AIAnalysis {
  tldr: string;
  whyItMatters: string;
  developments: string[];
  entities: string[];
  topics: string[];
  watch: string[];
}

// ==========================================
// AI Insights Types
// ==========================================

export type AILaunchType =
  | "Model"
  | "Product"
  | "Developer Tool"
  | "API"
  | "Hardware"
  | "Open Source";

export type AILaunchStatus =
  | "Available"
  | "Preview"
  | "Rolling out"
  | "Open Weights"
  | "Announced";

export type AIRankingCategory =
  | "Reasoning"
  | "Coding"
  | "Multimodal"
  | "General capability"
  | "Open-source models"
  | "AI tools";

export type AICompanyDevType =
  | "product launch"
  | "partnership"
  | "funding"
  | "research"
  | "acquisition"
  | "infrastructure"
  | "hiring/expansion";

export interface AIInsight {
  id: string;
  category: string;
  headline: string;
  summary: string;
  sourceId: string;
  sourceName: string;
  sourceCount: number;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  articleId?: string;
  tags: string[];
  keyTakeaways?: string[];
}

export interface AILaunch {
  id: string;
  name: string;
  organization: string;
  launchDate: string;
  type: AILaunchType;
  shortDescription: string;
  source: string;
  status: AILaunchStatus;
  badge?: string;
}

export interface AIRanking {
  id: string;
  rank: number;
  model: string;
  organization: string;
  benchmark: string;
  category: AIRankingCategory;
  score: number | string;
  previousRank: number;
  change: number | "=" | "NEW";
  lastUpdated: string;
  demoNotice?: string;
}

export interface AIResearch {
  id: string;
  title: string;
  organization: string;
  researchers?: string;
  researchTopic: string;
  date: string;
  shortSummary: string;
  source: string;
  tags: string[];
  articleId?: string;
}

export interface AIProject {
  id: string;
  project: string;
  organization: string;
  license: string;
  description: string;
  popularityMetric: string;
  source: string;
  releaseDate: string;
  repoUrl?: string;
}

export interface AICompanyDevelopment {
  id: string;
  company: string;
  type: AICompanyDevType;
  title: string;
  description: string;
  date: string;
  source: string;
  badge?: string;
}

export interface AITimelineItem {
  id: string;
  time: string;
  relativePeriod: string;
  title: string;
  description: string;
  category: string;
  source: string;
}

// ==========================================
// In Your Area (Local Coverage) Types
// ==========================================

export interface LocationContext {
  latitude?: number;
  longitude?: number;
  city: string;
  area: string;
  region: string;
  country: string;
  isDemo?: boolean;
}

export interface LocalNews {
  id: string;
  headline: string;
  summary: string;
  sourceId: string;
  sourceName: string;
  timestamp: string;
  image: string;
  category: Category;
  locationRelevance: string;
  articleId?: string;
  eventCount?: number;
  sourceCount?: number;
}

export type LocalEventCategory =
  | "Technology"
  | "Sports"
  | "Cultural"
  | "Public"
  | "Community";

export interface LocalEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  approximateArea: string;
  category: LocalEventCategory;
  shortDescription: string;
  source: string;
  venue?: string;
}

export type LocalAlertType =
  | "civic"
  | "transport"
  | "weather"
  | "emergency"
  | "public notice";

export type AlertSeverity = "info" | "advisory" | "warning" | "urgent";

export interface LocalAlert {
  id: string;
  title: string;
  type: LocalAlertType;
  severity: AlertSeverity;
  message: string;
  issuedAt: string;
  validUntil?: string;
  isDemo: boolean;
}

export type NearbyPlaceCategory =
  | "Hospitals"
  | "Universities"
  | "Libraries"
  | "Restaurants"
  | "Public services"
  | "Sports facilities";

export interface NearbyPlace {
  id: string;
  name: string;
  category: NearbyPlaceCategory;
  address: string;
  distance: string;
  highlight: string;
}

export interface LocalTrendingTopic {
  id: string;
  topic: string;
  category: string;
  articleCount: number;
  sourceCount: number;
  momentum: number;
  shortDescription: string;
}

export interface LocalTransportUpdate {
  id: string;
  roadOrArea: string;
  status: "Normal flow" | "Moderate congestion" | "Heavy traffic" | "Maintenance work" | "Transit advisory";
  description: string;
  lastUpdated: string;
  isDemo: boolean;
}

export interface LocalWeather {
  location: string;
  temperature: string;
  condition: string;
  highLow: string;
  humidity: string;
  wind: string;
  updatedTime: string;
  isDemo: boolean;
}

