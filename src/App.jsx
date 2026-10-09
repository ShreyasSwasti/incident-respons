import { useState } from 'react';

const playbooks = {
  DDoS: {
    severity: 'Critical',
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

const severityRank = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
};

const responsePriorities = {
  Low: 'Routine Response',
  Medium: 'Elevated Response',
  High: 'Urgent Response',
  Critical: 'Immediate Response',
};

function calculateSeverity(baseSeverity, affectedSystems) {
  let scaleSeverity = 'Low';

  if (affectedSystems >= 100) {
    scaleSeverity = 'Critical';
  } else if (affectedSystems >= 20) {
    scaleSeverity = 'High';
  } else if (affectedSystems >= 5) {
    scaleSeverity = 'Medium';
  }

  return severityRank[baseSeverity] >= severityRank[scaleSeverity]
    ? baseSeverity
    : scaleSeverity;
}

function App() {
  const [incidentType, setIncidentType] = useState('DDoS');
  const [affectedSystems, setAffectedSystems] = useState('1');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');

  const playbook = playbooks[incidentType];
  const systemCount = Number(affectedSystems);

  const severity = calculateSeverity(
    playbook.severity,
    systemCount
  );

  const priority = responsePriorities[severity];

  const validInput =
    affectedSystems.trim() !== '' &&
    Number.isInteger(systemCount) &&
    systemCount >= 1 &&
    systemCount <= 100000;

  const totalSteps = playbook.steps.length;
  const completedCount = completedSteps.filter(Boolean).length;
  const progress = Math.round(
    (completedCount / totalSteps) * 100
  );

  const changeIncident = (newIncident) => {
    setIncidentType(newIncident);
    setCompletedSteps([]);
    setCopyMessage('');
  };

  const toggleStep = (index) => {
    setCompletedSteps((previous) =>
      previous.map((done, stepIndex) =>
        stepIndex === index ? !done : done
      )
    );
    setCopyMessage('');
  };

  const resetChecklist = () => {
    setCompletedSteps([]);
    setCopyMessage('Checklist has been reset.');
  };

  const copyPlaybook = async () => {
    if (!validInput) {
      setCopyMessage(
        'Enter a whole number between 1 and 100000.'
      );
      return;
    }

    const text = `
Incident: ${incidentType}
Severity: ${severity}
Response Priority: ${priority}
Affected Systems: ${systemCount}
Progress: ${completedCount}/${totalSteps} steps completed (${progress}%)

Description:
${playbook.description}

Response Checklist:
${playbook.steps
  .map(
    (step, index) =>
      `${completedSteps[index] ? '[x]' : '[ ]'} ${index + 1}. ${step}`
  )
  .join('\n')}
`;

    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage('Playbook copied successfully!');
    } catch {
      setCopyMessage(
        'Unable to copy. Check browser clipboard permissions.'
      );
    }
  };

  return (
    <main className="app">
      <section className="card">
        <p className="eyebrow">SECURITY OPERATIONS</p>

        <h1>Incident Response Playbook Generator</h1>

        <p className="description">
          Generate response workflows, assess severity, and
          track incident response progress.
        </p>

        <label htmlFor="incident-type">Incident Type</label>

        <select
          id="incident-type"
          value={incidentType}
          onChange={(event) => changeIncident(event.target.value)}
        >
          {incidentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="affected-systems">
          Number of Affected Systems
        </label>

        <input
          id="affected-systems"
          type="number"
          min="1"
          max="100000"
          step="1"
          value={affectedSystems}
          onChange={(event) => {
            setAffectedSystems(event.target.value);
            setCopyMessage('');
          }}
          placeholder="Enter affected system count"
        />

        {!validInput && (
          <p className="validation-message" role="alert">
            Enter a whole number from 1 to 100000.
          </p>
        )}

        <div className="selected">
          <span>Selected Incident</span>
          <strong>{incidentType}</strong>
        </div>

        <div className="playbook">
          <div className="playbook-header">
            <div>
              <span>Calculated Severity</span>
              <strong className={`severity severity-${severity.toLowerCase()}`}>
                {severity}
              </strong>
            </div>

            <div>
              <span>Response Priority</span>
              <strong>{priority}</strong>
            </div>
          </div>

          <p className="impact-summary">
            {validInput
              ? `${systemCount} system(s) affected. ${
                  severity === playbook.severity
                    ? 'The incident retains its baseline severity.'
                    : `Severity has been escalated from ${playbook.severity} based on the affected system count.`
                }`
              : 'Enter a valid system count to assess the incident.'}
          </p>

          <p>{playbook.description}</p>

          <div className="checklist-header">
            <h2>Response Checklist</h2>
            <span>{completedCount}/{totalSteps} completed</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Response checklist progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="progress-label">
            {progress}% complete
          </p>

          <div className="checklist">
            {playbook.steps.map((step, index) => (
              <label
                className={`checklist-item ${
                  completedSteps[index] ? 'step-complete' : ''
                }`}
                key={step}
              >
                <input
                  type="checkbox"
                  checked={Boolean(completedSteps[index])}
                  onChange={() => toggleStep(index)}
                />
                <span className="step-number">
                  {index + 1}.
                </span>
                <span className="step-text">{step}</span>
              </label>
            ))}
          </div>

          {completedCount === totalSteps && (
            <p className="completion-message" role="status">
              All response steps have been marked complete.
            </p>
          )}

          <div className="action-buttons">
            <button onClick={copyPlaybook} disabled={!validInput}>
              Copy Playbook
            </button>

            <button
              className="reset-button"
              onClick={resetChecklist}
              disabled={completedCount === 0}
            >
              Reset Checklist
            </button>
          </div>

          {copyMessage && (
            <p className="copy-message" role="status">
              {copyMessage}
            </p>
          )}

          <p className="disclaimer">
            Severity estimates use predefined rules. Verify
            incident severity and response actions against
            organizational policies and actual business impact.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;