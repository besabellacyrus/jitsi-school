import React from 'react';
// import { Circle } from './Circle';

import { getWidthForSeats, getDistanceRatioForSeats } from '../utils';

export const PageSession = ({ track, index, length }) => {
  const seatSize = getWidthForSeats(length);
  const disanceRatio = getDistanceRatioForSeats(length);
  const angle = (360 / length) * index;
  const horizontal = Math.cos((angle * 2 * Math.PI) / 360) * disanceRatio;
  const vertical = Math.sin((angle * 2 * Math.PI) / 360) * disanceRatio;

  // return (<Circle size={seatSize} horizontal={horizontal} vertical={vertical}>
  //   <video height={seatSize} style={{ flexShrink: 0 }} autoPlay='1' key={`track_${track.getId()}`} ref={(ref) => ref && track.attach(ref)} />
  // </Circle>);
  return (
    <video
      style={{ height: '100%', width: '100%' }}
      autoPlay="1"
      key={`track_${track.getId()}`}
      ref={(ref) => ref && track.attach(ref)}
    />
  );
};
