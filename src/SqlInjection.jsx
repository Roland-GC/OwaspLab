import React, { useState } from 'react';

export default function SqlInjection({ language = 'es' }) {
  const [userId, setUserId] = useState('');
  const [viewMode, setViewMode] = useState('attacker');
  const [result, setResult] = useState('');

  const copy = language === 'en'
    ? {
        title: 'SQL Injection',
        kicker: 'VULNERABILITY · A03:2021',
        risk: 'HIGH RISK',
        description: 'Test how an unsafe query can expose data and how to protect it.',
        attacker: 'Attacker mode',
        defender: 'Defender mode',
        label: 'User ID',
        placeholder: "Example: 1' OR '1'='1",
        action: 'Run test',
        alert: '🔒 [RED TEAM ALERT] SQLi successful! Returning database rows: [{id: 1, user: \'admin\', pass: \'\$2b\$12\$hash...\'}, {id: 2, user: \'test\', pass: \'123\'}]',
        safe: '🛡️ [BLUE TEAM] Query sanitized safely. Using prepared statements.',
        query: "Query executed: SELECT * FROM users WHERE id = '",
        details: [
          `SQL injection happens when user input is concatenated directly into a query. In this case, a value like <strong>1' OR '1'='1</strong> can alter the query logic and return records that should not be visible.`,
          'The main mitigation is to use parameterized queries or prepared statements, where user input is sent as data rather than SQL. This prevents attackers from altering the query structure even if they include special characters.',
        ],
      }
    : {
        title: 'Inyección SQL',
        kicker: 'VULNERABILIDAD · A03:2021',
        risk: 'RIESGO ALTO',
        description: 'Prueba cómo una consulta insegura puede exponer datos y cómo protegerla.',
        attacker: 'Modo atacante',
        defender: 'Modo defensor',
        label: 'ID de usuario',
        placeholder: "Ej: 1' OR '1'='1",
        action: 'Ejecutar prueba',
        alert: '🔒 [ALERTA RED TEAM] ¡SQLi Exitosa! Retornando base de datos: [{id: 1, user: \'admin\', pass: \'\$2b\$12\$hash...\'}, {id: 2, user: \'test\', pass: \'123\'}]',
        safe: '🛡️ [BLUE TEAM] Consulta Sanitizada de forma segura. Usando Prepared Statements.',
        query: "Query ejecutada: SELECT * FROM users WHERE id = '",
        details: [
          `La inyección SQL ocurre cuando una entrada del usuario se concatena directamente dentro de una consulta. En este caso, un valor como <strong>1' OR '1'='1</strong> puede modificar la lógica de la sentencia y devolver registros que no deberían verse.`,
          'La mitigación principal es usar consultas parametrizadas o prepared statements, donde el valor del usuario se envía como dato y no como parte del SQL. Esto evita que se altere la estructura de la consulta aunque el atacante introduzca caracteres especiales.',
        ],
      };

  const handleSimulate = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (userId.includes("'") || userId.toLowerCase().includes("or")) {
        setResult(copy.alert);
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
          <span className="section-kicker">VULNERABILIDAD · A03:2021</span>
          <h3>{copy.title}</h3>
        </div>
        <span className="risk-badge">{copy.risk}</span>
      </div>
      <p className="scenario-description">{copy.description}</p>
      <div className="mode-switch" aria-label={language === 'en' ? 'Choose the practice mode' : 'Selecciona el modo de práctica'}>
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
          <button type="submit" className="action-button"><span>{copy.action}</span><span aria-hidden="true">→</span></button>
        </div>
      </form>
      {result && <div className={`result-message ${result.includes('ALERTA') || result.includes('ALERT') ? 'danger' : 'success'}`} role="status">{result}</div>}
      <div className="code-heading"><span className="code-lights"><i /><i /><i /></span><span>{viewMode === 'attacker' ? (language === 'en' ? 'query-vulnerable.php' : 'consulta-vulnerable.php') : (language === 'en' ? 'query-safe.php' : 'consulta-segura.php')}</span><span className="code-language">PHP</span></div>
      <pre className="code-block"><code>
        {viewMode === 'attacker'
          ? `// PHP VULNERABLE\n\$id = \$_GET['id'];\n\$query = "SELECT * FROM users WHERE id = '" . \$id . "'";\n\$res = mysqli_query(\$conn, \$query);`
          : `// PHP SEGURO\n\$id = \$_GET['id'];\n\$stmt = \$conn->prepare("SELECT * FROM users WHERE id = ?");\n\$stmt->bind_param("i", \$id);\n\$stmt->execute();`
        }
      </code></pre>

      <details className="details-panel">
        <summary>{language === 'en' ? 'More details' : 'Más detalles'}</summary>
        <div className="details-content">
          {copy.details.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </details>
    </div>
  );
}