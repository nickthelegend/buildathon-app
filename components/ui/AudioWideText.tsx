// app/components/AudiowideText.tsx
import React from 'react';

interface AudiowideTextProps {
    text: string; // Define the text prop as a string
}

const AudiowideText: React.FC<AudiowideTextProps> = ({ text }) => {
    return (
        <div style={{ fontFamily: 'Audiowide, sans-serif', fontSize: '32px' }}>
            {text}
        </div>
    );
};

export default AudiowideText;
