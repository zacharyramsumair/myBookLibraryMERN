declare module 'express-async-errors' {
    import express from 'express';
  
    function wrap(fn: express.Handler): express.Handler;
  
    export default function (app: express.Application): void;
    export { wrap };
  }
  