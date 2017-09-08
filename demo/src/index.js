import React from 'react'
import {render} from 'react-dom'
import   "../../node_modules/react-select-plus/dist/react-select-plus.css";
import   "../../src/styles.css";
import Component from '../../src'

let Demo = React.createClass({
  render() {
    return <div>
      <h1>react-fuse-filter Demo</h1>
      <Component/>
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
