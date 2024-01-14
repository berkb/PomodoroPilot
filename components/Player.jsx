import { RiPlayMiniFill, RiPauseMiniFill, RiSkipForwardFill, RiSkipBackFill } from 'react-icons/ri';
import usePlayer from '@/hooks/usePlayer';

const Button = ({ className, children, href, ...props }) => {
  let classNames = [
    'text-white h-[50px] bg-white/5 rounded-[13px] w-[50px] inline-flex justify-center items-center hover:ring-2 hover:ring-white/10 hover:ring-inset active:scale-95 transition',
    className
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  if (href) {
    return (
      <a className={classNames} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

const PlayButton = () => {
  const { playing, canplay, play, pause, currentChannel } = usePlayer();

  return (
    <Button
      onClick={playing ? pause : play}
      className={!canplay && '!text-white/30 pointer-events-none'}
      aria-label="Toggle"
    >
      {playing ? (
        <RiPauseMiniFill fontSize={40} />
      ) : (
        <RiPlayMiniFill fontSize={40} />
      )}
    </Button>
  );
};

const SkipForwardButton = () => {
  const { nextChannel } = usePlayer();

  return (
    <Button onClick={nextChannel} aria-label="Skip Forward">
      <RiSkipForwardFill fontSize={40} />
    </Button>
  );
};

const SkipBackButton = () => {
  const { prevChannel } = usePlayer();

  return (
    <Button onClick={prevChannel} aria-label="Skip Back">
      <RiSkipBackFill fontSize={40} />
    </Button>
  );
};

export default function Player() {
  const { currentChannel, setVolume, volume } = usePlayer();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="select-none bg-black/20 backdrop-blur-md px-[5px] py-[5px] mb-[25px] sm:mb-0 rounded-[17px]">
        <div className="flex flex-col items-center justify-center">
          <div className="my-4 text-white">{currentChannel && currentChannel.name}</div>
          {/* Volume Control */}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value, 10))}
            className="w-full h-5"
          />
          <div className="flex space-x-[5px]">
            <SkipBackButton />
            <PlayButton />
            <SkipForwardButton />
          </div>
        </div>
      </div>
    </div>
  );
}
