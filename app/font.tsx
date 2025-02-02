import { Doto } from "next/font/google";
// Will break at build. Waiting for https://github.com/shadcn-ui/ui/issues/2377

export const doto = Doto({ subsets: ["latin"], display: "swap" });
