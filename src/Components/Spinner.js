import React from 'react';

const Spinner = () => {
  return (
    <div className="text-center" style={{ margin: '50px auto' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;