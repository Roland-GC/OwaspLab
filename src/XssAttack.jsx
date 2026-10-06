import React, { useState } from 'react';

export default function XssAttack({ language = 'es' }) {
  const [comment, setComment] = useState('');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const copy = language === 'en'
    ? {
        title: 'Cross-Site Scripting (XSS)',
        risk: 'HIGH RISK',
        description: 'Explore how unvalidated input can execute code in the browser.',
        attacker: 'Attacker mode',
        defender: 'Defender mode',
        label: 'Test comment',
        placeholder: 'Example: <script>alert(1)</script>',
        action: 'Post test',
        attack: '🚨 [RED TEAM ALERT] XSS attack! The browser executed malicious external code.',
        success: 'Comment published on the forum: ',
        safe: '🛡️ [BLUE TEAM] Input sanitized. Special characters converted to HTML entities.',
        details: ['XSS occurs when unvalidated input enters the browser and is interpreted as HTML or JavaScript. A comment like <strong>&lt;script&gt;alert(1)&lt;/script&gt;</strong> can execute code unexpectedly.', 'The usual defense is to sanitize and escape all output, especially when rendering dynamic content in HTML pages. With utilities like <strong>htmlspecialchars</strong> the dangerous characters are converted into safe entities.'],
      }
    : {
        title: 'Cross-Site Scripting (XSS)',
        risk: 'RIESGO ALTO',
        description: 'Explora cómo una entrada sin validar puede ejecutar código en el navegador.',
        attacker: 'Modo atacante',
        defender: 'Modo defensor',
        label: 'Comentario de prueba',
        placeholder: 'Ej: <script>alert(1)</script>',
        action: 'Publicar prueba',
        attack: '🚨 [ALERTA RED TEAM] ¡Ataque XSS! El navegador ejecutó código malicioso externo.',
        success: 'Comentario publicado en el foro: ',
        safe: '🛡️ [BLUE TEAM] Entrada sanitizada. Caracteres especiales convertidos a entidades HTML.',
        details: ['El XSS se produce cuando una entrada no validada entra en el navegador y se interpreta como HTML o JavaScript. Un comentario como <strong>&lt;script&gt;alert(1)&lt;/script&gt;</strong> puede ejecutar código sin que el usuario lo espere.', 'La defensa habitual es sanear y escapar toda salida, especialmente cuando se imprime contenido dinámico en páginas HTML. Con frameworks o utilidades como <strong>htmlspecialchars</strong> se convierten los caracteres peligrosos en entidades seguras.'],
      };

  const handlePost = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (comment.includes('<script>') || comment.toLowerCase().includes('onerror')) {
        setOutput(copy.attack);
      } else {
        setOutput(`${copy.success}${comment}`);
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
          <span className="section-kicker">VULNERABILIDAD · A03:2021</span>
          <h3>{copy.title}</h3>
        </div>
        <span className="risk-badge">{copy.risk}</span>
      </div>
      <p className="scenario-description">{copy.description}</p>
      <div className="mode-switch" aria-label={language === 'en' ? 'Choose the practice mode' : 'Selecciona el modo de práctica'}>
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
          <button type="submit" className="action-button"><span>{copy.action}</span><span aria-hidden="true">→</span></button>
        </div>
      </form>
      {output && <div className={`result-message ${output.includes('ALERTA') || output.includes('ALERT') ? 'danger' : 'success'}`} role="status">{output}</div>}
      <div className="code-heading"><span className="code-lights"><i /><i /><i /></span><span>{viewMode === 'attacker' ? (language === 'en' ? 'comments-vulnerable.php' : 'comentarios-vulnerable.php') : (language === 'en' ? 'comments-safe.php' : 'comentarios-seguro.php')}</span><span className="code-language">PHP</span></div>
      <pre className="code-block"><code>
        {viewMode === 'attacker'
          ? `// PHP VULNERABLE\n\$comment = \$_POST['comment'];\necho "<div>" . \$comment . "</div>";`
          : `// PHP SEGURO\n\$comment = \$_POST['comment'];\necho "<div>" . htmlspecialchars(\$comment, ENT_QUOTES, 'UTF-8') . "</div>";`
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