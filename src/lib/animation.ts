import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);
gsap.ticker.lagSmoothing(0);

export { gsap, useGSAP, ScrollTrigger, Flip };
