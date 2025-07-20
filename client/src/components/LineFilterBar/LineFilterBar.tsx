import React from 'react';
import { ILine } from 'shared/interfaces';
import './LineFilterBar.scss';

interface Props {
    lines: ILine[];
    selectedLine: string | null;
    onLineClick: (lineName: string | null) => void;
}

const LineFilterBar: React.FC<Props> = ({ lines, selectedLine, onLineClick }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onLineClick(value === '' ? null : value);
    };

    return (
        <div className="line-filter-bar">
            <label htmlFor="line-select" className="filter-bar-label">
                בחר קו:
            </label>
            <select id="line-select" value={selectedLine || ''} onChange={handleSelectChange} className="line-dropdown">
                <option value="">כל הקווים</option>
                {lines.map((line) => (
                    <option key={line.name} value={line.name}>
                        {line.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LineFilterBar;
