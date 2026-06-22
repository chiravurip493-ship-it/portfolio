import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";

import projectBusiness from "@/assets/project-business.jpg";
import projectLambo from "@/assets/project-lambo.png";
import projectDrink from "@/assets/project-drink.png";
import projectNike from "@/assets/project-nike.jpg";
import projectPortfolio from "@/assets/project-portfolio.png";
import projectBasic from "@/assets/project-basic.png";
import projectBasicCafe from "@/assets/project-basic-cafe.jpg";
import projectPortfolioLeftTop from "@/assets/cp.png";
import projectPortfolioLeftBottom from "@/assets/prot.png";
import projectCreativeMarketing from "@/assets/project-creative-marketing.png";
import projectDental from "@/assets/project-dental.png";
import projectTargo from "@/assets/project-targo.png";
import projectGym from "@/assets/project-gym.png";
import projectCoffeeDay from "@/assets/project-coffee-day.png";
import projectHuracan from "@/assets/project-huracan.png";
import projectDrinkNew from "@/assets/project-drink-new.png";
import projectTargoLogistics from "@/assets/project-targo-logistics.png";
import projectArdenPortfolio from "@/assets/project-arden-portfolio.jpg";
import projectDemoFrontendPortfolio from "@/assets/project-demo-frontend-portfolio.png";
import projectGame from "@/assets/game.png";
import projectSrinivasInteriors from "@/assets/project-srinivas-interiors.png";



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
}

const PROJECTS: Project[] = [
  {
    n: "01",
    category: "Custom Web",
    name: "Business Websites",
    image: projectDental,
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
      {
        name: "PeachWeb Creative Marketing",
        image: projectCreativeMarketing,
        link: "https://creative-marketing-peach.vercel.app",
      },
    ],
  },
  {
    n: "02",
    category: "Interactive Web",
    name: "3D Animated Websites",
    image: projectLambo,
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
    subProjects: [
      {
        name: "Elevate — Game Style",
        image: projectGame,
        link: "https://elevate-game-style.vercel.app/",
      },
      {
        name: "Targo — Luxury Car Dealership",
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
        name: "Arden Vale Portfolio",
        image: projectArdenPortfolio,
        link: "https://github.com/pranav-3010",
      },
      {
        name: "Minimalist Designer Showcase",
        image: projectPortfolio,
        link: "https://github.com/balapranav3010",
      },
    ],
  },
  {
    n: "05",
    category: "Web Essentials",
    name: "Basic Websites",
    image: projectBasicCafe,
    mainImageClass: "object-contain p-8 md:p-12 bg-neutral-900/30",
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
      {
        name: "Aurora Brew (Cafe Website)",
        image: projectBasicCafe,
        link: "https://github.com/balapranav3010",
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
              <span className="text-white/50 uppercase tracking-[0.25em] text-xs sm:text-sm">
                {project.category}
              </span>

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

          <LiveProjectButton onClick={onOpenCollection} label="View Collection" />
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Left */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <img
              src={project.imageLeftTop || project.image}
              alt={project.name}
              loading="lazy"
              className="
                w-full object-cover
                rounded-[30px]
                border border-white/10
                hover:scale-[1.02]
                transition-all duration-300
              "
              style={{
                height: "clamp(140px,18vw,240px)",
              }}
            />

            <img
              src={project.imageLeftBottom || project.image}
              alt={project.name}
              loading="lazy"
              className="
                w-full object-cover
                rounded-[30px]
                border border-white/10
                hover:scale-[1.02]
                transition-all duration-300
              "
              style={{
                height: "clamp(180px,24vw,320px)",
              }}
            />
          </div>

          {/* Main Image */}
          <div className="md:col-span-3 flex items-center justify-center overflow-hidden rounded-[35px] md:rounded-[45px] border border-white/10">
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
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects"
      ref={containerRef}
      className="
        px-5 sm:px-8 md:px-10
        py-20 sm:py-24 md:py-32
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
            className="h-[85vh]"
          >
            <ProjectCard
              project={project}
              index={index}
              total={PROJECTS.length}
              progress={scrollYProgress}
              onOpenCollection={() => setActiveCategory(project)}
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
    </section>
  );
}