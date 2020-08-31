

import React from 'react';
import { Config } from '../../config';

export class BaseContainer extends React.Component {

  // constructor() {
  //   super();
  // }

  public componentDidMount() {

  }

  public render() {
    const style = { width: '100%', height: '100vh' };
    return (
      <div id={Config.containerId} style={style} >
        {/* 浏览器不兼容! */}
      </div>
    );
  }

}