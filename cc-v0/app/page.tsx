"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

const people = [
  { name: "Nathan Garcia", avatar: "/nt.jpg" },
  { name: "Johann Ebrole", avatar: "/jn.jpg" },
  { name: "Nigel Tomas", avatar: "/ng.jpg" },
  { name: "Tisha Halim", avatar: "/th.jpg" },
  { name: "Gabe Apolinar", avatar: "/ga.jpg" },
]

const movies = [
  { 
    title: "Nosferatu", 
    date: "December 2024",
    description: "The dude from that one Spongebob episode",
    image: "/nosferatu.jpg",
    picker: "Nathan",
    contributors: ["Nathan Garcia", "Johann Ebrole", "Nigel Tomas", "Tisha Halim", "Gabe Apolinar"],
    comments: [
      { author: "Johann Ebrole", text: "The cinematography was breathtaking" },
      { author: "Tisha Halim", text: "1922 but make it freaky" },
      { author: "Nigel Tomas", text: "He got a bluetooth d***!" },
    ]
  },
]

export default function Page() {
  const [expandedMovies, setExpandedMovies] = useState<string[]>([])

  const toggleMovie = (title: string) => {
    setExpandedMovies(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-8 flex flex-col items-left">
          <Avatar className="h-8 w-8 mb-4">
            <AvatarImage src="/cc.png"/>
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <h1 className="mb-4 text-base font-bold">Cream Cheese Movie Club</h1>
          <div className="absolute right-4 top-4">
            <ThemeToggle />
          </div>
        </header>

        <section className="mb-16 space-y-2">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground">About</h2>
          <p className="leading-relaxed">
            Journaling our group's movie watches and our thoughts!
          </p>
        </section>

        <section className="mb-16 space-y-4">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground">The Crew</h2>
          <div className="flex flex-wrap gap-4">
            {people.map((person) => (
              <div key={person.name} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{person.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium tracking-wider text-muted-foreground">Movies</h2>
          <div className="relative space-y-4 pl-4">
            <div className="absolute left-0 top-0 h-full w-px bg-border" />
            
            {movies.map((movie) => {
              const isExpanded = expandedMovies.includes(movie.title)
              
              return (
                <div key={movie.title} className="group relative">
                  <div className="absolute -left-[1.3rem] top-[1.6rem] h-2.5 w-2.5 rounded-full border-2 border-background bg-border group-hover:bg-primary" />
                  
                  <div className="rounded-lg border transition-colors hover:bg-muted/50">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <Image
                            src={movie.image}
                            alt={movie.title}
                            width={80}
                            height={120}
                            className="rounded-md object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium leading-none">{movie.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              Picked by {movie.picker.split(' ')[0]}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{movie.date}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{movie.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-2 shrink-0">
                            {movie.contributors.map((contributor) => (
                              <Avatar key={contributor} className="h-6 w-6 border-2 border-background">
                                <AvatarImage 
                                  src={people.find(p => p.name === contributor)?.avatar} 
                                  alt={contributor} 
                                />
                                <AvatarFallback>{contributor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
                    </div>
                    
                    {isExpanded && (
                      <div className="border-t bg-muted/50 px-4 py-3">
                        <h4 className="mb-2 text-sm font-medium">Comments</h4>
                        <div className="space-y-3">
                          {movie.comments.map((comment, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage 
                                  src={people.find(p => p.name === comment.author)?.avatar} 
                                  alt={comment.author} 
                                />
                                <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{comment.author.split(' ')[0]}</p>
                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

