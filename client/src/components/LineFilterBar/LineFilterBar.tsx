import React from 'react';
import { ILine } from 'shared/interfaces';
import './LineFilterBar.scss';

interface Props {
    lines: ILine[];
    selectedLine: string | null;
    onLineClick: (lineName: string) => void;
}

const LineFilterBar: React.FC<Props> = ({ lines, selectedLine, onLineClick }) => (
    <div className="filter-bar lines">
        <span className="filter-bar-label">בחר קו:</span>
        {lines.map((line) => (
            <span
                key={line.name}
                className={`filter-tag${selectedLine === line.name ? ' selected' : ''}`}
                onClick={() => onLineClick(line.name)}
            >
                {line.name}
            </span>
        ))}
    </div>
);

export default LineFilterBar;