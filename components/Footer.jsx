import SocialShareButtons from '../pages/Home/SocialShareButtons/SocialShareButtons';

export default function Footer() {

  const pageUrl = 'https://pomodoropilot.com';
  const pageTitle = 'Pomodoro Pilot';

  return (
    <div className="editor text-center text-[11px] leading-[15px] text-white/90 w-[300px] sm:w-auto sm:max-w-[250px] px-[10px]">
      <SocialShareButtons url={pageUrl} title={pageTitle} />
      Pomodoro Pilot from 
      <a href="https://garagedev.co/" rel="noopener noreferrer" target="_blank">
         Garage Dev
      </a>
      . Work, study and relax.{' '}
    </div>
  )
}
