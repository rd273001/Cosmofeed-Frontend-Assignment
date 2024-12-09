import React from 'react';

interface HighlightTextProps {
  wholeText: string;
  highlightText: string;
}

// HighlightText Component to highlight matching parts of text
const HighlightText: React.FC<HighlightTextProps> = ( { wholeText, highlightText } ) => {
  if ( !highlightText ) return <span>{ wholeText }</span>; // If no search term, return text as is

  // Split the text by the search term, making it case-insensitive
  const parts = wholeText.split( new RegExp( `(${highlightText})`, 'gi' ) );

  return (
    <>
      { parts.map( ( part, index ) =>
        part.toLowerCase() === highlightText.toLowerCase() ? (
          <span key={ index } className='bg-yellow-300 font-bold'>{ part }</span> // Highlighted part
        ) : (
          part // Non-highlighted part
        )
      ) }
    </>
  );
};

export default HighlightText;