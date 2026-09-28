import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Boxes,
  Building2,
  Calendar,
  Clock,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  AICompanyDevelopment,
  AIInsight,
  AILaunch,
  AIProject,
  AIRanking,
  AIResearch,
  AITimelineItem,
  Article,
} from "../types";
import {
  getAICompanyDevelopments,
  getAIInsights,
  getAILaunches,
  getAIRankings,
  getAIResearch,
  getAITimeline,
  getLatestAINews,
  getOpenSourceAI,
} from "../services/aiInsightsService";
import { useBookmarks } from "../hooks/useBookmarks";
import { ArticleCard } from "../components/news/NewsCards";
import { LoadingState, SectionHeading } from "../components/ui/Shared";
import { FeaturedAISection } from "../components/ai/FeaturedAISection";
import { AILaunchesSection } from "../components/ai/AILaunchesSection";
import { AIRankingsSection } from "../components/ai/AIRankingsSection";
import { AIResearchSection } from "../components/ai/AIResearchSection";
import { OpenSourceAISection } from "../components/ai/OpenSourceAISection";
import { AICompaniesSection } from "../components/ai/AICompaniesSection";
import { AITimelineSection } from "../components/ai/AITimelineSection";

export function AIInsightsPage() {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [loading, setLoading] = useState(true);

  const [featured, setFeatured] = useState<AIInsight | null>(null);
  const [news, setNews] = useState<Article[]>([]);
  const [launches, setLaunches] = useState<AILaunch[]>([]);
  const [rankings, setRankings] = useState<AIRanking[]>([]);
  const [research, setResearch] = useState<AIResearch[]>([]);
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [developments, setDevelopments] = useState<AICompanyDevelopment[]>([]);
  const [timeline, setTimeline] = useState<AITimelineItem[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadData() {
      try {
        setLoading(true);
        const [
          featData,
          newsData,
          launchData,
          rankData,
          researchData,
          projData,
          devData,
          timeData,
        ] = await Promise.all([
          getAIInsights(),
          getLatestAINews(),
          getAILaunches(),
          getAIRankings(),
          getAIResearch(),
          getOpenSourceAI(),
          getAICompanyDevelopments(),
          getAITimeline(),
        ]);

        setFeatured(featData);
        setNews(newsData);
        setLaunches(launchData);
        setRankings(rankData);
        setResearch(researchData);
        setProjects(projData);
        setDevelopments(devData);
        setTimeline(timeData);
      } catch (err) {
        console.error("Failed to load AI Insights", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading || !featured) {
    return (
      <main className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
        <LoadingState />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 sm:px-8 lg:px-10 lg:pt-12">
      {/* Header section */}
      <header className="mb-10 sm:mb-14">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-signal">
          <Sparkles size={15} />
          AI Insights
        </div>
        <h1 className="max-w-3xl font-serif text-5xl leading-[.92] tracking-tight sm:text-7xl">
          What's happening in AI
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted dark:text-slate-400 sm:text-lg">
          A structured view of major developments across models, products, research,
          companies and the wider AI ecosystem.
        </p>
      </header>

      {/* Featured AI Development */}
      <section className="mb-16 sm:mb-20">
        <FeaturedAISection insight={featured} />
      </section>

      {/* Latest AI News */}
      <section id="latest-ai-news" className="mb-16 sm:mb-20">
        <SectionHeading
          eyebrow="Coverage"
          title="Latest AI news"
          description="In-depth reporting on foundational breakthroughs, systems engineering, and societal impact."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              bookmarked={isBookmarked(article.id)}
              onBookmark={() => toggleBookmark(article.id)}
            />
          ))}
        </div>
      </section>

      {/* Model & Product Launches */}
      <section className="mb-16 sm:mb-20">
        <SectionHeading
          eyebrow="Releases"
          title="AI model & product launches"
          description="Recent releases across frontier foundation weights, developer infrastructure, and end-user products."
        />
        <AILaunchesSection launches={launches} />
      </section>

      {/* AI Rankings & Benchmarks */}
      <section className="mb-16 sm:mb-20">
        <SectionHeading
          eyebrow="Evaluation"
          title="AI rankings & benchmarks"
          description="Comparative performance metrics across standard evaluation suites and human preference arenas."
        />
        <AIRankingsSection rankings={rankings} />
      </section>

      {/* Two Column Layout: Research & Open Source */}
      <div className="mb-16 grid gap-14 lg:grid-cols-1 sm:mb-20">
        {/* Research */}
        <section>
          <SectionHeading
            eyebrow="Frontier Science"
            title="AI research & academic papers"
            description="Theoretical advances, algorithmic optimizations, and mechanistic interpretability discoveries."
          />
          <AIResearchSection research={research} />
        </section>

        {/* Open Source AI */}
        <section>
          <SectionHeading
            eyebrow="Ecosystem"
            title="Open-source AI projects"
            description="Permissively licensed runtimes, synthetic data tools, and evaluation frameworks shaping collaborative progress."
          />
          <OpenSourceAISection projects={projects} />
        </section>
      </div>

      {/* Two Column Layout: Companies & Chronological Timeline */}
      <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
        {/* AI Companies */}
        <section>
          <SectionHeading
            eyebrow="Industry Movement"
            title="AI company developments"
            description="Key strategic shifts, capital rounds, strategic alliances, and computing infrastructure."
          />
          <AICompaniesSection developments={developments} />
        </section>

        {/* AI Timeline */}
        <section>
          <SectionHeading
            eyebrow="Chronology"
            title="AI ecosystem timeline"
            description="A chronological record of significant milestones and releases."
          />
          <AITimelineSection timeline={timeline} />
        </section>
      </div>
    </main>
  );
}
