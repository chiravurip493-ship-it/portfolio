import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";
import { useAuthBilling } from "@/lib/auth-billing";
import { PricingModal } from "./PricingModal";
import { AuthModal } from "./AuthModal";

import projectNike from "@/assets/project-nike.jpg";
import projectPortfolio from "@/assets/project-portfolio.png";
import projectBasicCafe from "@/assets/project-basic-cafe.jpg";
import projectDental from "@/assets/project-dental.png";
import projectTargo from "@/assets/project-targo.png";
import projectGym from "@/assets/project-gym.png";
import projectCoffeeDay from "@/assets/project-coffee-day.png";
import projectHuracan from "@/assets/project-huracan.png";
import projectDrinkNew from "@/assets/project-drink-new.png";
import projectTargoLogistics from "@/assets/project-targo-logistics.png";
import projectWebDevPortfolio from "@/assets/project-webdev-portfolio.png";
import projectDemoFrontendPortfolio from "@/assets/project-demo-frontend-portfolio.png";
import projectGame from "@/assets/game.png";
import projectSrinivasInteriors from "@/assets/project-srinivas-interiors.png";
import projectOrbyte from "@/assets/project-orbyte.png";
import projectRobotExhibition from "@/assets/project-robot-exhibition.png";



interface SubProject {
  name: string;
  image: string;
  link: string;
}

interface Project {
  n: string;
  category: string;
  name: string;
  image: string;
  imageLeftTop?: string;
  imageLeftBottom?: string;
  mainImageClass?: string;
  subProjects: SubProject[];
  isPremium?: boolean;
}

const PROJECTS: Project[] = [
  {
    n: "01",
    category: "Custom Web",
    name: "Business Websites",
    image: projectOrbyte,
    subProjects: [
      {
        name: "BrightSmile Dental Clinic",
        image: projectDental,
        link: "https://dental-hub-craft.vercel.app/",
      },
      {
        name: "Gym website",
        image: projectGym,
        link: "https://v0-premium-gym-website-eight.vercel.app",
      },
    ],
  },
  {
    n: "02",
    category: "Interactive Web",
    name: "3D Animated Websites",
    image: projectRobotExhibition,
    mainImageClass: "object-contain p-4 md:p-6 bg-black",
    isPremium: true,
    subProjects: [
      {
        name: "Lamborghini-Huracan Website",
        image: projectHuracan,
        link: "https://blue-lamborghini-huracan.vercel.app/",
      },
      {
        name: "Flavoured drinks website",
        image: projectDrinkNew,
        link: "https://flavoured-drink.vercel.app",
      },
      {
        name: "Targo logistics website",
        image: projectTargoLogistics,
        link: "https://targo-logistics-neon.vercel.app",
      },
    ],
  },
  {
    n: "03",
    category: "E-Commerce",
    name: "E-Commerce Stores",
    image: projectNike,
    isPremium: true,
    subProjects: [
      {
        name: "Elevate — Game Style",
        image: projectGame,
        link: "https://elevate-game-style.vercel.app/",
      },
      {
        name: "Automobiles Showroom",
        image: projectTargo,
        link: "https://targo-automobiles.vercel.app",
      },
    ],
  },
  {
    n: "04",
    category: "Personal Web",
    name: "Portfolio Websites",
    image: projectPortfolio,
    subProjects: [
      {
        name: "Demo Frontend Portfolio",
        image: projectDemoFrontendPortfolio,
        link: "https://demo-frontend-portfolio.vercel.app",
      },
      {
        name: "WebDev Portfolio",
        image: projectWebDevPortfolio,
        link: "https://web-dev-portfolio-alpha-sooty.vercel.app",
      },
    ],
  },
  {
    n: "05",
    category: "Web Essentials",
    name: "Basic Websites",
    image: projectBasicCafe,
    mainImageClass: "object-contain p-4 md:p-6 bg-[#080504]",
    subProjects: [
      {
        name: "Coffee day website",
        image: projectCoffeeDay,
        link: "https://coffee-day-eta.vercel.app",
      },
      {
        name: "Srinivas Interiors",
        image: projectSrinivasInteriors,
        link: "https://srinivas-interiors-3a2mrdc.gamma.site",
      },
    ],
  },
];

function ProjectCard({
  project,
  index,
  total,
  progress,
  onOpenCollection,
}: {
  project: Project;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onOpenCollection: () => void;
}) {
  const { tier } = useAuthBilling();
  const targetScale = 1 - (total - 1 - index) * 0.03;

  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, targetScale]
  );

  return (
    <div
      className="sticky top-24 md:top-32"
      style={{ top: `${index * 28 + 96}px` }}
    >
      <motion.div
        style={{ scale }}
        className="
          rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
          border border-white/10
          bg-[#0C0C0C]/95
          backdrop-blur-xl
          p-4 sm:p-6 md:p-8
          shadow-[0_0_60px_rgba(255,255,255,0.03)]
          transition-all duration-300
          hover:border-white/20
        "
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 md:mb-8 px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <div
              className="hero-heading font-black text-white/15"
              style={{
                fontSize: "clamp(3rem, 10vw, 140px)",
                lineHeight: 1,
              }}
            >
              {project.n}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-white/50 uppercase tracking-[0.25em] text-xs sm:text-sm">
                  {project.category}
                </span>
                {project.isPremium && (
                  <span className="px-2 py-0.5 rounded-[5px] text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/10">
                    PRO
                  </span>
                )}
              </div>

              <span
                className="text-white font-medium uppercase"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.75rem)",
                }}
              >
                {project.name}
              </span>
            </div>
          </div>

          <LiveProjectButton 
            onClick={onOpenCollection} 
            label={project.isPremium && tier !== "pro" ? "Unlock Pro" : "View Collection"} 
          />
        </div>

        {/* Images Wrapper */}
        <div className="relative">
          {project.isPremium && tier !== "pro" && (
            <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 border border-white/5 rounded-[15px] sm:rounded-[35px] md:rounded-[45px]">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-white/80"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm mb-1">
                PRO Category Gated
              </h4>
              <p className="text-white/50 text-[10px] sm:text-xs max-w-[200px] leading-relaxed mb-4">
                Unlock this collection and download all website templates.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCollection();
                }}
                className="
                  px-5 py-2 rounded-full
                  bg-white text-black text-xs font-bold uppercase tracking-wider
                  hover:bg-[#EAEAEA] active:scale-[0.98] transition-all duration-200
                  cursor-pointer
                "
              >
                Unlock Now
              </button>
            </div>
          )}

          {/* Images */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {/* Left */}
            <div className="col-span-2 flex flex-col gap-2 sm:gap-4">
              <img
                src={project.imageLeftTop || project.image}
                alt={project.name}
                loading="lazy"
                className="
                  w-full object-cover
                  rounded-[12px] sm:rounded-[30px]
                  border border-white/10
                  hover:scale-[1.02]
                  transition-all duration-300
                "
                style={{
                  height: "clamp(60px,18vw,240px)",
                }}
              />

              <img
                src={project.imageLeftBottom || project.image}
                alt={project.name}
                loading="lazy"
                className="
                  w-full object-cover
                  rounded-[12px] sm:rounded-[30px]
                  border border-white/10
                  hover:scale-[1.02]
                  transition-all duration-300
                "
                style={{
                  height: "clamp(80px,24vw,320px)",
                }}
              />
            </div>

            {/* Main Image */}
            <div className="col-span-3 flex items-center justify-center overflow-hidden rounded-[15px] sm:rounded-[35px] md:rounded-[45px] border border-white/10">
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                className={`
                  w-full h-full
                  hover:scale-[1.01]
                  transition-all duration-300
                  ${project.mainImageClass || "object-cover"}
                `}
                style={{
                  minHeight: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Project | null>(null);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { tier } = useAuthBilling();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleOpenCollection = (project: Project) => {
    if (project.isPremium && tier !== "pro") {
      setIsPricingOpen(true);
    } else {
      setActiveCategory(project);
    }
  };

  return (
    <section id="projects"
      ref={containerRef}
      className="
        px-5 sm:px-8 md:px-10
        py-12 sm:py-24 md:py-32
        bg-[#0C0C0C]
      "
    >
      <FadeIn
        y={40}
        className="text-center mb-16 sm:mb-20 md:mb-28"
      >
        <h2
          className="
            hero-heading
            font-black
            uppercase
            leading-none
            tracking-tight
            text-white
          "
          style={{
            fontSize: "clamp(3rem, 12vw, 160px)",
          }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto">
        {PROJECTS.map((project, index) => (
          <div
            key={project.n}
            className="h-[45vh] sm:h-[60vh] md:h-[75vh] lg:h-[85vh]"
          >
            <ProjectCard
              project={project}
              index={index}
              total={PROJECTS.length}
              progress={scrollYProgress}
              onOpenCollection={() => handleOpenCollection(project)}
            />
          </div>
        ))}
      </div>

      {/* Modal Collection */}
      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCategory(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="
                relative z-10
                w-full max-w-5xl max-h-[85vh]
                overflow-y-auto
                rounded-[30px] sm:rounded-[40px]
                border border-white/10
                bg-[#0C0C0C]
                p-6 sm:p-10 md:p-12
                shadow-2xl
              "
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCategory(null)}
                className="
                  absolute top-6 right-6
                  text-white/60 hover:text-white
                  bg-white/5 hover:bg-white/10
                  p-3 rounded-full
                  transition-all duration-300
                  cursor-pointer
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-1 mb-8 sm:mb-10">
                <span className="text-white/50 uppercase tracking-[0.25em] text-xs sm:text-sm">
                  {activeCategory.category}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                  {activeCategory.name}
                </h3>
              </div>

              {/* Sub-projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {activeCategory.subProjects.map((sub, i) => (
                  <motion.div
                    key={sub.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="
                      group
                      flex flex-col
                      rounded-[25px]
                      border border-white/10
                      bg-white/[0.02]
                      p-4 sm:p-5
                      transition-all duration-300
                      hover:bg-white/[0.04]
                      hover:border-white/20
                    "
                  >
                    <div className="overflow-hidden rounded-[18px] border border-white/5 mb-4 relative aspect-[16/10]">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="
                          w-full h-full object-cover
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />
                    </div>

                    <h4 className="text-lg sm:text-xl font-medium text-white mb-4 uppercase tracking-wide">
                      {sub.name}
                    </h4>

                    <div className="mt-auto">
                      <LiveProjectButton href={sub.link} label="Visit Website" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Render paywall modals inline */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onOpenAuth={() => {
          setIsPricingOpen(false);
          setIsAuthOpen(true);
        }}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </section>
  );
}