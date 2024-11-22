import React, { useEffect } from 'react'

export default function useBeforeUnload(callback) {
    useEffect(() => {
        const handleBeforeunload = (e) => {
          e.preventDefault();
          callback && callback();
        };
        window.addEventListener("beforeunload", handleBeforeunload);
        return () => window.removeEventListener("beforeunload", handleBeforeunload);
      }, []);
}
