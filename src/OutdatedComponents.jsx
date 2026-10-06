import React, { useState } from 'react';

export default function OutdatedComponents({ language = 'es' }) {
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');
  const preWrapStyles = {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  };

  const copy = language === 'en'
    ? {
        title: 'Vulnerable and outdated components',
        attacker: 'Attacker mode',
        defender: 'Defender mode',
        button: 'Run dependency scanner (Software Composition Analysis)',
        alert: `🚨 [RED TEAM ALERT - CVE Detected]\nDependency: Log4j v2.14.1\nStatus: ❌ VULNERABLE\nIdentifier: CVE-2021-44228 (Log4Shell) - Severity: 10.0 CRITICAL\nImpact: Remote code execution (RCE). The attacker has sent a jndi:ldap:// payload and has taken full control of the server.`,
        safe: `🛡️ [BLUE TEAM - SCA Audit Active]\nDependency: Log4j v2.17.1 (Updated)\nStatus: 🟢 SECURE\nAnalysis: No known vulnerabilities detected in the current dependency tree through static security scanning.`,
        details: ['Vulnerable components are libraries, frameworks, or dependencies with public, known flaws. Even if the application code is secure, an outdated package can open the door to mass exploitation and automated attacks.', 'Defense requires maintaining an up-to-date dependency inventory, using automated scanning tools, and applying patches quickly. The priority is to reduce the exposure window and prevent an old package from allowing remote exploitation.'],
      }
    : {
        title: 'Componentes Vulnerables y Obsoletos',
        attacker: 'Modo atacante',
        defender: 'Modo defensor',
        button: 'Ejecutar Escáner de Dependencias (Software Composition Analysis)',
        alert: `🚨 [ALERTA RED TEAM - CVE Detectado]\nDependencia: Log4j v2.14.1\nEstado: ❌ VULNERABLE\nIdentificador: CVE-2021-44228 (Log4Shell) - Severidad: 10.0 CRÍTICO\nImpacto: Ejecución Remota de Código (RCE). El atacante ha enviado un payload jndi:ldap:// y ha tomado control total del servidor.`,
        safe: `🛡️ [BLUE TEAM - Auditoría SCA Activa]\nDependencia: Log4j v2.17.1 (Actualizado)\nEstado: 🟢 SEGURO\nAnálisis: Cero vulnerabilidades conocidas detectadas en el árbol de dependencias actual mediante escaneo de seguridad estático.`,
        details: ['Los componentes vulnerables son bibliotecas, frameworks o dependencias con fallos públicos y conocidos. Aunque el código propio sea seguro, un paquete desactualizado puede abrir la puerta a ataques masivos y automatizados.', 'La defensa pasa por mantener un inventario actualizado de dependencias, usar herramientas de escaneo automatizado y aplicar parches con rapidez. La prioridad es reducir la ventana de exposición y evitar que un paquete viejo permita explotación remota.'],
      };

  const handleCheck = () => {
    if (viewMode === 'attacker') {
      setOutput(copy.alert);
    } else {
      setOutput(copy.safe);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#74c7ec] mb-4">🛡️ Vulnerabilidad: A06:2021 - {copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 {copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 {copy.defender}</button>
      </div>

      <button onClick={handleCheck} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded text-xs font-bold mb-4">
        {copy.button}
      </button>

      {output && <pre style={preWrapStyles} className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4]">{output}</pre>}

      <pre style={preWrapStyles} className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// ARCHIVO DE CONFIGURACIÓN INSEGURO (package.json / pom.xml)\n"dependencies": {\n  "org.apache.logging.log4j": "2.14.1" // Versión afectada por Log4Shell\n}`
          : `// ARCHIVO CORREGIDO (Auditoría automatizada con npm audit / Snyk)\n"dependencies": {\n  "org.apache.logging.log4j": "2.17.1" // Versión parcheada libre de RCE\n}`
        }
      </pre>

      <details className="details-panel">
        <summary>{language === 'en' ? 'More details' : 'Más detalles'}</summary>
        <div className="details-content">
          {copy.details.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </details>
    </div>
  );
}
