"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import Link from "next/link";

const people = [
  {
    name: "Cream Cheese",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3tLeQjbU3oOYrDFX1UfTwu0kMRSg7hIctHxsy",
  },
  {
    name: "Nathan Garcia",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3yL6796fzAZ0paJewfhRiFGUvV1m6jIQux8Yl",
  },
  {
    name: "Johann Ebrole",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp39PuAqP5Uv7q3iLSH4VQ0eT6c8PhEFKJkdXoj",
  },
  {
    name: "Jenelle Nievas",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3GahKPOBPle78t4bXYowux0CUJhW62zK13cDN",
  },
  {
    name: "Nigel Tomas",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3fWSHmSzDhp09KuUTJoZXS8Nt7PjY3E5AqnLC",
  },
  {
    name: "Tisha Halim",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3pWd18YJJc4UVmxwy2vE07bACizBoRhdX3H1u",
  },
  {
    name: "Gabe Apolinar",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3hiaEWHhbebljVNAkE5o62mncIRTGxOQPSf9C",
  },
  {
    name: "Jillian Muli",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3LpYiWcGi4Gwx09ACnVFa2p1SEMvWZrTcdNL7",
  },
  {
    name: "Jared Madayag",
    avatar:
      "https://uploadthing.com/f/Ak9BmqoGNVp3ZUQXiBLMedVhpwHtXAGofK7gNWiuxvnBQ8yb",
  },
];

const movies = [
  {
    title: "Aftersun",
    date: "March 2025",
    theme: { name: "Irish", color: "green" },
    description:
      "Twenty years after their last holiday at a fading vacation resort, Sophie reflects on the rare time spent with her loving and idealistic father Calum. Sophie's recollections become a powerful and heartrending portrait of their relationship, as she tries to reconcile the father she knew with the man she didn't.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3evbscdgHTaQEtXF4lZMJyqh5gvmweSA0x92p",
    picker: ["Jillian Muli", "Jenelle Nievas"],
    contributors: [],
    comments: [],
  },
  {
    title: "Conclave",
    date: "February 2025",
    description:
      "After the unexpected death of the Pope, Cardinal Lawrence is tasked with managing the covert and ancient ritual of electing a new one. Sequestered in the Vatican with the Catholic Church's most powerful leaders until the process is complete, Lawrence finds himself at the center of a conspiracy that could lead to its downfall.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3yO0zwufzAZ0paJewfhRiFGUvV1m6jIQux8Yl",
    picker: ["Cream Cheese"],
    contributors: ["Cream Cheese"],
    comments: [
      {
        author: "Tisha Halim",
        text: "THE GIRLS ARE FIGHTINGGGG",
      },
      {
        author: "Nathan Garcia",
        text: "The portrayal of the Catholic Conclave gives me a greater sense of Hope for the future than I should have really",
      },
    ],
  },
  {
    title: "The Rider",
    date: "February 2025",
    theme: { name: "Horse", color: "brown" },
    description:
      "After horrific riding accident leaves him unable to compete in the rodeo circuit, a young cowboy is forced to look for a new purpose.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3tbWEMRSU3oOYrDFX1UfTwu0kMRSg7hIctHxs",
    picker: ["Nathan"],
    contributors: [
      "Nigel Tomas",
      "Jillian Muli",
      "Jared Madayag",
    ],
    comments: [
      {
        author: "Nigel Tomas",
        text: "Movie was nice. 7/10 I don't like horses",
      },
      {
        author: "Jillian Muli",
        text: "8/10 🐎🐎",
      },
      {
        author: "Jared Madayag",
        text: "I give it 7 big neighs",
      },
    ],
  },
  {
    title: "Girl, Interrupted",
    date: "February 2025",
    description:
      "A young woman finds herself at a renowned mental institution for troubled young women, where she must choose between the world of people who belong on the inside or the often difficult world of reality on the outside.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3IvZJ0IdACwPMiSZ0RjgsOu24fL9ohN5FUeqT",
    picker: ["Tisha Halim"],
    contributors: ["Cream Cheese"],
    comments: [
      {
        author: "Tisha Halim",
        text: "there's just something about movies with 2 lead women that just draws me in…. the acting in all departments is off the roof… everyone is just so good in their roles in my opinion…",
      },
    ],
  },
  {
    title: "The Brutalist",
    date: "January 2025",
    description:
      "Escaping postwar Europe, a visionary architect comes to America to rebuild his life, his career, and his marriage. On his own in a strange new country, he settles in Pennsylvania, where a wealthy and prominent industrialist recognises his talent.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3JJnMatEgM3Ccear2d6zmt5nsXZGLQ1FvwfR7",
    picker: ["Nathan"],
    contributors: [
      "Nigel Tomas",
      "Nathan Garcia",
      "Jillian Muli",
      "Jared Madayag",
    ],
    comments: [
      {
        author: "Nathan Garcia",
        text: "The first half was absolutely amazing in terms of inspiration and hope, the main theme blasting was insane in IMAX. After the intermission it felt like a fumble to me, but it does offer realistic bleakness in terms of what the American Dream entails for foreigners.",
      },
    ],
  },
  {
    title: "Harakiri",
    date: "January 2025",
    theme: { name: "No theme", color: "grey" },
    description:
      "When a ronin requesting seppuku at a feudal lord's palace is told of the brutal suicide of another ronin who previously visited, he reveals how their pasts are intertwined - and in doing so challenges the clan's integrity.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3XQQl1USOcWgpi2klhJ1dxA7n4S6COK5PfuQM",
    picker: ["Nigel"],
    contributors: [
      "Nigel Tomas",
      "Nathan Garcia",
      "Johann Ebrole",
    ],
    comments: [
      {
        author: "Nigel Tomas",
        text: "Quite slow for modern movie standards, but every bit as enjoyable so I loved it.",
      },
      {
        author: "Nathan Garcia",
        text: "Although slow start the cinematography dialogue lighting etc. all feel timeless. Genuinely surprised this was from the 60s. As the story unraveled it only got even more peak. Especially the journey to and of the duel was insane",
      },
      {
        author: "Johann Ebrole",
        text: "10/10 for me, I didn't really find it slow i was hooked throughout",
      },
    ],
  },
  {
    title: "Nosferatu",
    date: "December 2024",
    description:
      "In the 1830s, estate agent Thomas Hutter travels to Transylvania for a fateful meeting with Count Orlok, a prospective client. In his absence, Hutter's new bride, Ellen, is left under the care of their friends, Friedrich and Anna Harding. Plagued by horrific visions and an increasing sense of dread, Ellen soon encounters an evil force that's far beyond her control.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3v48S24tzbwAWCf6UD3RtN4iMxo9E8OaeJK5g",
    picker: ["Nathan"],
    contributors: [
      "Nathan Garcia",
      "Johann Ebrole",
      "Nigel Tomas",
      "Tisha Halim",
      "Gabe Apolinar",
    ],
    comments: [
      {
        author: "Johann Ebrole",
        text: "The cinematography was breathtaking",
      },
      {
        author: "Tisha Halim",
        text: "1922 but make it freaky",
      },
      {
        author: "Nigel Tomas",
        text: "He got a bluetooth d***!",
      },
    ],
  },
];

export default function Page() {
  const [expandedMovies, setExpandedMovies] = useState<
    string[]
  >([]);

  const toggleMovie = (title: string) => {
    setExpandedMovies((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  // Group movies by month
  const groupedMovies = movies.reduce((acc, movie) => {
    const month = movie.date.split(" ")[0];
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(movie);
    return acc;
  }, {} as { [key: string]: typeof movies });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-8 flex flex-col items-left">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mb-4">
                <AvatarImage src="https://uploadthing.com/f/Ak9BmqoGNVp3tLeQjbU3oOYrDFX1UfTwu0kMRSg7hIctHxsy" />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
              <h1 className="mb-4 text-base font-bold ml-2">
                Cream Cheese Club
              </h1>
            </div>
            <div className="mb-4 flex gap-4">
              <ThemeToggle />
              {/* <div className="col-6 form-widget">
                <Button>
                  {" "}
                  <Link href="/login">Login</Link>
                </Button>
              </div> */}
            </div>
          </div>
          <p className="leading-relaxed">
            Journaling our group movie watches & our
            thoughts!
          </p>
        </header>

        <section className="mb-16 space-y-4">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground">
            Movie Lovers
          </h2>
          <div className="flex flex-wrap -space-x-2 sm:-space-x-0 sm:gap-4">
            {people.map((person) => (
              <div
                key={person.name}
                className="flex items-center"
              >
                <Avatar className="h-8 w-8 border-2 border-background sm:mr-2">
                  <AvatarImage
                    src={person.avatar}
                    alt={person.name}
                  />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm hidden sm:flex">
                  {person.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground">
            Movies (2025)
          </h2>
          <div className="relative space-y-4 pl-4">
            <div className="absolute left-0 top-0 h-full w-px bg-border" />

            {Object.entries(groupedMovies).map(
              ([month, movies]) => (
                <div key={month}>
                  <h3 className="text-sm font-medium mb-4">
                    {month}
                  </h3>
                  {movies.map((movie) => {
                    const isExpanded =
                      expandedMovies.includes(movie.title);

                    return (
                      <div
                        key={movie.title}
                        className="group relative"
                      >
                        <div className="absolute -left-[1.3rem] top-[1.6rem] h-2.5 w-2.5 rounded-full border-2 border-background bg-border group-hover:bg-primary" />

                        <div
                          className={`rounded-lg border transition-all duration-200 ease-in-out mb-2 relative overflow-hidden ${
                            movie.theme
                              ? `border ${
                                  movie.theme.color ===
                                  "green"
                                    ? "border-green-500/20 dark:border-green-500/10 hover:border-green-500/30 dark:hover:border-green-500/20"
                                    : movie.theme.color ===
                                      "purple"
                                    ? "border-purple-500/20 dark:border-purple-500/10 hover:border-purple-500/30 dark:hover:border-purple-500/20"
                                    : movie.theme.color ===
                                      "brown"
                                    ? "border-amber-500/20 dark:border-amber-500/10 hover:border-amber-500/30 dark:hover:border-amber-500/20"
                                    : "border-gray-500/20 dark:border-gray-500/10 hover:border-gray-500/30 dark:hover:border-gray-500/20"
                                } dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-transparent dark:before:transition-all dark:before:duration-200 ${
                                  movie.theme.color ===
                                  "green"
                                    ? "dark:before:via-green-500/5 dark:hover:before:via-green-500/10"
                                    : movie.theme.color ===
                                      "purple"
                                    ? "dark:before:via-purple-500/5 dark:hover:before:via-purple-500/10"
                                    : movie.theme.color ===
                                      "brown"
                                    ? "dark:before:via-amber-500/5 dark:hover:before:via-amber-500/10"
                                    : "dark:before:via-gray-500/5 dark:hover:before:via-gray-500/10"
                                } dark:before:to-transparent dark:before:animate-shine dark:before:bg-[length:200%_100%] dark:after:absolute dark:after:inset-0 dark:after:bg-gradient-to-b dark:after:transition-all dark:after:duration-200 ${
                                  movie.theme.color ===
                                  "green"
                                    ? "dark:after:from-green-900/5 dark:hover:after:from-green-900/10"
                                    : movie.theme.color ===
                                      "purple"
                                    ? "dark:after:from-purple-900/5 dark:hover:after:from-purple-900/10"
                                    : movie.theme.color ===
                                      "brown"
                                    ? "dark:after:from-amber-900/5 dark:hover:after:from-amber-900/10"
                                    : "dark:after:from-gray-900/5 dark:hover:after:from-gray-900/10"
                                } dark:after:to-transparent/5 dark:after:backdrop-blur-[1px] hover:bg-muted/10 dark:bg-muted/20 dark:hover:bg-background/50`
                              : "hover:bg-muted/20 dark:hover:bg-muted/30"
                          }`}
                        >
                          <div className="relative z-10 p-4 flex flex-col sm:flex-row gap-4">
                            <div className="shrink-0 sm:w-20 sm:h-28 w-full h-40 relative">
                              <div
                                className={`absolute inset-0 -m-1 rounded-md blur-md ${
                                  movie.theme
                                    ? movie.theme.color ===
                                      "green"
                                      ? "bg-green-500/10"
                                      : movie.theme
                                          .color ===
                                        "purple"
                                      ? "bg-purple-500/10"
                                      : movie.theme
                                          .color === "brown"
                                      ? "bg-amber-500/10"
                                      : "bg-gray-500/10"
                                    : "bg-primary/10"
                                }`}
                              ></div>
                              <Image
                                src={movie.image}
                                alt={movie.title}
                                fill
                                unoptimized
                                className="rounded-md object-cover relative"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <div className="flex flex-row items-center gap-2">
                                  <h3 className="font-medium leading-none">
                                    {movie.title}
                                  </h3>
                                  {movie.theme && (
                                    <span
                                      className={`px-2 py-0.5 text-xs font-medium rounded-full
                                        ${
                                          movie.theme
                                            .color ===
                                          "green"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            : movie.theme
                                                .color ===
                                              "purple"
                                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                            : movie.theme
                                                .color ===
                                              "brown"
                                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                            : movie.theme
                                                .color ===
                                              "grey"
                                            ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                        }`}
                                    >
                                      {movie.theme.name}
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                  <div className="flex -space-x-2 shrink-0">
                                    {movie.contributors.map(
                                      (contributor) => (
                                        <Avatar
                                          key={contributor}
                                          className="h-6 w-6 border-2 border-background"
                                        >
                                          <AvatarImage
                                            src={
                                              people.find(
                                                (p) =>
                                                  p.name ===
                                                  contributor
                                              )?.avatar
                                            }
                                            alt={
                                              contributor
                                            }
                                          />
                                          <AvatarFallback>
                                            {contributor
                                              .split(" ")
                                              .map(
                                                (n) => n[0]
                                              )
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                      )
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 shrink-0"
                                    onClick={() =>
                                      toggleMovie(
                                        movie.title
                                      )
                                    }
                                  >
                                    {isExpanded ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">
                                {movie.description}
                              </p>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="border-t bg-muted/50 px-4 py-3">
                              <h4 className="mb-2 text-sm font-medium">
                                Comments
                              </h4>
                              <div className="space-y-3">
                                {movie.comments.map(
                                  (comment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage
                                          src={
                                            people.find(
                                              (p) =>
                                                p.name ===
                                                comment.author
                                            )?.avatar
                                          }
                                          alt={
                                            comment.author
                                          }
                                        />
                                        <AvatarFallback>
                                          {comment.author
                                            .split(" ")
                                            .map(
                                              (n) => n[0]
                                            )
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">
                                          {
                                            comment.author.split(
                                              " "
                                            )[0]
                                          }
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {comment.text}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
