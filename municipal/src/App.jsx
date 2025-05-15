import Header from './components/users/header'; // or correct path
import Hero from './components/users/hero';
import JobPositions from './components/users/jobPositions';
import Footer from './components/users/footer';

import Flag from "./assets/SouthAfricaFlag.png";



function App() {
  return (
    <div>
      <Header />
      <Hero />
      <JobPositions />
      <Footer />
      {/* Other components */}
    </div>
  );
}

export default App;
