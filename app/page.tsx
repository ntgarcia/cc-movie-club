"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    title: "Conclave",
    date: "February 2025",
    description:
      "After the unexpected death of the Pope, Cardinal Lawrence is tasked with managing the covert and ancient ritual of electing a new one. Sequestered in the Vatican with the Catholic Church's most powerful leaders until the process is complete, Lawrence finds himself at the center of a conspiracy that could lead to its downfall.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3yO0zwufzAZ0paJewfhRiFGUvV1m6jIQux8Yl",
    picker: "Nathan",
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
    description:
      "After horrific riding accident leaves him unable to compete in the rodeo circuit, a young cowboy is forced to look for a new purpose.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3tbWEMRSU3oOYrDFX1UfTwu0kMRSg7hIctHxs",
    picker: "Nathan",
    contributors: ["Nigel Tomas", "Jillian Muli", "Jared Madayag"],
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
    picker: "Tisha Halim",
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
    picker: "Nathan",
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
    description:
      "When a ronin requesting seppuku at a feudal lord's palace is told of the brutal suicide of another ronin who previously visited, he reveals how their pasts are intertwined - and in doing so challenges the clan's integrity.",
    image:
      "https://uploadthing.com/f/Ak9BmqoGNVp3XQQl1USOcWgpi2klhJ1dxA7n4S6COK5PfuQM",
    picker: "Nigel",
    contributors: ["Nigel Tomas", "Nathan Garcia", "Johann Ebrole"],
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
    picker: "Nathan",
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
  const [expandedMovies, setExpandedMovies] = useState<string[]>([]);

  const toggleMovie = (title: string) => {
    setExpandedMovies((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
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
              <div className="col-6 form-widget">
                <Button>
                  {" "}
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
          <p className="leading-relaxed">
            Journaling our group movie watches & our thoughts!
          </p>
        </header>

        <section className="mb-16 space-y-4">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground">
            Movie Lovers
          </h2>
          <div className="flex flex-wrap -space-x-2 sm:-space-x-0 sm:gap-4">
            {people.map((person) => (
              <div key={person.name} className="flex items-center">
                <Avatar className="h-8 w-8 border-2 border-background sm:mr-2">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm hidden sm:flex">{person.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground">
            Movies
          </h2>
          <div className="relative space-y-4 pl-4">
            <div className="absolute left-0 top-0 h-full w-px bg-border" />

            {Object.entries(groupedMovies).map(([month, movies]) => (
              <div key={month}>
                <h3 className="text-sm font-medium mb-4">{month}</h3>
                {movies.map((movie) => {
                  const isExpanded = expandedMovies.includes(movie.title);

                  return (
                    <div key={movie.title} className="group relative">
                      <div className="absolute -left-[1.3rem] top-[1.6rem] h-2.5 w-2.5 rounded-full border-2 border-background bg-border group-hover:bg-primary" />

                      <div className="rounded-lg border transition-colors hover:bg-muted/50 mb-2">
                        <div className="p-4 flex flex-col sm:flex-row gap-4">
                          <div className="shrink-0 sm:w-20 sm:h-28 w-full h-40 relative">
                            <Image
                              src={movie.image}
                              alt={movie.title}
                              fill
                              unoptimized
                              className="rounded-md object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <div className="flex flex-row items-center gap-2">
                                <h3 className="font-medium leading-none">
                                  {movie.title}
                                </h3>
                                {/* <p className="hidden sm:flex mt-1 text-sm text-muted-foreground">
                                  {movie.date}
                                </p> */}
                              </div>
                              <div className="flex flex-row items-center gap-2">
                                <div className="flex -space-x-2 shrink-0">
                                  {movie.contributors.map((contributor) => (
                                    <Avatar
                                      key={contributor}
                                      className="h-6 w-6 border-2 border-background"
                                    >
                                      <AvatarImage
                                        src={
                                          people.find(
                                            (p) => p.name === contributor
                                          )?.avatar
                                        }
                                        alt={contributor}
                                      />
                                      <AvatarFallback>
                                        {contributor
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 shrink-0"
                                  onClick={() => toggleMovie(movie.title)}
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
                              {movie.comments.map((comment, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={
                                        people.find(
                                          (p) => p.name === comment.author
                                        )?.avatar
                                      }
                                      alt={comment.author}
                                    />
                                    <AvatarFallback>
                                      {comment.author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">
                                      {comment.author.split(" ")[0]}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {comment.text}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
