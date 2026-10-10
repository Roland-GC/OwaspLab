import React, { useState } from 'react';

export default function OutdatedComponents({ language = 'es' }) {
  const copy = {
    es: {
      title: '🛡️ Vulnerabilidad: A06:2021 - Componentes Vulnerables y Obsoletos',
      attacker: '🔴 Modo Atacante',
      defender: '🟢 Modo Defensor',
      button: 'Ejecutar Escáner de Dependencias (Software Composition Analysis)',
      vulnerable: `🚨 [ALERTA RED TEAM - CVE Detectado]\nDependencia: Log4j v2.14.1\nEstado: ❌ VULNERABLE\nIdentificador: CVE-2021-44228 (Log4Shell) - Severidad: 10.0 CRÍTICO\nImpacto: Ejecución Remota de Código (RCE). El atacante ha enviado un payload jndi:ldap:// y ha tomado control total del servidor.`,
      safe: `🛡️ [BLUE TEAM - Auditoría SCA Activa]\nDependencia: Log4j v2.17.1 (Actualizado)\nEstado: 🟢 SEGURO\nAnálisis: Cero vulnerabilidades conocidas detectadas en el árbol de dependencias actual mediante escaneo de seguridad estático.`
    },
    en: {
      title: '🛡️ Vulnerability: A06:2021 - Vulnerable and Outdated Components',
      attacker: '🔴 Attacker mode',
      defender: '🟢 Defender mode',
      button: 'Run dependency scanner (Software Composition Analysis)',
      vulnerable: `🚨 [RED TEAM ALERT - CVE Detected]\nDependency: Log4j v2.14.1\nStatus: ❌ VULNERABLE\nIdentifier: CVE-2021-44228 (Log4Shell) - Severity: 10.0 CRITICAL\nImpact: Remote Code Execution (RCE). The attacker sent a jndi:ldap:// payload and fully took over the server.`,
      safe: `🛡️ [BLUE TEAM - SCA Audit Active]\nDependency: Log4j v2.17.1 (Updated)\nStatus: 🟢 SECURE\nAnalysis: No known vulnerabilities detected in the current dependency tree via static security scanning.`
    }
  }[language];

  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handleCheck = () => {
    if (viewMode === 'attacker') {
      setOutput(copy.vulnerable);
    } else {
      setOutput(copy.safe);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#74c7ec] mb-4">{copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.defender}</button>
      </div>

      <button onClick={handleCheck} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded text-xs font-bold mb-4">
        {copy.button}
      </button>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] whitespace-pre-wrap">{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// ARCHIVO DE CONFIGURACIÓN INSEGURO (package.json / pom.xml)\n"dependencies": {\n  "org.apache.logging.log4j": "2.14.1" // Versión afectada por Log4Shell\n}`
          : `// ARCHIVO CORREGIDO (Auditoría automatizada con npm audit / Snyk)\n"dependencies": {\n  "org.apache.logging.log4j": "2.17.1" // Versión parcheada libre de RCE\n}`
        }
      </pre>
    </div>
  );
}
