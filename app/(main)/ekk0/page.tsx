import type { Metadata } from "next";
import Ekk0Game from "./Ekk0Game";

export const metadata: Metadata = {
  title: "ekk0 — Memory Tamagotchi | ekkOS Labs",
  description:
    "Meet ekk0: an AI companion powered by ekkOS memory. Watch real-time pattern learning, episodic memory capture, and the forgetting curve in action.",
  openGraph: {
    title: "ekk0 — Memory Tamagotchi",
    description: "The first creature powered by persistent AI memory",
  },
};

export default function Ekk0Page() {
  return <Ekk0Game />;
}
