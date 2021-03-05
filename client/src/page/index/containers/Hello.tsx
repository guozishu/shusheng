import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, useDispatch } from 'react-redux';
// import { Dispatch } from 'redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel:1,
    name: 'TypeScript',
  };
}

// {
//     enthusiasmLevel: 1,
//     languageName: 'TypeScript',
//   }

export function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);



// import React from 'react';

// import './Hello.css';

// function Hello() {
//   return (
//     <div className="App">
//       <header className="App-header">
      
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default Hello;
