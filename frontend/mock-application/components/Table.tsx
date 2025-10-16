'use client';
import React from "react";

type TableProps = {
    header: string[];
    headerStyle?: React.CSSProperties;
    rows: any[];
    rowStyle?: React.CSSProperties;
}

const Table: React.FC<TableProps> = ({ header, headerStyle, rows, rowStyle }) => {
    return (
        <>
            <table style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <thead style={headerStyle}>
                    <tr>
                        {header.map((item) => (
                            <th key={item} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #9ca3af' }}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(([k, v]) => (
                        <tr key={k} style={rowStyle}>
                            <td style={{ padding: 12, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>{k}</td>
                            <td style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>
                                {typeof v === 'string' ? v : JSON.stringify(v)}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table;