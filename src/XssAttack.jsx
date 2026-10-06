import React, { useState } from 'react';

export default function XssAttack() {
  const [comment, setComment] = useState('');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (comment.includes("<script>") || comment.toLowerCase().includes("onerror")) {
        setOutput(`🚨 [ALERTA RED TEAM] ¡Ataque XSS! El navegador ejecutó código malicioso externo.`);
      } else {
        setOutput(`Comentario publicado en el foro: ${comment}`);
      }
    } else {
      setOutput(`🛡️ [BLUE TEAM] Entrada sanitizada. Caracteres especiales convertidos a entidades HTML.`);
    }
  };

  return (
    <div className="scenario-card">
      <div className="scenario-heading">
        <span className="vulnerability-icon xss-icon" aria-hidden="true">&lt;/&gt;</span>
        <div>
          <span className="section-kicker">VULNERABILIDAD · A03:2021</span>
          <h3>Cross-Site Scripting (XSS)</h3>
        </div>
        <span className="risk-badge">RIESGO ALTO</span>
      </div>
      <p className="scenario-description">Explora cómo una entrada sin validar puede ejecutar código en el navegador.</p>
      <div className="mode-switch" aria-label="Selecciona el modo de práctica">
        <button type="button" aria-pressed={viewMode === 'attacker'} onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`mode-button ${viewMode === 'attacker' ? 'attacker active' : ''}`}>
          <span className="mode-indicator" /> Modo atacante
        </button>
        <button type="button" aria-pressed={viewMode === 'defender'} onClick={() => { setViewMode('defender'); setOutput(''); }} className={`mode-button ${viewMode === 'defender' ? 'defender active' : ''}`}>
          <span className="mode-indicator" /> Modo defensor
        </button>
      </div>
      <form onSubmit={handlePost} className="simulation-form">
        <label className="field-label" htmlFor="xss-input">Comentario de prueba</label>
        <div className="input-row">
          <input id="xss-input" type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Ej: &lt;script&gt;alert(1)&lt;/script&gt;" className="text-input"/>
          <button type="submit" className="action-button"><span>Publicar prueba</span><span aria-hidden="true">→</span></button>
        </div>
      </form>
      {output && <div className={`result-message ${output.includes('ALERTA') ? 'danger' : 'success'}`} role="status">{output}</div>}
      <div className="code-heading"><span className="code-lights"><i /><i /><i /></span><span>{viewMode === 'attacker' ? 'comentarios-vulnerable.php' : 'comentarios-seguro.php'}</span><span className="code-language">PHP</span></div>
      <pre className="code-block"><code>
        {viewMode === 'attacker'
          ? `// PHP VULNERABLE\n\$comment = \$_POST['comment'];\necho "<div>" . \$comment . "</div>";`
          : `// PHP SEGURO\n\$comment = \$_POST['comment'];\necho "<div>" . htmlspecialchars(\$comment, ENT_QUOTES, 'UTF-8') . "</div>";`
        }
      </code></pre>
    </div>
  );
}