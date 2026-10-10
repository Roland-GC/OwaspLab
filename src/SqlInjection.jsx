import React, { useState } from 'react';

export default function SqlInjection({ language = 'es' }) {
  const copy = {
    es: {
      title: 'Inyección SQL',
      description: 'Prueba cómo una consulta insegura puede exponer datos y cómo protegerla.',
      attacker: 'Modo atacante',
      defender: 'Modo defensor',
      label: 'ID de usuario',
      placeholder: "Ej: 1' OR '1'='1",
      button: 'Ejecutar prueba',
      file: 'consulta-vulnerable.php',
      secureFile: 'consulta-segura.php',
      risk: 'RIESGO ALTO',
      alert: 'ALERTA RED TEAM',
      secure: 'BLUE TEAM',
      query: "Query ejecutada: SELECT * FROM users WHERE id = '",
      injected: "🔒 [ALERTA RED TEAM] ¡SQLi Exitosa! Retornando base de datos: [{id: 1, user: 'admin', pass: '\$2b\$12\$hash...'}, {id: 2, user: 'test', pass: '123'}]",
      safe: '🛡️ [BLUE TEAM] Consulta Sanitizada de forma segura. Usando Prepared Statements.'
    },
    en: {
      title: 'SQL Injection',
      description: 'Test how an unsafe query can expose data and how to protect it.',
      attacker: 'Attacker mode',
      defender: 'Defender mode',
      label: 'User ID',
      placeholder: "Example: 1' OR '1'='1",
      button: 'Run test',
      file: 'vulnerable-query.php',
      secureFile: 'safe-query.php',
      risk: 'HIGH RISK',
      alert: 'RED TEAM ALERT',
      secure: 'BLUE TEAM',
      query: "Executed query: SELECT * FROM users WHERE id = '",
      injected: "🔒 [RED TEAM ALERT] SQLi successful! Returning database records: [{id: 1, user: 'admin', pass: '\$2b\$12\$hash...'}, {id: 2, user: 'test', pass: '123'}]",
      safe: '🛡️ [BLUE TEAM] Query sanitized safely. Using prepared statements.'
    }
  }[language];

  const [userId, setUserId] = useState('');
  const [viewMode, setViewMode] = useState('attacker');
  const [result, setResult] = useState('');

  const handleSimulate = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (userId.includes("'") || userId.toLowerCase().includes('or')) {
        setResult(copy.injected);
      } else {
        setResult(`${copy.query}${userId}'`);
      }
    } else {
      setResult(copy.safe);
    }
  };

  return (
    <div className="scenario-card">
      <div className="scenario-heading">
        <span className="vulnerability-icon sql-icon" aria-hidden="true">DB</span>
        <div>
          <span className="section-kicker">{language === 'en' ? 'VULNERABILITY · A03:2021' : 'VULNERABILIDAD · A03:2021'}</span>
          <h3>{copy.title}</h3>
        </div>
        <span className="risk-badge">{copy.risk}</span>
      </div>
      <p className="scenario-description">{copy.description}</p>
      <div className="mode-switch" aria-label={language === 'en' ? 'Select practice mode' : 'Selecciona el modo de práctica'}>
        <button type="button" aria-pressed={viewMode === 'attacker'} onClick={() => { setViewMode('attacker'); setResult(''); }} className={`mode-button ${viewMode === 'attacker' ? 'attacker active' : ''}`}>
          <span className="mode-indicator" /> {copy.attacker}
        </button>
        <button type="button" aria-pressed={viewMode === 'defender'} onClick={() => { setViewMode('defender'); setResult(''); }} className={`mode-button ${viewMode === 'defender' ? 'defender active' : ''}`}>
          <span className="mode-indicator" /> {copy.defender}
        </button>
      </div>
      <form onSubmit={handleSimulate} className="simulation-form">
        <label className="field-label" htmlFor="sql-input">{copy.label}</label>
        <div className="input-row">
          <input id="sql-input" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder={copy.placeholder} className="text-input"/>
          <button type="submit" className="action-button"><span>{copy.button}</span><span aria-hidden="true">→</span></button>
        </div>
      </form>
      {result && <div className={`result-message ${result.includes('ALERTA') || result.includes('ALERT') ? 'danger' : 'success'}`} role="status">{result}</div>}
      <div className="code-heading"><span className="code-lights"><i /><i /><i /></span><span>{viewMode === 'attacker' ? copy.file : copy.secureFile}</span><span className="code-language">PHP</span></div>
      <pre className="code-block"><code>
        {viewMode === 'attacker'
          ? `// PHP VULNERABLE\n\$id = \$_GET['id'];\n\$query = "SELECT * FROM users WHERE id = '" . \$id . "'";\n\$res = mysqli_query(\$conn, \$query);`
          : `// PHP SEGURO\n\$id = \$_GET['id'];\n\$stmt = \$conn->prepare("SELECT * FROM users WHERE id = ?");\n\$stmt->bind_param("i", \$id);\n\$stmt->execute();`
        }
      </code></pre>
    </div>
  );
}