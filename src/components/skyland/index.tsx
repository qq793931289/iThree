//use demo 
// import * as Cesium from 'cesium';
import * as React from 'react';
import { BaseContainer } from '..';
import { Skyland } from '../../demos/skyland';

export class SkylandComponent extends React.Component {
  public _earth?: any;

  public componentDidMount() {
    const a = new Skyland();
    console.log(a, 'ThreeRun');
  }

  public render() {
    return (
      <BaseContainer />
    );
  }
}