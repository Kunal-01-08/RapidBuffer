import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // correct import
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path if needed
import { sendAliasMatch } from "@/userActions/actions";
export async function GET(req) {
  // Get the session from the request
  let agent= req.headers.get("x-requesting-agent");
  let givenAlias=req.headers.get("givenAlias")
  if(agent=="RBS"){

      const session = await getServerSession(authOptions);
      
      console.log("Session:", session); // logs in terminal
      
      
      if (!session) {
          return NextResponse.json(
              { ok: false,message:"loggedOut",data:null },
            );
        }
        
        let res=await sendAliasMatch(session.user.email,givenAlias);
        return NextResponse.json(res);
    }
    else return NextResponse.json({error:"No response generated...!"})
}
