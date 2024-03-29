import Head from 'next/head'

import Background from '@/components/Background'

import { initPlayer } from '@/hooks/usePlayer'
import Player from '@/components/Player'
import WelcomeMessage from './Home/WelcomeMessage/WelcomeMessage';
import KeyFeatures from './Home/KeyFeatures/KeyFeatures';
import PomodoroTimer from './Home/PomodoroTimer/PomodoroTimer';

import Footer from '@/components/Footer';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

// import required modules
import { EffectCards, Navigation } from 'swiper/modules';

export default function Home() {
  initPlayer()

  return (
    <>
      <Head>
        <title>Pomodoro Pilot: Boost Productivity with Effective Time Management </title>
        <meta name="description" content="Enhance productivity with Pomodoro Pilot's customizable sessions, task management, and real-time tracking for work, study, and relaxation." />
        <meta name="keywords" content="Pomodoro, productivity, time management, study, work, relaxation, task management" />
        <meta name="author" content="Berk Belcioglu - GarageDev" />
      </Head>
      
      <Background />
      
      <div className="absolute top-[15px] sm:top-[25px] left-[50%] -translate-x-[50%]">
        <div className="navigation-container">
          <div className="content-container">
          <Swiper
            effect={'flip'}
            grabCursor={true}
            navigation={true}
            loop={true}
            modules={[EffectCards, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <PomodoroTimer />
              <Player />
            </SwiperSlide>
            <SwiperSlide>
              <WelcomeMessage />
              <KeyFeatures />
            </SwiperSlide>
          </Swiper>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[15px] sm:bottom-[25px] left-[50%] -translate-x-[50%]">
        <Footer />
      </div>
    </>
  )
}
