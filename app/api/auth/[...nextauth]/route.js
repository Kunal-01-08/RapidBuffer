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
        const res = await fetch(user.image);

        const contentType = res.headers.get("content-type");
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const mimeToExt = {
          "image/png": "png",
          "image/jpeg": "jpg",
          "image/webp": "webp",
        };
        const filename = `${Date.now()}-${id}.${mimeToExt[contentType]}`;
        const uploadPath = path.join(
          process.cwd(),
          "public/profilepics",
          filename,
        );
        await fs.writeFile(uploadPath, buffer);
        let newUser = await User.create({
          name: user.name,
          email: user.email,
          profilepic: {
            url: `/profilepics/${filename}`,
            name: "RBdefault.img",
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
