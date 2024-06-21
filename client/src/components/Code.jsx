import React, {useEffect, useState} from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Code = ({ code }) => {
    const [currentCode, setCurrentCode] = useState(code);
  
    useEffect(() => {
      console.log("Code has changed:", code);
      setCurrentCode(code);
    }, [code]);
  
    return (
      <SyntaxHighlighter language="javascript" style={darcula}>
        {currentCode}
      </SyntaxHighlighter>
    );
  };
  

export default Code;
