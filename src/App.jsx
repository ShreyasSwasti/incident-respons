
import { useEffect, useState } from 'react';

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

// Explain why an incident received its calculated severity
function getSeverityExplanation(baseSeverity, affectedSystems) {
  const calculatedSeverity = calculateSeverity(
    baseSeverity,
    affectedSystems
  );

  if (calculatedSeverity === baseSeverity) {
    return `The incident retains its baseline severity of ${baseSeverity}. The affected system count does not require a higher severity level.`;
  }

  return `The baseline severity was ${baseSeverity}, but it increased to ${calculatedSeverity} because ${affectedSystems} systems are affected.`;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
}

function App() {
  const [incidentType, setIncidentType] = useState('DDoS');
  const [affectedSystems, setAffectedSystems] = useState('1');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');

  // Incident timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const incidentTypes = Object.keys(playbooks);
  const playbook = playbooks[incidentType];

  const systemCount = Number(affectedSystems);

  const validInput =
    affectedSystems.trim() !== '' &&
    Number.isInteger(systemCount) &&
    systemCount >= 1 &&
    systemCount <= 100000;

  const severity = validInput
    ? calculateSeverity(playbook.severity, systemCount)
    : playbook.severity;

  const severityExplanation = validInput
    ? getSeverityExplanation(playbook.severity, systemCount)
    : 'Enter a valid number of affected systems to calculate severity.';

  const priority = responsePriorities[severity];

  const totalSteps = playbook.steps.length;
  const completedCount = completedSteps.filter(Boolean).length;

  const progress = Math.round(
    (completedCount / totalSteps) * 100
  );

  // Reset timer
  const resetTimer = () => {
    setTimerRunning(false);
    setElapsedSeconds(0);
  };

  // Change incident type
  const changeIncident = (newIncident) => {
    setIncidentType(newIncident);
    setCompletedSteps([]);
    setCopyMessage('');
    resetTimer();
  };

  // Toggle checklist
  const toggleStep = (index) => {
    setCompletedSteps((previous) => {
      const updated = [...previous];
      updated[index] = !updated[index];
      return updated;
    });

    setCopyMessage('');
  };

  // Reset checklist
  const resetChecklist = () => {
    setCompletedSteps([]);
    setCopyMessage('Checklist has been reset.');
  };

  // Copy playbook
  const copyPlaybook = async () => {
    if (!validInput) {
      setCopyMessage('Enter a valid system count.');
      return;
    }

    const text = `
Incident: ${incidentType}
Severity: ${severity}
Response Priority: ${priority}
Affected Systems: ${systemCount}
Severity Explanation: ${severityExplanation}
Incident Response Time: ${formatTime(elapsedSeconds)}

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
            Enter a whole number between 1 and 100000.
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
              <strong
                className={`severity severity-${severity.toLowerCase()}`}
              >
                {severity}
              </strong>
            </div>

            <div>
              <span>Response Priority</span>
              <strong>{priority}</strong>
            </div>
          </div>

          <div className="impact-summary">
            <strong>Severity Assessment</strong>
            <p>
              Baseline Severity: {playbook.severity}
            </p>
            <p>
              Affected Systems: {validInput ? systemCount : 'Invalid input'}
            </p>
            <p>
              Final Severity: {severity}
            </p>
          </div>

          {/* New Severity Explanation */}
          <div className="severity-explanation">
            <h3>Why this severity?</h3>
            <p>{severityExplanation}</p>
          </div>

          <p>{playbook.description}</p>

          {/* Incident Response Timer */}
          <div className="incident-timer">
            <h2>Incident Response Timer</h2>

            <div className="timer-display">
              {formatTime(elapsedSeconds)}
            </div>

            <div className="timer-buttons">
              <button
                type="button"
                onClick={() => setTimerRunning(true)}
                disabled={timerRunning}
              >
                Start
              </button>

              <button
                type="button"
                onClick={() => setTimerRunning(false)}
                disabled={!timerRunning}
              >
                Pause
              </button>

              <button
                type="button"
                className="reset-button"
                onClick={resetTimer}
                disabled={elapsedSeconds === 0 && !timerRunning}
              >
                Reset Timer
              </button>
            </div>

            <p className="timer-status">
              {timerRunning
                ? 'Timer is running'
                : elapsedSeconds > 0
                  ? 'Timer paused'
                  : 'Timer not started'}
            </p>
          </div>

          {/* Response Checklist */}
          <div className="checklist-header">
            <h2>Response Checklist</h2>
            <span>
              {completedCount}/{totalSteps} completed
            </span>
          </div>

          <div className="progress-track">
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
            <p className="completion-message">
              All response steps have been marked complete!
            </p>
          )}

          <div className="action-buttons">
            <button
              type="button"
              onClick={copyPlaybook}
              disabled={!validInput}
            >
              Copy Playbook
            </button>

            <button
              type="button"
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
