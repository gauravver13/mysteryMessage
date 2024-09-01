'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

function Home() {
  return (
    <>
    <main className='flex-grow flex flex-col items-center justify-center '>
        <section className='text-center mb-8 mb:mb-12'>
          <h1 className='text-3xl md:text-5xl font-bold'>Dive into the world of anonymous conversation</h1>
          <p className='mt-3 md:mt-4 text-base md:text-lg'>Explore mystery Message - Where your identity remains a secret.</p>
        </section>
        <Carousel 
        plugins={[Autoplay({delay: 2000})]}
        className="w-full max-w-xs">
      <CarouselContent>
        {
        messages.map((message, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>
                  {message.title}
                </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lg font-semibold">{message.content}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel> 
    </main>
    </>
  )
}

export default Home