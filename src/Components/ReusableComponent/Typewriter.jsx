// Typewriter.jsx
import React, { useState, useEffect } from "react";

const Typewriter = ({ texts }) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const text = texts[index];
    if (currentText.length < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(text.slice(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText("");
        setIndex((prev) => (prev + 1) % texts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentText, index, texts]);

  return <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{currentText}</h1>;
};

export default Typewriter;
