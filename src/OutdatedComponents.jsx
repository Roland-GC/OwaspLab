import React, { useState } from 'react';

export default function OutdatedComponents() {
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handleCheck = () => {
    if (viewMode === 'attacker') {
      setOutput(`🚨 [ALERTA RED TEAM - CVE Detectado]
Dependencia: Log4j v2.14.1
Estado: ❌ VULNERABLE
Identificador: CVE-2021-44228 (Log4Shell) - Severidad: 10.0 CRÍTICO
Impacto: Ejecución Remota de Código (RCE). El atacante ha enviado un payload jndi:ldap:// y ha tomado control total del servidor.`);
    } else {
      setOutput(`🛡️ [BLUE TEAM - Auditoría SCA Activa]
Dependencia: Log4j v2.17.1 (Actualizado)
Estado: 🟢 SEGURO
Análisis: Cero vulnerabilidades conocidas detectadas en el árbol de dependencias actual mediante escaneo de seguridad estático.`);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#74c7ec] mb-4">🛡️ Vulnerabilidad: A06:2021 - Componentes Vulnerables y Obsoletos</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 Modo Atacante</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 Modo Defensor</button>
      </div>

      <button onClick={handleCheck} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded text-xs font-bold mb-4">
        Ejecutar Escáner de Dependencias (Software Composition Analysis)
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
