import * as React from 'react';
import { DigitalEarthComponent } from '.';
// import './style';

function CesiumSample() {
  return (
    <DigitalEarthComponent />
  );
}

export default {
  order: 1,
  comp: CesiumSample,
};