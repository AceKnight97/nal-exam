/* eslint-disable consistent-return */
import { useEffect } from 'react';

import emitter from '../eventEmitter';

export default function useEmitter(key, callback, deps) {
  useEffect(() => {
    if (!(key && callback)) return;
    const listener = emitter.addListener(key, callback);
    return () => listener.remove();
  }, [key, ...deps]);

  return emitter;
}
