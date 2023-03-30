import React from "react"
import { useEffect, useState } from "react"

export default function UseReadingProgress(){
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if(scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    }

    window.addEventListener('scroll', updateScrollCompletion);

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion);
    }

  }, []);

  return (
    <span
      style={{ transform: `translateX(${completion - 100}%)` }}
      className="fixed bg-orange-500 h-1 w-full p-0 bottom-0 transition delay-120 ease-out"
    />
  )
}