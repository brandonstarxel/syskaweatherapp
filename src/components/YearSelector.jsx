import React from 'react'
import Form from 'react-bootstrap/Form';

function YearSelector(props) {
    const generateYears = () => {
        const currentYear = 2022;
        const startYear = 1960;
        const years = [];
        for (let year = currentYear; year >= startYear; year--) {
            years.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }
        return years;
    };

    return (
        <Form.Select aria-label="Default select example" defaultValue={props.defaultValue || undefined} onChange={(event) => {props.onChange(event.target.value)}}>
            {generateYears()}
        </Form.Select>
    )
}

export default YearSelector;