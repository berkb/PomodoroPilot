import { useEffect } from 'react';
import { useSnapshot, proxy } from 'valtio';
import { useMediaSession, useMediaMeta } from '@/hooks/useMediaSession';

const CHANNELS = [
  { name: 'Chillhop', streamUrl: 'https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de/' },
  //{ name: 'Lo-Fi', streamUrl: 'https://ss-edge.joeycast.com/lofi.mp3' },
  { name: 'Yoga Sounds', streamUrl: 'https://streams.fluxfm.de/yogasounds/mp3-128/streams.fluxfm.de/' },
  { name: 'Chillout', streamUrl: 'https://streams.fluxfm.de/chillout/mp3-128/streams.fluxfm.de/' },
  { name: 'Acid Jazz', streamUrl: 'https://streams.fluxfm.de/Acidjazz/mp3-128/streams.fluxfm.de/' },
  { name: 'Electronic Improvisation', streamUrl: 'https://streams.fluxfm.de/elecimp/mp3-128/streams.fluxfm.de/' },
  { name: 'Indie Disco', streamUrl: 'https://streams.fluxfm.de/indiedisco/mp3-320/streams.fluxfm.de/' },
];

let audio;
let currentChannelIndex = 0;

const state = proxy({
  canplay: false,
  playing: false,
  volume: 50,
  currentChannel: CHANNELS[currentChannelIndex],
  setVolume(value) {
    audio.volume = value / 100;
    state.volume = value;
  },
  async play() {
    try {
      await audio.play();
      state.playing = true;
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  },
  pause() {
    audio.pause();
    state.playing = false;
  },
  nextChannel() {
    currentChannelIndex = (currentChannelIndex + 1) % CHANNELS.length;
    state.currentChannel = CHANNELS[currentChannelIndex];
    audio.src = state.currentChannel.streamUrl;

    if (state.playing) {
      state.play();
    }
  },
  prevChannel() {
    currentChannelIndex = (currentChannelIndex - 1 + CHANNELS.length) % CHANNELS.length;
    state.currentChannel = CHANNELS[currentChannelIndex];
    audio.src = state.currentChannel.streamUrl;

    if (state.playing) {
      state.play();
    }
  }
});

const initPlayer = () => {
  useMediaMeta({
    title: 'Lo-Fi, Chillhop, ChillJazz, Sleep Music, Work Music etc.',
    artist: 'LoFi Radio by BoxRadio',
    artwork: [
      { src: '/mediasession/96.png', sizes: '96x96', type: 'image/png' },
      { src: '/mediasession/128.png', sizes: '128x128', type: 'image/png' },
      { src: '/mediasession/192.png', sizes: '192x192', type: 'image/png' },
      { src: '/mediasession/256.png', sizes: '256x256', type: 'image/png' },
      { src: '/mediasession/384.png', sizes: '384x384', type: 'image/png' },
      { src: '/mediasession/512.png', sizes: '512x512', type: 'image/png' }
    ]
  });

  useMediaSession({
    onPlay() {
      state.play();
    },
    onPause() {
      state.pause();
    },
    onStop() {
      state.pause();
    }
  });

  const onLoadedMetadata = () => {
    state.canplay = true;
  };

  const onError = (error) => {
    console.error('Audio error:', error);
    // Daha fazla hata bilgisi için aşağıdaki satırı ekleyebilirsin.
    console.error('Detailed error:', audio.error);
  };

  useEffect(() => {
    audio = new Audio(state.currentChannel.streamUrl);
    audio.volume = state.volume / 100;

    audio.addEventListener('error', onError);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      state.pause();

      audio.removeEventListener('error', onError);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [state.currentChannel, state.volume]);
};

const usePlayer = () => {
  return useSnapshot(state);
};

export { initPlayer };

export default usePlayer;
