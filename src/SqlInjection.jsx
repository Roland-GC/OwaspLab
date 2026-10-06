import React, { useState } from 'react';

export default function SqlInjection() {
  const [userId, setUserId] = useState('');
  const [viewMode, setViewMode] = useState('attacker');
  const [result, setResult] = useState('');

  const handleSimulate = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (userId.includes("'") || userId.toLowerCase().includes("or")) {
        setResult("🔒 [ALERTA RED TEAM] ¡SQLi Exitosa! Retornando base de datos: [{id: 1, user: 'admin', pass: '\$2b\$12\$hash...'}, {id: 2, user: 'test', pass: '123'}]");
      } else {
        setResult(`Query ejecutada: SELECT * FROM users WHERE id = '${userId}'`);
      }
    } else {
      setResult(`🛡️ [BLUE TEAM] Consulta Sanitizada de forma segura. Usando Prepared Statements.`);
    }
  };

  return (
    <div className="scenario-card">
      <div className="scenario-heading">
        <span className="vulnerability-icon sql-icon" aria-hidden="true">DB</span>
        <div>
          <span className="section-kicker">VULNERABILIDAD · A03:2021</span>
          <h3>Inyección SQL</h3>
        </div>
        <span className="risk-badge">RIESGO ALTO</span>
      </div>
      <p className="scenario-description">Prueba cómo una consulta insegura puede exponer datos y cómo protegerla.</p>
      <div className="mode-switch" aria-label="Selecciona el modo de práctica">
        <button type="button" aria-pressed={viewMode === 'attacker'} onClick={() => { setViewMode('attacker'); setResult(''); }} className={`mode-button ${viewMode === 'attacker' ? 'attacker active' : ''}`}>
          <span className="mode-indicator" /> Modo atacante
        </button>
        <button type="button" aria-pressed={viewMode === 'defender'} onClick={() => { setViewMode('defender'); setResult(''); }} className={`mode-button ${viewMode === 'defender' ? 'defender active' : ''}`}>
          <span className="mode-indicator" /> Modo defensor
        </button>
      </div>
      <form onSubmit={handleSimulate} className="simulation-form">
        <label className="field-label" htmlFor="sql-input">ID de usuario</label>
        <div className="input-row">
          <input id="sql-input" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Ej: 1' OR '1'='1" className="text-input"/>
          <button type="submit" className="action-button"><span>Ejecutar prueba</span><span aria-hidden="true">→</span></button>
        </div>
      </form>
      {result && <div className={`result-message ${result.includes('ALERTA') ? 'danger' : 'success'}`} role="status">{result}</div>}
      <div className="code-heading"><span className="code-lights"><i /><i /><i /></span><span>{viewMode === 'attacker' ? 'consulta-vulnerable.php' : 'consulta-segura.php'}</span><span className="code-language">PHP</span></div>
      <pre className="code-block"><code>
        {viewMode === 'attacker'
          ? `// PHP VULNERABLE\n\$id = \$_GET['id'];\n\$query = "SELECT * FROM users WHERE id = '" . \$id . "'";\n\$res = mysqli_query(\$conn, \$query);`
          : `// PHP SEGURO\n\$id = \$_GET['id'];\n\$stmt = \$conn->prepare("SELECT * FROM users WHERE id = ?");\n\$stmt->bind_param("i", \$id);\n\$stmt->execute();`
        }
      </code></pre>
    </div>
  );
}