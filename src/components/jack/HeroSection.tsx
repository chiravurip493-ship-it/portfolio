import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { ContactButton } from "./ContactButton";
import { NavbarActions } from "./NavbarActions";
import aminePortrait from "@/assets/tp-tech.png";

const NAV_LINKS = [
  "About",
  "Skills",
  "Services",
  "Projects",
  "Contact",
];

export function HeroSection() {
  return (
    <section
      className="h-[75vh] sm:h-screen flex flex-col relative"
      style={{ overflowX: "clip" }}
    >
      {/* Navbar */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 relative z-20 w-full"
      >
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="
                text-[#D7E2EA]
                font-medium
                uppercase
                tracking-wider
                text-xs
                sm:text-sm
                md:text-base
                lg:text-lg
                hover:opacity-70
                transition-opacity duration-200
              "
            >
              {link}
            </a>
          ))}
        </div>
        <NavbarActions />
      </FadeIn>

      {/* Title */}
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 px-6">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="
              hero-heading
              font-black
              uppercase
              tracking-tight
              leading-none
              whitespace-nowrap
              w-full
              text-[12.5vw]
              sm:text-[13vw]
              md:text-[13.5vw]
              lg:text-[14.2vw]
            "
          >
            HI, I'M PAVAN
          </h1>
        </FadeIn>
      </div>

      {/* Description + Button */}
      <div
        className="
          mt-auto
          flex
          justify-between
          items-end
          pb-[15vh]
          sm:pb-8
          md:pb-10
          px-6
          md:px-10
          relative
          z-20
        "
      >
        <FadeIn delay={0.35} y={20}>
          <p
            className="
              text-[#D7E2EA]
              font-light
              uppercase
              tracking-wide
              leading-snug
              max-w-[120px]
              min-[375px]:max-w-[160px]
              sm:max-w-[220px]
              md:max-w-[260px]
            "
            style={{
              fontSize: "clamp(0.6rem, 1.4vw, 1.5rem)",
            }}
          >
            computer science student & software developer
            building practical, modern applications
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait */}
      <FadeIn
        delay={0.6}
        y={30}
        className="
          absolute
          left-1/2
          -translate-x-1/2
          z-10
          top-[39%]
          -translate-y-1/2
          sm:top-auto
          sm:translate-y-0
          sm:bottom-0
          w-[170px]
          min-[375px]:w-[220px]
          min-[410px]:w-[260px]
          sm:w-[360px]
          md:w-[440px]
          lg:w-[520px]
        "
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={aminePortrait}
            alt="Pranav portrait"
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
            fetchPriority="high"
          />
        </Magnet>
      </FadeIn>
    </section>
  );
}