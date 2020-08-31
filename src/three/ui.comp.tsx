

import React from 'react';
import { ThreeRun } from './init';
import { BaseContainer } from '../components/ui/base';

export class ThreeContainer extends React.Component {

  // constructor() {
  //   super();
  // }

  public componentDidMount() {
    new ThreeRun();
  }

  public render() {
    return (
      <BaseContainer />
    );
  }

}