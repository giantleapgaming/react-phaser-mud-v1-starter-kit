import { useEffect, useState, useRef } from "react";
import { toast } from 'sonner'

export const usePromiseValue = <T>(promise: Promise<T> | null) => {
  const promiseRef = useRef<typeof promise>(promise);
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    if (!promise) return;
    let isMounted = true;
    promiseRef.current = promise;
    promise.then((resolvedValue) => {
      if (!isMounted) return;
      if (promiseRef.current !== promise) return;
      setValue(resolvedValue);
    }).catch((error) => {
      toast.error(error.message)
    });
    return () => {
      isMounted = false;
    };
  }, [promise]);
  return value;
};
