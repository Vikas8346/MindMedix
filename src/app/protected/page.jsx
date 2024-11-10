import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Protected = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    session && (
      <div>
        <h1>Server Session</h1>
        <p>{session?.user?.email}</p>
      </div>
    )
  );
};

export default Protected;
