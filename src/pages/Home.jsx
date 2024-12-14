import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const { contextSafe } = useGSAP();
  const carRef = useRef();
  const h1Ref = useRef();
  const tagLineRef = useRef();
  const btnRef = useRef();
  const h1Text = "Let's Ride"
  const tagLineText = [
    "Revolutionizing", 
    " ", 
    "Mobility", 
    " ", 
    "with", 
    " ", 
    "Seamless", 
    " ", 
    "Rides", 
    ".", 
    " ", 
    "Get", 
    " ", 
    "Ready", 
    " ", 
    "to", 
    " ", 
    "Experience", 
    " ", 
    "the", 
    " ", 
    "Future", 
    " ", 
    "of", 
    " ", 
    "Transportation",
    " ",
    "with",
    " ",
    "UBER", 
    "."
  ]

  useGSAP(() => {

      const tl = gsap.timeline()  

      tl.to(carRef.current, {
        fontSize: "8rem",
        duration: 2,
        ease: "elastic.out(0.7,0.2)",
        delay: 0.3
      })

      tl.from(h1Ref.current.children,{
        x: 100,
        opacity: 0,
        duration: .5,
        stagger: {
          each: 0.02,
          from: "start"
        },
      })

      tl.from(tagLineRef.current.children,{
        y: 100,
        opacity: 0,
        duration: .5,
        stagger: {
          each: 0.01,
          from: "start"
        },
      })

      tl.to(btnRef.current, {
        opacity: 1,
        duration: 0.8,
        paddingLeft: window.innerWidth < 768 ? "5rem" : "7rem",
        paddingRight: window.innerWidth < 768 ? "5rem" : "7rem",
      })

  }, [contextSafe]);

  return (
    <div className="w-full md:w-[60%] lg:w-[40%] xl:w-[30%] h-full min-h-screen flex justify-center items-center flex-col overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-5">
        <i className="ri-roadster-fill drop-shadow-2xl" ref={carRef}></i>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold" ref={h1Ref}>
          {
            h1Text.split("").map((char, id) => {
              return <span key={id} className="inline-block">{char === " " ? <>&nbsp;</> : char}</span>
            })
          }
          </h1>
        <p className="text-[1rem] md:text-lg lg:text-xl text-center font-[500]" ref={tagLineRef}>
          {
            tagLineText.map((arrEle, id) => {
              return <span key={id} className="inline-block">{arrEle === " " ? <>&nbsp;</> : arrEle === "UBER" ? <b className="text-[1rem] md:text-lg lg:text-xl">UBER</b> : arrEle}</span>
            })
          }
        </p>
        <button className="btn btn-neutral rounded-3xl opacity-0 shadow-2xl" ref={btnRef}>
          Get Started
        </button>
      </div>
      <div className="">
      </div>
    </div>
  );
};

export default Home;
