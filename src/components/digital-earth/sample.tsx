import * as React from 'react';
import { DigitalEarthComponent } from '.';
// import './style';

function CesiumSample() {
  return (
    <DigitalEarthComponent />
  );
}

export default {
  order: 5,
  comp: CesiumSample,
};