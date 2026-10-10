import React, { useState } from 'react';

export default function MisconfigAttack({ language = 'es' }) {
  const copy = {
    es: {
      title: '🛡️ Vulnerabilidad: A05:2021 - Configuración Incorrecta de Seguridad',
      attacker: '🔴 Modo Atacante',
      defender: '🟢 Modo Defensor',
      error: 'Provocar Error en el Servidor',
      directory: 'Intentar Listar Carpeta /config',
      errorOutput: "🚨 [ALERTA RED TEAM - Exposición de Rutas]\nFatal error: Uncaught Error: Call to a member function query() on null in E:\\var\\www\\html\\includes\\db_connector.php:34\nStack trace:\n#0 E:\\var\\www\\html\\index.php(12): connectDB()\n#1 {main}\n* El atacante ahora conoce la estructura interna de rutas de tu servidor Windows/Apache.",
      directoryOutput: "🚨 [ALERTA RED TEAM - Directory Listing Activo]\nIndex of /config\n [ICO]  Name                   Last modified      Size\n 📁  ../\n [TXT]  db_config.php.bak      2025-10-01 12:00   2.4K  <-- ¡Contiene credenciales en texto plano!\n [TXT]  ssl_key.pem            2025-09-14 08:32   1.8K",
      safeError: "🛡️ [BLUE TEAM] Error Genérico: 'Ha ocurrido un error interno en el servidor. Código de referencia: ERR-5023'.\n* Los logs detallados se guardan en el servidor de forma segura, ocultos al usuario final.",
      safeDirectory: "🛡️ [BLUE TEAM] Acceso Denegado (HTTP 403 Forbidden).\n* El servidor web tiene desactivada la directiva 'Options Indexes', impidiendo listar el contenido de las carpetas."
    },
    en: {
      title: '🛡️ Vulnerability: A05:2021 - Security Misconfiguration',
      attacker: '🔴 Attacker mode',
      defender: '🟢 Defender mode',
      error: 'Trigger server error',
      directory: 'Attempt to list /config folder',
      errorOutput: "🚨 [RED TEAM ALERT - Path Exposure]\nFatal error: Uncaught Error: Call to a member function query() on null in E:\\var\\www\\html\\includes\\db_connector.php:34\nStack trace:\n#0 E:\\var\\www\\html\\index.php(12): connectDB()\n#1 {main}\n* The attacker now knows the internal server path structure of your Windows/Apache server.",
      directoryOutput: "🚨 [RED TEAM ALERT - Directory Listing Active]\nIndex of /config\n [ICO]  Name                   Last modified      Size\n 📁  ../\n [TXT]  db_config.php.bak      2025-10-01 12:00   2.4K  <-- Contains credentials in plain text!\n [TXT]  ssl_key.pem            2025-09-14 08:32   1.8K",
      safeError: "🛡️ [BLUE TEAM] Generic Error: 'An internal server error has occurred. Reference code: ERR-5023'.\n* Detailed logs are kept safely on the server, hidden from the end user.",
      safeDirectory: "🛡️ [BLUE TEAM] Access denied (HTTP 403 Forbidden).\n* The web server has disabled the 'Options Indexes' directive, preventing listing folder contents."
    }
  }[language];

  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handleTrigger = (type) => {
    if (viewMode === 'attacker') {
      if (type === 'error') {
        setOutput(copy.errorOutput);
      } else {
        setOutput(copy.directoryOutput);
      }
    } else {
      if (type === 'error') {
        setOutput(copy.safeError);
      } else {
        setOutput(copy.safeDirectory);
      }
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#fab387] mb-4">{copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.defender}</button>
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => handleTrigger('error')} className="flex-1 bg-amber-700 hover:bg-amber-600 text-white p-2 rounded text-xs font-bold">{copy.error}</button>
        <button onClick={() => handleTrigger('directory')} className="flex-1 bg-amber-700 hover:bg-amber-600 text-white p-2 rounded text-xs font-bold">{copy.directory}</button>
      </div>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] overflow-x-auto whitespace-pre-wrap">{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `<!-- CONFIGURACIÓN VULNERABLE (php.ini / .htaccess) -->\ndisplay_errors = On\nOptions +Indexes\n# Permite ver errores crudos en pantalla y listar archivos si no hay index.html`
          : `<!-- CONFIGURACIÓN SEGURA (REMEDIACIÓN) -->\ndisplay_errors = Off\nOptions -Indexes\n# Oculta fugas de información técnica y bloquea el escaneo visual de directorios`
        }
      </pre>
    </div>
  );
}
