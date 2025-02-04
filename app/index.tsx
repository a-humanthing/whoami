import dynamic from "next/dynamic";

export const Character = dynamic(() => import("./Character"), { ssr: false });
