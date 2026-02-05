import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // correct import
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path if needed

export async function GET(req) {
  // Get the session from the request
  let agent= req.headers.get("x-requesting-agent");
  if(agent=="RBS"){

      const session = await getServerSession(authOptions);
      
      console.log("Session:", session); // logs in terminal
      
      // Not logged in
      if (!session) {
          return NextResponse.json(
              { loggedIn: false },
            );
        }
        
        // Logged in — can return user info
        return NextResponse.json({
            loggedIn: true,
        });
    }
    else return NextResponse.json({error:"No response generated...!"})
}
