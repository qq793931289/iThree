

import React from 'react';
import { ThreeRun } from './init';
import { BaseContainer } from '../components/ui/base';

export class ThreeContainer extends React.Component {

  // constructor() {
  //   super();
  // }

  public componentDidMount() {
    const demo = new ThreeRun();
    demo.componentDidMount()
    // console.log(a, 'ThreeRun');
  }

  public render() {
    return (
      <BaseContainer />
    );
  }

}