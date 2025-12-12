import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import { AuthProvider } from "../context/AuthContext";
import { CandidateProvider } from "../context/CandidateContext";
import { ModalProvider } from "../context/ModalContext";
import "./globals.css";

export const metadata: Metadata = {
    title: "WeddiAI - Wedding Platform",
    description: "Premium Wedding Experience",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                {/* Placeholder for font loading */}
            </head>
            <body>
                <AuthProvider>
                    <CandidateProvider>
                        <ModalProvider>
                            <Navigation />
                            {children}
                        </ModalProvider>
                    </CandidateProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
