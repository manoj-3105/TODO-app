import React from 'react';

function New() {
  const message = "Hello, React!";
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{message}</h1>
      <p>This is a basic React application.</p>
      <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Click me
      </button>
    </div>
  );
}

export default New ;