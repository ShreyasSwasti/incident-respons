import { useState } from 'react';

const incidentTypes = [
  'DDoS',
  'Malware',
  'Phishing',
  'Ransomware',
  'Insider Threat',
];

function App() {
  const [incidentType, setIncidentType] = useState('DDoS');

  return (
    <main className="app">
      <section className="card">
        <p className="eyebrow">SECURITY OPERATIONS</p>

        <h1>Incident Response Playbook Generator</h1>

        <p className="description">
          Select an incident type to prepare an appropriate response workflow.
        </p>

        <label htmlFor="incident-type">Incident Type</label>

        <select
          id="incident-type"
          value={incidentType}
          onChange={(event) => setIncidentType(event.target.value)}
        >
          {incidentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="selected">
          <span>Selected incident</span>
          <strong>{incidentType}</strong>
        </div>
      </section>
    </main>
  );
}

export default App;