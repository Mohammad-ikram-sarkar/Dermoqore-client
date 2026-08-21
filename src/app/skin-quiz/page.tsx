import type { Metadata } from "next";
import SkinQuiz from "@/components/skin-quiz/SkinQuiz";

export const metadata: Metadata = {
  title: "Skin Quiz — Find Your Serum | Dermoqore",
  description:
    "Take the Dermoqore skin quiz to get a science-backed, personalized skincare routine tailored for Bangladeshi skin in under 60 seconds.",
};

export default function SkinQuizPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ── Page header ── */}
      <section className="border-b border-border bg-background px-6 py-14 text-center md:px-10 md:py-20">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          Personalized Regimen
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-[0.06em] text-foreground uppercase md:text-4xl">
          Skin Quiz
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-muted-foreground">
          Answer a few questions and we&apos;ll match you with the right serums and routine for your
          skin.
        </p>
      </section>

      {/* ── Quiz ── */}
      <section className="mx-auto w-full max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
        <SkinQuiz />
      </section>
    </main>
  );
}
