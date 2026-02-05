"use client"
import React from "react";
import Link from "next/link";
const Page= () => {
  let cards = [
    { Heading: "Home Page", src: "HomePage.mp4" },
    { Heading: "RBS Extension", src: "ExtensionUsage.mp4" },
    { Heading: "Saved Page", src: "SavedPage.mp4" },
    { Heading: "Insert Page", src: "InsertPage.mp4" },
    { Heading: "Profile Page", src: "ProfilePage.mp4" },
    { Heading: "Login Page", src: "LoginPage.mp4" },
  ];
  return (
    <div className="h-screen  w-screen m-auto  relative text-white perspective-[1600px] transform-3d rotate-x-[-15deg] ">
      <Link href="/" className="absolute">
      <button className="px-2 ml-3 mt-2 py-1 bg-gray-500 rounded-2xl text-sm hover:bg-gray-700 border-2 ">Go back</button>
      </Link>
      <div className=" text-xl sm:text-4xl text-center font-extrabold ">KNOW ABOUT US!</div>
      <div className="rotator   relative transform-3d [animation:rotate_40s_linear_infinite] pt-10 ">
        {cards.map((card, index) => {
          return (
            <div
              key={index}
              style={{
                transform: `rotateY(${
                  (index * 360) / cards.length
                }deg)${window.innerWidth < 1024 ? 'translateZ(140px)' : 'translateZ(300px)'}
`,
              }}
              className={` border-4 border-blue-950 card lg:h-50 w-[150px] left-[calc(50%-75px)] lg:w-[320px] bg-[rgba(13,7,183,0.2)] absolute lg:left-[calc(50%-160px)] h-[calc(150*200/320)]  transform-3d`}
            >
              <div className="flex flex-col items-center justify-between h-full font-extrabold ">
                <span className="text-[2.5xl]">{card.Heading}</span>
                <video
                  src={card.src}
                  loop
                  autoPlay
                  muted
                  className="w-full h-full object-fill"
                ></video>
              </div>
            </div>
          );
        })}
      </div>

      <div className="about absolute bottom-0 left-0 w-screen h-2/3 lg:h-2/5  bg-blue-950  flex flex-col items-center sm:flex-row justify-start overflow-hidden border-t-4 border-gray-600">
        <div className="flex flex-col items-start justify-start h-full">
          <div className=" text-8xl font-extrabold ">Rapid</div>
          <div className="text-8xl font-extrabold">Buffer.</div>
          <div className="text-gray-500 text-3xl">
            We respect your time
          </div>
        </div>
        <div className="overflow-hidden mt-3">
          <div className=" aboutText hover:[animation-play-state:paused] w-full h-fit  p-4  [animation:slideup_15s_linear_infinite] transform sm:[animation:slideup_10s_linear_infinite] italic ">
        
           <section className="max-w-5xl mx-auto px-2 py-16 text-gray-200">
      
      <h1 className="text-5xl font-bold text-yellow-600 mb-6">
        About Rapid Buffer
      </h1>

      <p className="text-lg text-gray-300 mb-10 leading-relaxed">
        Rapid Buffer is a productivity-first tool designed to help you store,
        retrieve, and reuse frequently typed information instantly. It works
        through a browser extension backed by a secure web environment, allowing
        you to finish repetitive typing tasks in seconds instead of minutes.
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-white">
        What Problem Does It Solve?
      </h2>

      <p className="mb-8 text-gray-300 leading-relaxed">
        Developers, students, and professionals often reuse the same text —
        email templates, code snippets, form data, resumes, or answers. Typing
        or searching for this content repeatedly is inefficient and breaks flow.
        Rapid Buffer solves this by letting you assign short aliases to your data
        and instantly expand them whenever needed.
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-white">
        How Rapid Buffer Works
      </h2>

      <ul className="list-disc list-inside mb-8 text-gray-300 space-y-3">
        <li>
          Store text snippets securely with a unique alias.
        </li>
        <li>
          Use the Rapid Buffer Support (RBS) command to trigger an alias.
        </li>
        <li>
          If the alias exists, the stored content is instantly retrieved.
        </li>
        <li>
          If the alias does not exist, nothing is injected — keeping your data safe.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4 text-white">
        Extension + Website Environment
      </h2>

      <p className="mb-6 text-gray-300 leading-relaxed">
        Rapid Buffer operates in two connected environments:
      </p>

      <div className="space-y-4 mb-8">
        <p className="text-gray-300">
          <span className="font-semibold text-white">Browser Extension:</span>{" "}
          Handles real-time alias detection, quick access, and seamless insertion
          directly into input fields without interrupting your workflow.
        </p>

        <p className="text-gray-300">
          <span className="font-semibold text-white">Web Platform:</span>{" "}
          Manages authentication, secure storage, and structured organization of
          all your buffers.
        </p>
      </div>

      <h2 className="text-3xl font-semibold mb-4 text-white">
        Security & Privacy
      </h2>

      <p className="mb-8 text-gray-300 leading-relaxed">
        Sensitive data is never exposed through URLs or local hacks. All storage
        operations are handled securely, and aliases only resolve when explicitly
        triggered by you. Rapid Buffer is designed with privacy as a default,
        not an afterthought.
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-white">
        Built For Speed
      </h2>

      <p className="text-gray-300 leading-relaxed">
        Rapid Buffer is not just about saving text — it&apos;s about preserving focus.
        No context switching, no searching, no copy-paste. Just type, trigger,
        and move on.
      </p>

    </section>

      
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default Page;
