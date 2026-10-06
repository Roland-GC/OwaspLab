import React, { useState } from 'react';

export default function MisconfigAttack({ language = 'es' }) {
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const copy = language === 'en'
    ? {
        title: 'Security misconfiguration',
        attacker: 'Attacker mode',
        defender: 'Defender mode',
        provoke: 'Trigger server error',
        list: 'Try listing /config folder',
        errorOutput: "🚨 [RED TEAM ALERT - Path Exposure]\nFatal error: Uncaught Error: Call to a member function query() on null in E:\\var\\www\\html\\includes\\db_connector.php:34\nStack trace:\n#0 E:\\var\\www\\html\\index.php(12): connectDB()\n#1 {main}\n* The attacker now knows the internal server directory structure.",
        dirOutput: "🚨 [RED TEAM ALERT - Directory Listing Active]\nIndex of /config\n [ICO]  Name                   Last modified      Size\n 📁  ../\n [TXT]  db_config.php.bak      2025-10-01 12:00   2.4K  <-- Contains plain text credentials!\n [TXT]  ssl_key.pem            2025-09-14 08:32   1.8K",
        safeError: "🛡️ [BLUE TEAM] Generic Error: 'An internal server error has occurred. Reference code: ERR-5023'.\n* Detailed logs are secure on the server and hidden from the end user.",
        safeDir: "🛡️ [BLUE TEAM] Access denied (HTTP 403 Forbidden).\n* The web server has disabled the 'Options Indexes' directive, preventing folder listing.",
        details: ['Security misconfiguration occurs when the infrastructure leaves enabled options that should be disabled. For example, displaying debug errors or allowing directory listing makes it easier for an attacker to learn the structure of the server and find sensitive files.', 'Prevention involves reviewing production settings, disabling unnecessary features, hiding technical details, and applying secure default policies. A safe environment is not only about code, but also about its hosting configuration.'],
      }
    : {
        title: 'Configuración Incorrecta de Seguridad',
        attacker: 'Modo atacante',
        defender: 'Modo defensor',
        provoke: 'Provocar Error en el Servidor',
        list: 'Intentar Listar Carpeta /config',
        errorOutput: "🚨 [ALERTA RED TEAM - Exposición de Rutas]\nFatal error: Uncaught Error: Call to a member function query() on null in E:\\var\\www\\html\\includes\\db_connector.php:34\nStack trace:\n#0 E:\\var\\www\\html\\index.php(12): connectDB()\n#1 {main}\n* El atacante ahora conoce la estructura interna de rutas de tu servidor Windows/Apache.",
        dirOutput: "🚨 [ALERTA RED TEAM - Directory Listing Activo]\nIndex of /config\n [ICO]  Name                   Last modified      Size\n 📁  ../\n [TXT]  db_config.php.bak      2025-10-01 12:00   2.4K  <-- ¡Contiene credenciales en texto plano!\n [TXT]  ssl_key.pem            2025-09-14 08:32   1.8K",
        safeError: "🛡️ [BLUE TEAM] Error Genérico: 'Ha ocurrido un error interno en el servidor. Código de referencia: ERR-5023'.\n* Los logs detallados se guardan en el servidor de forma segura, ocultos al usuario final.",
        safeDir: "🛡️ [BLUE TEAM] Acceso Denegado (HTTP 403 Forbidden).\n* El servidor web tiene desactivada la directiva 'Options Indexes', impidiendo listar el contenido de las carpetas.",
        details: ['La mala configuración se produce cuando la infraestructura deja activas opciones que deberían estar deshabilitadas. Por ejemplo, mostrar errores de depuración o permitir listados de carpetas facilita que un atacante conozca la estructura del servidor y encuentre archivos sensibles.', 'La prevención pasa por revisar la configuración de producción, desactivar funcionalidades innecesarias, ocultar detalles técnicos y aplicar políticas de seguridad por defecto. Un entorno seguro no se logra solo con código, también con la caja que lo aloja.'],
      };

  const handleTrigger = (type) => {
    if (viewMode === 'attacker') {
      if (type === 'error') {
        setOutput(copy.errorOutput);
      } else {
        setOutput(copy.dirOutput);
      }
    } else {
      if (type === 'error') {
        setOutput(copy.safeError);
      } else {
        setOutput(copy.safeDir);
      }
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#fab387] mb-4">🛡️ Vulnerabilidad: A05:2021 - {copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 {copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 {copy.defender}</button>
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => handleTrigger('error')} className="flex-1 bg-amber-700 hover:bg-amber-600 text-white p-2 rounded text-xs font-bold">{copy.provoke}</button>
        <button onClick={() => handleTrigger('directory')} className="flex-1 bg-amber-700 hover:bg-amber-600 text-white p-2 rounded text-xs font-bold">{copy.list}</button>
      </div>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] overflow-x-auto whitespace-pre-wrap" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `<!-- CONFIGURACIÓN VULNERABLE (php.ini / .htaccess) -->\ndisplay_errors = On\nOptions +Indexes\n# Permite ver errores crudos en pantalla y listar archivos si no hay index.html`
          : `<!-- CONFIGURACIÓN SEGURA (REMEDIACIÓN) -->\ndisplay_errors = Off\nOptions -Indexes\n# Oculta fugas de información técnica y bloquea el escaneo visual de directorios`
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
