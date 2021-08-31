import { useState, useEffect } from 'react';

/**
 * @param {Number} count
 * @param {Function} onClick
 */
export default function Counter({ count, onClick, style }) {
  return (
    <button className="" onClick={() => { onClick() }}>
      Counter: {count}
    </button>
  );
}
