import { Suspense } from "react";
import AnalyzeForm from "./AnalyzeForm";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="page-content">
            <LoadingAnalysis />
          </main>
          <Footer />
        </>
      }
    >
      <AnalyzeForm />
    </Suspense>
  );
}
