import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/userActions/actions";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
     GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        let newUser = await User.create({
          name: user.name,
          email: user.email
        });
        await newUser.save();
        console.log("New user created!");
      } else {
        console.log("User signed in!");
      }
      return true; // Continue with sign-in
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
