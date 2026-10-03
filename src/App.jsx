import { useState } from 'react';

const playbooks = {
  DDoS: {
    severity: 'Critical',
    priority: 'Immediate Response',
    description:
      'Distributed traffic is overwhelming an application or network service.',
    steps: [
      'Confirm the traffic spike and identify the affected service.',
      'Check source IPs, request patterns, and traffic volume.',
      'Apply rate limiting or filtering rules.',
      'Enable upstream DDoS protection or contact the hosting provider.',
      'Monitor traffic until normal service is restored.',
    ],
  },

  Malware: {
    severity: 'High',
    priority: 'Urgent Response',
    description:
      'Malicious software has been detected on a system or endpoint.',
    steps: [
      'Isolate the affected device from the network.',
      'Identify the malware and affected files or processes.',
      'Collect relevant logs and forensic evidence.',
      'Remove the malware using approved security tools.',
      'Monitor the system for signs of reinfection.',
    ],
  },

  Phishing: {
    severity: 'High',
    priority: 'Urgent Response',
    description:
      'A suspicious message or link may be attempting to steal credentials or information.',
    steps: [
      'Identify the phishing message and affected users.',
      'Block the malicious sender, domain, or URL.',
      'Reset credentials if an account may have been compromised.',
      'Check authentication and access logs for suspicious activity.',
      'Report the phishing indicators to the security team.',
    ],
  },

  Ransomware: {
    severity: 'Critical',
    priority: 'Immediate Response',
    description:
      'Systems or files may have been encrypted or compromised by ransomware.',
    steps: [
      'Immediately isolate affected systems from the network.',
      'Identify the scope of affected devices and files.',
      'Preserve logs and other forensic evidence.',
      'Check available backups for recovery options.',
      'Restore systems only after the environment is confirmed safe.',
    ],
  },

  'Insider Threat': {
    severity: 'High',
    priority: 'Urgent Response',
    description:
      'Suspicious activity may originate from an authorized user or internal account.',
    steps: [
      'Identify the account and suspicious activity.',
      'Review authentication, access, and system logs.',
      'Restrict access where necessary.',
      'Preserve evidence for investigation.',
      'Escalate the incident according to organizational policy.',
    ],
  },
};

const incidentTypes = Object.keys(playbooks);

function App() {
  const [incidentType, setIncidentType] = useState('DDoS');

  const playbook = playbooks[incidentType];

  const copyPlaybook = async () => {
    const text = `
Incident: ${incidentType}
Severity: ${playbook.severity}
Response Priority: ${playbook.priority}

Description:
${playbook.description}

Response Steps:
${playbook.steps
  .map((step, index) => `${index + 1}. ${step}`)
  .join('\n')}
`;

    try {
      await navigator.clipboard.writeText(text);
      alert('Playbook copied to clipboard!');
    } catch (error) {
      alert('Unable to copy the playbook.');
    }
  };

  return (
    <main className="app">
      <section className="card">
        <p className="eyebrow">SECURITY OPERATIONS</p>

        <h1>Incident Response Playbook Generator</h1>

        <p className="description">
          Select an incident type to generate a response workflow.
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
          <span>Incident</span>
          <strong>{incidentType}</strong>
        </div>

        <div className="playbook">
          <div className="playbook-header">
            <div>
              <span>Severity</span>
              <strong>{playbook.severity}</strong>
            </div>

            <div>
              <span>Response Priority</span>
              <strong>{playbook.priority}</strong>
            </div>
          </div>

          <p>{playbook.description}</p>

          <button onClick={copyPlaybook}>
            Copy Playbook
          </button>

          <h2>Response Steps</h2>

          <ol>
            {playbook.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

export default App;