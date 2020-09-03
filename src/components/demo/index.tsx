//use demo 
// import * as Cesium from 'cesium';
import * as React from 'react';
import { BaseContainer } from '..';
import { ThreeRun } from '../../demos/demo';

export class DemoContainer extends React.Component {
  public _earth?: any;

  public componentDidMount() {
    const a = new ThreeRun();
    console.log(a, 'ThreeRun');
  }

  public render() {
    return (
      <BaseContainer />
    );
  }
}