import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Resume-info | Get Your ATS Resume Score Instantly" },
    {
      name: "description",
      content:
        "Check your resume’s ATS compatibility. Improve your job chances with instant resume analysis and optimization tips.",
    },
    { name: "keywords", content: "ATS resume checker, resume score, job resume, resume optimization" },
    { name: "author", content: "Resume-info Team" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#ffffff" },
    { property: "og:title", content: "Resume-info | Free ATS Resume Checker" },
    {
      property: "og:description",
      content: "Scan your resume for ATS optimization. Make your resume job-ready!",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://resumind.xyz" }, // Replace with your domain
    { property: "og:image", content: "https://resumind.xyz/og-image.png" }, // Replace with real image URL
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Resume-info | ATS Resume Checker" },
    {
      name: "twitter:description",
      content: "Optimize your resume and improve your job search success!",
    },
    { name: "twitter:image", content: "https://resumind.xyz/twitter-image.png" }, // Replace with real image
  ];
};


const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-black min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome to 100% Free Resume Checker</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button w-full" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button auth-button1" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth
