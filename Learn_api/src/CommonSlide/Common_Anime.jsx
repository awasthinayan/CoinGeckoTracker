import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

const Common = ({ children }) => {
  const containerRef = useRef(null);       // whole wrapper for gsap.context selection
  const stairParentRef = useRef(null);    // overlay ref
  const pageRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    // safety
    if (!containerRef.current) return;

    // function to wait two paints so layout (and images/fonts) have applied
    const waitForPaint = () =>
      new Promise((res) =>
        requestAnimationFrame(() => requestAnimationFrame(res))
      );

    let ctx;
    let tl;

    (async () => {
      // wait for a couple of paints to avoid zero-size measurements on first load
      await waitForPaint();

      // Create a GSAP context scoped to containerRef so selectors hit only inside it
      ctx = gsap.context(() => {
        // Ensure initial CSS states so animations are deterministic
        gsap.set(stairParentRef.current, {
          display: "block",
          pointerEvents: "auto",
          zIndex: 9999,
        });

        gsap.set(".stairs", {
          height: "100%",
          y: "0%",
          overflow: "hidden",
        });

        // timeline
        tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 0.6 },
        });

        // reveal the bars from height 0 -> full
        tl.from(".stairs", {
          height: 0,
          stagger: { amount: -0.2 },
        });

        // slide bars down (cover)
        tl.to(
          ".stairs",
          {
            y: "100%",
            stagger: { amount: -0.2 },
          },
          "+=0.05"
        );

        // hide overlay after they moved
        tl.set(stairParentRef.current, { display: "none", pointerEvents: "none" });

        // animate page content in (make sure pageRef exists)
        tl.from(
          pageRef.current,
          {
            opacity: 0,
            scale: 1.12,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }, containerRef);

      // If you want to debug timeline: window.__lastTL = tl
    })();

    return () => {
      // cleanup: revert context + kill timeline if exists
      if (ctx) ctx.revert();
      if (tl) tl.kill();
    };
    // re-run on pathname changes (page transitions)
  }, [location.pathname]);

  return (
    <div ref={containerRef}>
      {/* Transition Overlay */}
      <div
        ref={stairParentRef}
        className="h-screen w-full fixed top-0 left-0"
        style={{ display: "none", pointerEvents: "none" }} // default hidden
      >
        <div className="h-full w-full flex">
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
        </div>
      </div>

      {/* Page Content */}
      <div ref={pageRef}>
        {children}
      </div>
    </div>
  );
};

export default Common;