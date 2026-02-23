import { Button } from "./ui/button";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
}

interface AboutUsPageProps {
    onNavigate: (page: string) => void;
    onSelectMember: (memberId: string) => void;
    isLoggedIn: boolean;
    userEmail?: string;
    onLogout: () => void;
    searchQuery: string;
    selectedSubject: string;
    subjects: string[];
    onSearchQueryChange: (query: string) => void;
    onSubjectChange: (subject: string) => void;
}

export function AboutUsPage({
    onNavigate,
    onSelectMember,
    isLoggedIn,
    userEmail,
    onLogout,
    searchQuery,
    selectedSubject,
    subjects,
    onSearchQueryChange,
    onSubjectChange
}: AboutUsPageProps) {
    const team: TeamMember[] = [
        { id: "tony", name: "Tony Huang", role: "BACKEND LEAD", image: "/team/tony.jpg" },
        { id: "anurag", name: "Anurag Sanadi", role: "GITHUB MASTER", image: "/team/anurag.jpg" },
        { id: "mukisa", name: "Mukisa Lubega", role: "TEAM LEAD", image: "/team/mukisa.png" },
        { id: "grishma", name: "Grishma Thumar", role: "TEAM CTO", image: "/team/grishma.jpg" },
        { id: "abinash", name: "Abinash Shrestha", role: "FRONTEND LEAD", image: "/team/abinash.jpg" },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
                onLogin={() => onNavigate("login")}
                onSignUp={() => onNavigate("register")}
                onLogout={onLogout}
                onApply={() => onNavigate("apply")}
                onSearch={() => onNavigate("home")}
                onHome={() => onNavigate("home")}
                onDashboard={() => onNavigate("dashboard")}
                onProfile={() => onNavigate("profile")}
                onPosts={() => onNavigate("posts")}
                onTeam={() => onNavigate("aboutus")}
                showSearchBar={true}
                searchQuery={searchQuery}
                selectedSubject={selectedSubject}
                subjects={subjects}
                onSearchQueryChange={onSearchQueryChange}
                onSubjectChange={onSubjectChange}
            />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="mb-4">Meet Our Team</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We are Team 06 — building a modern, scalable web app for our SFSU Software Engineering course.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {team.map((member) => (
                        <div
                            key={member.id}
                            className="group cursor-pointer flex flex-col items-center"
                            onClick={() => onSelectMember(member.id)}
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-card shadow-lg group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-300 mb-6 relative bg-secondary">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-[10px] md:text-xs font-bold tracking-[0.2em] mb-2 uppercase text-primary/80 text-center">{member.role}</h3>
                            <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors text-center">{member.name}</p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
