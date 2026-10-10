import React, { useState } from 'react';

export default function XssAttack({ language = 'es' }) {
  const copy = {
    es: {
      title: 'Cross-Site Scripting (XSS)',
      description: 'Explora cómo una entrada sin validar puede ejecutar código en el navegador.',
      attacker: 'Modo atacante',
      defender: 'Modo defensor',
      label: 'Comentario de prueba',
      placeholder: 'Ej: <script>alert(1)</script>',
      button: 'Publicar prueba',
      file: 'comentarios-vulnerable.php',
      secureFile: 'comentarios-seguro.php',
      risk: 'RIESGO ALTO',
      alert: '🚨 [ALERTA RED TEAM] ¡Ataque XSS! El navegador ejecutó código malicioso externo.',
      safe: '🛡️ [BLUE TEAM] Entrada sanitizada. Caracteres especiales convertidos a entidades HTML.',
      published: 'Comentario publicado en el foro: '
    },
    en: {
      title: 'Cross-Site Scripting (XSS)',
      description: 'Explore how unvalidated input can execute code in the browser.',
      attacker: 'Attacker mode',
      defender: 'Defender mode',
      label: 'Test comment',
      placeholder: 'Example: <script>alert(1)</script>',
      button: 'Post test',
      file: 'vulnerable-comments.php',
      secureFile: 'safe-comments.php',
      risk: 'HIGH RISK',
      alert: '🚨 [RED TEAM ALERT] XSS attack! The browser executed malicious external code.',
      safe: '🛡️ [BLUE TEAM] Input sanitized. Special characters converted to HTML entities.',
      published: 'Comment published on the forum: '
    }
  }[language];

  const [comment, setComment] = useState('');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (comment.includes('<script>') || comment.toLowerCase().includes('onerror')) {
        setOutput(copy.alert);
      } else {
        setOutput(`${copy.published}${comment}`);
      }
    } else {
      setOutput(copy.safe);
    }
  };

  return (
    <div className="scenario-card">
      <div className="scenario-heading">
        <span className="vulnerability-icon xss-icon" aria-hidden="true">&lt;/&gt;</span>
        <div>
          <span className="section-kicker">{language === 'en' ? 'VULNERABILITY · A03:2021' : 'VULNERABILIDAD · A03:2021'}</span>
          <h3>{copy.title}</h3>
        </div>
        <span className="risk-badge">{copy.risk}</span>
      </div>
      <p className="scenario-description">{copy.description}</p>
      <div className="mode-switch" aria-label={language === 'en' ? 'Select practice mode' : 'Selecciona el modo de práctica'}>
        <button type="button" aria-pressed={viewMode === 'attacker'} onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`mode-button ${viewMode === 'attacker' ? 'attacker active' : ''}`}>
          <span className="mode-indicator" /> {copy.attacker}
        </button>
        <button type="button" aria-pressed={viewMode === 'defender'} onClick={() => { setViewMode('defender'); setOutput(''); }} className={`mode-button ${viewMode === 'defender' ? 'defender active' : ''}`}>
          <span className="mode-indicator" /> {copy.defender}
        </button>
      </div>
      <form onSubmit={handlePost} className="simulation-form">
        <label className="field-label" htmlFor="xss-input">{copy.label}</label>
        <div className="input-row">
          <input id="xss-input" type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder={copy.placeholder} className="text-input"/>
          <button type="submit" className="action-button"><span>{copy.button}</span><span aria-hidden="true">→</span></button>
        </div>
      </form>
      {output && <div className={`result-message ${output.includes('ALERTA') || output.includes('ALERT') ? 'danger' : 'success'}`} role="status">{output}</div>}
      <div className="code-heading"><span className="code-lights"><i /><i /><i /></span><span>{viewMode === 'attacker' ? copy.file : copy.secureFile}</span><span className="code-language">PHP</span></div>
      <pre className="code-block"><code>
        {viewMode === 'attacker'
          ? `// PHP VULNERABLE\n\$comment = \$_POST['comment'];\necho "<div>" . \$comment . "</div>";`
          : `// PHP SEGURO\n\$comment = \$_POST['comment'];\necho "<div>" . htmlspecialchars(\$comment, ENT_QUOTES, 'UTF-8') . "</div>";`
        }
      </code></pre>
    </div>
  );
}