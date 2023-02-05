import './App.css';
import Canvas from './Components/Canvas';

import React from "react";
import ReactCanvasPaint from 'react-canvas-paint'
import 'react-canvas-paint/dist/index.css'

// const { createCanvas } = require('canvas');

// const width = 1200;
// const height = 600;

// const canvas = createCanvas(width, height);
// const context = canvas.getContext('2d');

// context.fillStyle = '#fff';
// context.fillReact(0, 0, width, height)


// import React from "react";
// import ReactCanvasPaint from 'react-canvas-paint'
// import 'react-canvas-paint/dist/index.css'

// export default function DrawingCanvasGfg(){
// return (
// 	<div>
// 	<h1>ReactJs Drawing Canvas - GeeksforGeeks</h1>
// 	<ReactCanvasPaint />
// 	</div>
// );
// };


function App() {
  return (<>
    <h1>Drawing App</h1>
    <div className="App">

      <Canvas
        width={700}
        height={500}
      />

    </div>
    </>
  );

}

export default App;
