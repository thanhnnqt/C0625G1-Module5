import React, { useState } from 'react'
import './App.css'

function App() {
    const list = React.createElement('ul', null,
        React.createElement('li', null, 'Hà Nội'),
        React.createElement('li', null, 'Đà Nẵng'),
        React.createElement('li', null, 'Hải Phòng'),
        React.createElement('li', null, 'TP Hồ Chí Minh'),
        React.createElement('li', null, 'Cần Thơ'));
  return (
    <>
        {list}
    </>
  )
}

export default App
