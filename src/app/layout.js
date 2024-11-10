import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NeuroGenAI",
  description: "",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <AuthProvider session={session} >
        <body className="bg-black">
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
