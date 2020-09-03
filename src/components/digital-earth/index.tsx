//use demo 
// import * as Cesium from 'cesium';
import * as React from 'react';
import { BaseContainer } from '..';
import { DigitalEarth } from '../../demos/digital-earth';

export class DigitalEarthComponent extends React.Component {
  public _earth?: any;

  public componentDidMount() {
    const a = new DigitalEarth();
    console.log(a, 'ThreeRun');
  }

  public render() {
    return (
      <BaseContainer />
    );
  }
}