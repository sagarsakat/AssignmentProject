import React, { useState } from 'react';

const TextColumn = () => {
  const [tables, setTables] = useState([
    { rows: ['Row 1', 'Row 2', 'Row 3'] } // Initial table with rows
  ]);

  const handleTextChange = (tableIndex, rowIndex, newText) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex] = newText;
    setTables(updatedTables);
  };

  const addTable = () => {
    const newTable = { rows: ['New Row','New Row','New Row'] };
    setTables([...tables, newTable]);
  };

  return (
    <div style={{backgroundColor: 'pink', minHeight: '100vh' , display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
        {tables.map((table, tableIndex) => (
          <div
            key={tableIndex}
            style={{
              width: '200px',
              border: '1px solid #ccc',
              padding: '10px',
              marginRight: '20px',
              backgroundColor: '#f0f0f0' // Background color
            }}
          >
            <h2>Text Column {tableIndex + 1}</h2>
            {table.rows.map((text, rowIndex) => (
              <div key={rowIndex} style={{ marginBottom: '8px' }}>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => handleTextChange(tableIndex, rowIndex, e.target.value)}
                  style={{ width: '100%', padding: '4px' }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={addTable}>Add Table</button>
    </div>
  );
};

export default TextColumn;

