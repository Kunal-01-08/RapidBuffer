import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/userActions/actions";
import fs from "fs/promises";
import path from "path";
import User from "@/models/User";
import { nanoid } from "nanoid";
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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();
      console.log(user);
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const id = nanoid();

        const filename = `${Date.now()}-${id}.jpg`;
        const uploadPath = path.join(
          process.cwd(),
          "public/profilepics",
          filename,
        );
        const defaultImagePath = path.join(
          process.cwd(),
          "public",
          "profilepics",
          "unknownUserImage.jpg",
        );

        const buffer = await fs.readFile(defaultImagePath);
        await fs.writeFile(uploadPath, buffer);
        let newUser = await User.create({
          name: user.name,
          email: user.email,
          profilepic: {
            url: `/profilepics/${filename}`,
            name: "RBdefault",
          },
        });

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
