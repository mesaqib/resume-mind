import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export const meta: MetaFunction = () => [
  // General SEO
  { charset: "utf-8" },
  { title: "Free ATS Resume Checker | Optimize Your Resume with AI" },
  {
    name: "description",
    content: "Instantly check your resume's ATS score with our AI-powered resume analyzer. Improve your chances of getting hired by optimizing your resume for applicant tracking systems.",
  },
  { name: "keywords", content: "ATS resume checker, resume scanner, resume score, AI resume analyzer, resume optimization" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "robots", content: "index, follow" },
  { name: "author", content: "saqibcodes" },

  // Open Graph (Facebook, LinkedIn)
  { property: "og:type", content: "website" },
  { property: "og:title", content: "Free ATS Resume Checker | Optimize Your Resume with AI" },
  { property: "og:description", content: "Analyze your resume and optimize it for ATS systems. Fast, accurate, and completely free." },
  { property: "og:url", content: "https://yourdomain.com" },
  { property: "og:image", content: "https://yourdomain.com/images/og-image.jpg" }, // Add a real image
  { property: "og:site_name", content: "ATS Resume Checker" },

  // Twitter Cards
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Free ATS Resume Checker | Optimize Your Resume with AI" },
  { name: "twitter:description", content: "Instant resume scanning and optimization using AI." },
  { name: "twitter:image", content: "https://yourdomain.com/images/twitter-image.jpg" },
  { name: "twitter:site", content: "@yourhandle" },

  // Theme
  { name: "theme-color", content: "#4f46e5" }, // Match your brand color
];


export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return <main className="bg-cover bg-black">
    <Navbar />

    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ): (
          <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>
}
