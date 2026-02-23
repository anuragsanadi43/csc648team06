import { Button } from "./ui/button";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ArrowLeft } from "lucide-react";

interface MemberInfo {
    id: string;
    name: string;
    role: string;
    image: string;
    intro: string;
}

interface AboutMemberPageProps {
    memberId: string;
    onBack: () => void;
    onNavigate: (page: string) => void;
    isLoggedIn: boolean;
    userEmail?: string;
    onLogout: () => void;
    searchQuery: string;
    selectedSubject: string;
    subjects: string[];
    onSearchQueryChange: (query: string) => void;
    onSubjectChange: (subject: string) => void;
}

export function AboutMemberPage({
    memberId,
    onBack,
    onNavigate,
    isLoggedIn,
    userEmail,
    onLogout,
    searchQuery,
    selectedSubject,
    subjects,
    onSearchQueryChange,
    onSubjectChange
}: AboutMemberPageProps) {
    const memberData: Record<string, MemberInfo> = {
        tony: {
            id: "tony",
            name: "Tony Huang",
            role: "Backend Lead",
            image: "/team/tony.jpg",
            intro: "I’m Tony Huang",
        },
        anurag: {
            id: "anurag",
            name: "Anurag Sanadi",
            role: "Github Lead",
            image: "/team/anurag.jpg",
            intro: "I'm am in my last semester at SFSU majoring in CS with plans to pursue a masters degree in the same subject",
        },
        mukisa: {
            id: "mukisa",
            name: "Mukisa Lubega",
            role: "Team Lead",
            image: "/team/mukisa.png",
            intro: "I’m Mukisa Lubega — SFSU Senior Majoring in Business Information Systems with a Minor in Computer Science.",
        },
        grishma: {
            id: "grishma",
            name: "Grishma Thumar",
            role: "Team CTO",
            image: "/team/grishma.jpg",
            intro: "I'm am a fourth year student majoring in Computer Science.",
        },
        abinash: {
            id: "abinash",
            name: "Abinash Shrestha",
            role: "Frontend Lead",
            image: "/team/abinash.jpg",
            intro: "I'm SFSU Senior student majoring in CS",
        },
    };

    const member = memberData[memberId];

    if (!member) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p>Member not found</p>
                <Button onClick={onBack}>Go Back</Button>
            </div>
        );
    }

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
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-8 hover:text-primary transition-colors gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Team
                </Button>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-card border rounded-3xl overflow-hidden shadow-xl">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">{member.role}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-foreground tracking-tight">{member.name}</h1>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                    {member.intro}
                                </p>
                            </div>
                            <div className="relative aspect-square md:aspect-auto h-[400px] md:h-full overflow-hidden bg-secondary">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
