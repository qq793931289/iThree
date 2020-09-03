

import React from 'react';
import { Core } from './init';
import { BaseContainer } from '../components/ui/base';

export class ThreeContainer extends React.Component {

  // constructor() {
  //   super();
  // }

  public componentDidMount() {
    const a = new Core();
    console.log(a, 'Core');
  }

  public render() {
    return (
      <BaseContainer />
    );
  }

}