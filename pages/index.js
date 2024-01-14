import Head from 'next/head'
import Navigation from '@/components/Navigation';

import Background from '@/components/Background'
import Player from '@/components/Player'

import WelcomeMessage from './Home/WelcomeMessage/WelcomeMessage';
import KeyFeatures from './Home/KeyFeatures/KeyFeatures';
import PomodoroTimer from './Home/PomodoroTimer/PomodoroTimer';

import Footer from '@/components/Footer';

import { initPlayer } from '@/hooks/usePlayer'

export default function Home() {
  initPlayer()

  const tabs = [
    {
      label: 'Pomodoro Pilot',
      content: <div>
                <PomodoroTimer />
                <Player />
              </div>,
    },
    {
      label: 'Features',
      content: <div>
                <WelcomeMessage />
                <KeyFeatures />
              </div>,
    }
  ];

  return (
    <>
      <Head>
        <title>Plofier</title>
        <meta
          name="description"
          content="Work, study and relax with simple web app for background music"
        />
      </Head>

      
      <Background />
      
      <div className="absolute top-[15px] sm:top-[25px] left-[50%] -translate-x-[50%]">
        <Navigation tabs={tabs} />
      </div>
      <div className="absolute bottom-[15px] sm:bottom-[25px] left-[50%] -translate-x-[50%]">
        <Footer />
      </div>
    </>
  )
}
