import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import cloudinary from "@/lib/cloudinary";
import { connectToDatabase } from "@/userActions/actions";
import fs from "fs/promises";
import path from "path";
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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();
      console.log(user);
      console.log("User import:", User);
console.log("Type:", typeof User);
console.log("Has create:", User?.create);
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const defaultImagePath = path.join(
          process.cwd(),
          "public",
          "profilepics",
          "unknownUserImage.jpg",
        );

        const buffer = await fs.readFile(defaultImagePath);
        let newUser = new User({
          name: user.name,
          email: user.email,
          profilepic: {
            name: "RBdefault",
          },
        });

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "profilepics",
                public_id: newUser._id.toString(), // optional: keeps same image per user
                overwrite: true,
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              },
            )
            .end(buffer);
        });
        newUser.profilepic.url=result.secure_url
        await newUser.save()

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
