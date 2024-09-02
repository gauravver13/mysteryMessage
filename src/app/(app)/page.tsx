'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import messages from "@/messages.json";

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'



import React from 'react'
import { Mail } from "lucide-react";

function Home() {
  console.log('Hello world');
  
  return (
    <>
    <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white'>
        <section className='text-center mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-5xl font-bold'>Dive into the world of anonymous conversation</h1>
          <p className='mt-3 md:mt-4 text-base md:text-lg'>Explore mystery Message - Where your identity remains a secret.</p>
        </section>
        <Carousel 
        plugins={[Autoplay({delay: 2000})]}
        className="w-full max-w-lg  md:max-w-xl">
        <CarouselContent>
        {
        messages.map((message, index) => (
          <CarouselItem key={index}>
              <Card>
                <CardHeader className="">
                  <CardTitle>{message.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                <Mail className="flex-shrink-0 mt-2" />
                <div>
                <p className="text-lg font-semibold">{message.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                        {message.received}
                  </p>
                </div>
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-red-400" />
      <CarouselNext className="text-red-400" />
    </Carousel> 
    </main>
    {/* footer  */}
    <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2023 True Feedback. All rights reserved.
      </footer>
    </>
  )
}

export default Home