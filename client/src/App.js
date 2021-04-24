import './App.css';
import Header from '../src/Components/Nav';
import Carousel from '../src/Components/Carousel';
import Hero from './Components/Hero';

function App() {
  return (
    <div>

     {/*  <div>
        <Hero />
      </div> */}

<div class="container2"> 
<Carousel />

</div>

      <div>
      <Hero />
      </div>

      <div>
      <Header />
      </div>


    </div>
    
  );
}

export default App;
