import React from 'react';

const FindingsPanel = () => {
  const findings = [
    { type: 'Angled Cells', count: 222, percentage: '67%' },
    { type: 'Burr Cells', count: 87, percentage: '34%' }
  ];

  return (
    <div className="findings-panel">
      <h3 className="text-lg font-semibold">Findings</h3>
      <table className="w-full mt-2 border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Type</th>
            <th className="border p-2">Count</th>
            <th className="border p-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.type}</td>
              <td className="border p-2">{item.count}</td>
              <td className="border p-2">{item.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FindingsPanel;
