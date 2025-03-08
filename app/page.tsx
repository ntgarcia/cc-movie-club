"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { AuthDialog } from "@/components/auth/auth-dialog";

interface Person {
  id: string;
  name: string;
  avatar_url: string;
}

interface Comment {
  id: string;
  author_id: string;
  movie_id: string;
  text: string;
  author: Person;
}

interface Movie {
  id: string;
  title: string;
  date: string;
  description: string;
  image_url: string;
  picker_id: string;
  contributors: Person[];
  comments: Comment[];
}

export default function Page() {
  const [people, setPeople] = useState<Person[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [expandedMovies, setExpandedMovies] = useState<
    string[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: peopleData, error: peopleError } =
        await supabase.from("people").select("*");

      if (peopleError) throw peopleError;
      setPeople(peopleData);

      const { data: moviesData, error: moviesError } =
        await supabase
          .from("movies")
          .select(
            `
            *,
            picker:picker_id(id, name, avatar_url),
            movie_contributors:movie_contributors(
              contributor:people(*)
            ),
            comments(
              *,
              author:people(*)
            )
          `
          )
          .order("date", { ascending: false });

      if (moviesError) throw moviesError;

      setMovies(
        moviesData.map((movie) => ({
          ...movie,
          contributors: movie.movie_contributors.map(
            (mc: { contributor: Person }) => mc.contributor
          ),
          comments: movie.comments.map(
            (comment: { author: Person }) => ({
              ...comment,
              author: comment.author,
            })
          ),
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "Failed to load data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        fetchData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Check auth status on load
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setIsLoggedIn(!!session);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading movies...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
          <p className="text-destructive font-medium">
            ⚠️ {error}
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // if (!movies.length) {
  //   return (
  //     <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
  //       <div className="flex flex-col items-center gap-2 max-w-md text-center px-4">
  //         <p className="text-muted-foreground">
  //           No movies found
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-8 flex flex-col items-left">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mb-4">
                <AvatarImage src="/cc.png" />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
              <h1 className="mb-4 text-base font-bold ml-2">
                Cream Cheese Club
              </h1>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <AuthDialog
                isLoggedIn={isLoggedIn}
                onAuthSuccess={() => setIsLoggedIn(true)}
              />
              <ThemeToggle />
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
            {!people.length ? (
              <p className="text-sm text-muted-foreground">
                No movie lovers found
              </p>
            ) : (
              people.map((person) => (
                <div
                  key={person.name}
                  className="flex items-center"
                >
                  <Avatar className="h-8 w-8 border-2 border-background sm:mr-2">
                    <AvatarImage
                      src={person.avatar_url}
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
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium tracking-wider text-muted-foreground">
              Movies
            </h2>
            <p className="text-sm text-muted-foreground">
              {movies.length}{" "}
              {movies.length === 1 ? "movie" : "movies"}
            </p>
          </div>

          <div className="relative space-y-4 pl-4">
            <div className="absolute left-0 top-0 h-full w-px bg-border" />

            {Object.entries(groupedMovies).length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                No movies found for any month
              </p>
            ) : (
              Object.entries(groupedMovies).map(
                ([month, movies]) => (
                  <div key={month}>
                    <h3 className="text-sm font-medium mb-4">
                      {month}
                    </h3>
                    {movies.map((movie) => {
                      const isExpanded =
                        expandedMovies.includes(
                          movie.title
                        );

                      return (
                        <div
                          key={movie.title}
                          className="group relative"
                        >
                          <div className="absolute -left-[1.3rem] top-[1.6rem] h-2.5 w-2.5 rounded-full border-2 border-background bg-border group-hover:bg-primary" />

                          <div className="rounded-lg border transition-colors hover:bg-muted/50 mb-2">
                            <div className="p-4 flex flex-col sm:flex-row gap-4">
                              <div className="shrink-0 sm:w-20 sm:h-28 w-full h-40 relative">
                                <Image
                                  src={movie.image_url}
                                  alt={movie.title}
                                  fill
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
                                      {movie.contributors.map(
                                        (contributor) => (
                                          <Avatar
                                            key={
                                              contributor.id
                                            }
                                            className="h-6 w-6 border-2 border-background"
                                          >
                                            <AvatarImage
                                              src={
                                                contributor.avatar_url
                                              }
                                              alt={
                                                contributor.name
                                              }
                                            />
                                            <AvatarFallback>
                                              {contributor.name
                                                .split(" ")
                                                .map(
                                                  (n) =>
                                                    n[0]
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
                                              comment.author
                                                .avatar_url
                                            }
                                            alt={
                                              comment.author
                                                .name
                                            }
                                          />
                                          <AvatarFallback>
                                            {comment.author.name
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
                                              comment.author.name.split(
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
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
