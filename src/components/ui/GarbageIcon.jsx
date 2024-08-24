import React from 'react';

const GarbageIcon = ({ size, color = "black" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" version="1.1" fill={color} stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
      <path d="m5.75 4.25v-2.5h4.5v2.5m-6.5 1v9h8.5v-9m-9.5-.5h10.5" />
    </svg>
  );
};

export default GarbageIcon;