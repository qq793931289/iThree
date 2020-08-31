import * as React from 'react';
import ReactDom from 'react-dom';

export class Main extends React.Component {

  // constructor() {

  // }

  public render() {
    return (
      <div>
        Main
      </div>
    )
  }
}

// function App() {
//   return (
//     <div>

//     </div>
//   )
// }

ReactDom.render(
  <Main />
  , document.getElementById('root'));


document.oncontextmenu = function () { return false };
document.onselectstart = function () { return false };

const HelloWorld = () => {
  console.log('Hello aicgz!')
}

export { HelloWorld };