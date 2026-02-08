"use server";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import User from "@/models/User";
import Doc from "@/models/Doc";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { profile } from "console";
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function updateUser(formData) {
  await connectToDatabase();
  const data = Object.fromEntries(formData.entries());
  const { name, contact, email } = data;
  const profilepic = formData.get("profilepic");

  console.log(1234567890);
  console.log(profilepic);

  let user = await User.findOne({ email: email });

  if (user) {
    user.name = name;
    user.contact = contact;
    if (profilepic.size > 0) {
    const mimeMap = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/avif": "avif",
      "image/svg+xml": "svg",
    };

    const oldUrl = user.profilepic.url;
    const ext = mimeMap[profilepic.type] || "jpg";

    const newUrl = oldUrl.replace(/\.[^/.]+$/, `.${ext}`);
    const newPath = path.join(process.cwd(), "public", newUrl);

    const buffer = Buffer.from(await profilepic.arrayBuffer());

    // write first (safe)
    await fs.writeFile(newPath, buffer);

    // delete old file only if extension changed
    const oldPath = path.join(process.cwd(), "public", oldUrl);
    if (oldPath !== newPath) {
      await fs.rm(oldPath).catch(() => {});
    }

    user.profilepic.url = newUrl;
    user.profilepic.name = profilepic.name;
  }

    await user.save();
    return;
  }
}

export async function getUser(email) {
  await connectToDatabase();
  let user = await User.findOne({ email: email }).lean();
  if (user) {
    return {
      name: user.name,
      contact: user.contact,
      picurl: user.profilepic.url,
      picname: user.profilepic.name,
    };
  }
}

export async function saveDoc(prevState, fdata) {
  await connectToDatabase();
  fdata = Object.fromEntries(fdata.entries());
  let session = await getServerSession(authOptions);

  let document = await Doc.findOne({ email: session.user.email });
  let validAlias = fdata.alias.trim();
  if (validAlias === "" || validAlias.split(" ").length != 1) {
    return {
      ok: false,
      status: "'Alias' name should not have spaces in between",
    };
  }

  if (!document) {
    document = await Doc.create({
      email: session.user.email,
      doc: [{ alias: validAlias, data: fdata.data.trim() }],
    });
    return { ok: true, status: "Data added successfully" };
  } else {
    if (document.doc.some((d) => d.alias === validAlias)) {
      console.log("duplicate alias");
      return { ok: false, status: "Duplicate 'Alias' found" };
    } else {
      document.doc.push({ alias: validAlias, data: fdata.data.trim() });
      await document.save();
      return { ok: true, status: "Data added successfully" };
    }
  }
}

export async function getsavedDoc(email) {
  await connectToDatabase();
  let document = await Doc.findOne({ email: email }).lean();
  if (document) {
    return document.doc
      .sort((a, b) => a.alias.localeCompare(b.alias))
      .map((d) => {
        return { alias: d.alias, data: d.data };
      });
  }
}

export async function allDoc(email) {
  await connectToDatabase();
  let doc = await Doc.find({ email: email }).select("docname -_id").lean();
  if (doc) {
    // console.log(doc)
    return doc;
  }
}

export async function sendAliasMatch(userEmail, givenAlias) {
  await connectToDatabase();
  console.log(userEmail, givenAlias);
  let document = await Doc.findOne({ email: userEmail }).lean();
  let doc = document.doc;
  if (!document || !doc)
    return { ok: false, message: "No data found", data: "null" };
  let arr = doc.find((d) => d.alias === givenAlias);
  if (arr) return { ok: true, message: "Data found", data: arr.data };
  else return { ok: false, message: "No data found", data: null };
}

export async function deleteDoc(dltAlias, userEmail) {
  await connectToDatabase();
  await Doc.updateOne(
    { email: userEmail },
    { $pull: { doc: { alias: dltAlias } } },
  );
}
