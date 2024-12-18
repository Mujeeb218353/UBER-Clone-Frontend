import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import uberLogo from  '../assets/uber-logo.png'; 

const Home = () => {
  const { contextSafe } = useGSAP();
  const imgRef = useRef();
  const carRef = useRef();
  const h1Ref = useRef();
  const h2Ref = useRef();
  const btnRef = useRef();
  const h1Text = "UBER";
  const h2Text = [
    "Getting",
    " ",
    "Started",
    " ",
    "with",
    " ",
    "Uber"
  ]

  useGSAP(() => {

      const tl = gsap.timeline() 

      tl.from(imgRef.current, {
        opacity: 0,
        duration: 2,
        width: "3rem"
      })
      
      tl.from(h1Ref.current.children, {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: "elastic.out(0.7,0.2)",
        stagger: 0.02
      })

      tl.to(carRef.current, {
        onStart: ()=>{
          carRef.current.style.opacity = "1";
        },
        fontSize: "8rem",
        duration: 2,
        ease: "elastic.out(0.7,0.2)",
      })

      tl.from(h2Ref.current.children,{ 
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(0.7,0.2)",
        stagger: {
          each: 0.02,
          from: "start"
        },
      })

      tl.to(btnRef.current, {
        opacity: 1,
        duration: 1,
        paddingLeft: window.innerWidth < 768 ? "5rem" : "7rem",
        paddingRight: window.innerWidth < 768 ? "5rem" : "7rem",
      })

  }, [contextSafe]);

  return (
    <div className="w-full md:w-[60%] lg:w-[40%] xl:w-[30%] h-full min-h-screen flex justify-center items-center flex-col overflow-hidden">
      <div className="w-full flex justify-center items-center flex-col gap-8">
        <img 
          ref={imgRef}
          src={uberLogo}
          className="max-w-60"
          alt="Uber Logo" 
          loading="lazy" 
          />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold" ref={h1Ref}>
            {
              h1Text && h1Text.split("").map((char, id) => {
                return <span key={id} className="inline-block">{char === " " ? <>&nbsp;</> : char}</span>
              })
            }
          </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <i className="ri-roadster-fill drop-shadow-2xl opacity-0" ref={carRef}></i>
        <h2 className="flex flex-wrap justify-center items-center gap-y-4" ref={h2Ref}>
          {
            h2Text && h2Text.map((arrElement, id) => {
              return <span key={id} className="inline-block text-xl md:text-2xl lg:text-3xl font-bold text-center">{arrElement === " " ? <>&nbsp;</> : arrElement}</span>
            })
          }
          </h2>
        <Link to="/login" className="btn btn-neutral rounded-3xl opacity-0 shadow-2xl" ref={btnRef}>
          Continue
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </div>
  );
};

export default Home;
