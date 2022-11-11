import './Home.css'
import React, { useEffect, useState } from 'react';
// import Graphin, { Behaviors } from '@antv/graphin';
import data from './data.json';

// import pic from "../graph.png"

// const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

// const layout = {
//   type: 'graphin-force',
//   preset: {
//     type: 'concentric',
//   },
// };

const Home = () => {
  return (
    <>
    <div className='Content_home'>
      <div className='H1_home'> Home </div>
    </div>

    <div className='Content_home'>
      <div className='P_home'> Welcome to WCS project! </div>
    </div>
    {/* <img src={pic} width="100%"/> */}
    {/* <div className='Graph'>
      <Graphin data={data} layout={layout} theme={{ background: '#f9e8e5'}} height={600}>
        <ZoomCanvas enableOptimize />
        <DragNode />
        <ActivateRelations trigger="click" />
      </Graphin>
    </div> */}
    </>
  )
}

export default Home;