import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "../../../components/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-gradient-to-bl from-slate-900 via-black to-slate-900 overflow-x-hidden"
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="text-sm uppercase text-white md:text-[10px]">
          About RIPLYX
        </p>

        <AnimatedTitle
          title="Built for Many. <br /> Survived by Few."
          containerClass="mt-5 text-white text-center"
        />

        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-50">
            RIPLYX weaves every player into one living network
            Experience beyond worlds.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
