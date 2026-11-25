import { MotionConfig } from 'framer-motion';
import { PetalCanvas } from './components/PetalCanvas';
import { MusicButton } from './components/MusicButton';
import { PrajapatiButterfly } from './components/ArtisanalMotifs';
import { FootprintsRail } from './components/FootprintsRail';
import { Scene01Opening } from './scenes/Scene01Opening';
import { Scene02Bride } from './scenes/Scene02Bride';
import { Scene03Groom } from './scenes/Scene03Groom';
import { Scene04Story } from './scenes/Scene04Story';
import { Scene05Families } from './scenes/Scene05Families';
import { Scene06EventsScroll } from './scenes/Scene06EventsScroll';
import { Scene07Letter } from './scenes/Scene07Letter';
import { Scene08Schedule } from './scenes/Scene08Schedule';
import { Scene09Finale } from './scenes/Scene09Finale';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MusicButton />
      <FootprintsRail />
      <PetalCanvas />
      <PrajapatiButterfly />
      <div className="paper-grain" aria-hidden="true" />
      <main>
        <Scene01Opening />
        <Scene02Bride />
        <Scene03Groom />
        <Scene04Story />
        <Scene05Families />
        <Scene06EventsScroll />
        <Scene07Letter />
        <Scene08Schedule />
        <Scene09Finale />
      </main>
    </MotionConfig>
  );
}

export default App;
