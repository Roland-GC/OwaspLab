import React, { useState } from 'react';

export default function BolaAttack({ language = 'es' }) {
  const [viewMode, setViewMode] = useState('attacker');
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/users/109/profile');
  const [output, setOutput] = useState('');

  const copy = language === 'en'
    ? {
        title: 'API vulnerability: API1:2019 - BOLA',
        attacker: 'Attacker mode',
        defender: 'Defender mode',
        endpointLabel: 'Simulated API endpoint being queried:',
        action: 'Call API',
        alert: `🚨 [RED TEAM ALERT - BOLA Data Leak]\nGET ${apiEndpoint} HTTP/1.1\nServer response (200 OK):\n{\n  "status": "success",\n  "data": {\n    "user_id": 110,\n    "username": "ceo_corporativo",\n    "email": "ceo@company.com",\n    "backup_phone": "+34 600 000 000",\n    "role": "SuperAdmin"\n  }\n}`,
        safe: `🛡️ [BLUE TEAM - Object-Level Validation Active]\nGET ${apiEndpoint} HTTP/1.1\nServer response (403 Forbidden):\n{\n  "status": "error",\n  "message": "Authorization failed: the authenticated user is not allowed to access the requested resource."\n}`,
        fallback: 'A request was sent to the API. It returned the requested object because the API does not validate whether the current user token has permission to access other profiles.',
        details: ['The BOLA vulnerability occurs when the API authorizes access simply by route or identifier, without verifying whether the object belongs to the current authenticated user. Changing an ID in the URL can expose profiles or data belonging to other users.', 'The mitigation involves validating the relationship between the current user and the requested resource for every endpoint. Authorization must be enforced at object level, not only by role or route.'],
      }
    : {
        title: 'API Vulnerability: API1:2019 - BOLA (Broken Object Level Authorization)',
        attacker: 'Modo atacante',
        defender: 'Modo defensor',
        endpointLabel: 'Simulación de Endpoint de API consultada:',
        action: 'Llamar API',
        alert: `🚨 [ALERTA RED TEAM - Fuga de Datos por BOLA]\nGET ${apiEndpoint} HTTP/1.1\nRespuesta del Servidor (200 OK):\n{\n  "status": "success",\n  "data": {\n    "user_id": 110,\n    "username": "ceo_corporativo",\n    "email": "ceo@empresa.com",\n    "backup_phone": "+34 600 000 000",\n    "role": "SuperAdmin"\n  }\n}`,
        safe: `🛡️ [BLUE TEAM - Validación a nivel de Objeto Activa]\nGET ${apiEndpoint} HTTP/1.1\nRespuesta del Servidor (403 Forbidden):\n{\n  "status": "error",\n  "message": "Fallo de autorización: El usuario autenticado en la sesión no tiene permisos para acceder al recurso solicitado."\n}`,
        fallback: 'Petición enviada a la API. Devuelve los datos del ID solicitado porque la API no valida si el token del usuario actual tiene permiso para consultar otros perfiles.',
        details: ['La vulnerabilidad BOLA se produce cuando la API autoriza acceso a un recurso simplemente por la ruta o el identificador, sin comprobar si ese objeto pertenece al usuario autenticado. Cambiar un ID en la URL puede revelarnos perfiles o datos de otras personas.', 'La mitigación requiere validar la relación entre el usuario actual y el recurso solicitado en cada endpoint. La autorización debe aplicarse a nivel de objeto, no solo a nivel de rol o endpoint.'],
      };

  const handleApiCall = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (apiEndpoint.includes('/users/110/')) {
        setOutput(copy.alert);
      } else {
        setOutput(copy.fallback);
      }
    } else {
      setOutput(copy.safe);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#f38ba8] mb-4">🛡️ {copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); setApiEndpoint('/api/v1/users/110/profile'); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 {copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); setApiEndpoint('/api/v1/users/110/profile'); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 {copy.defender}</button>
      </div>

      <form onSubmit={handleApiCall} className="mb-4">
        <label className="block text-xs text-[#a6adc8] mb-1">{copy.endpointLabel}</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={apiEndpoint} 
            onChange={(e) => setApiEndpoint(e.target.value)}
            className="flex-grow p-2 bg-[#181825] border border-[#313244] rounded text-white text-xs font-mono focus:outline-none"
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded text-xs font-bold">{copy.action}</button>
        </div>
      </form>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] overflow-x-auto">{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// API VULNERABLE (Falta verificación de políticas de autorización)\napp.get('/api/v1/users/:id/profile', (req, res) => {\n  // Error: Se confía en el parámetro de la ruta sin mapear la propiedad con el token del cliente\n  db.findUser(req.params.id).then(user => res.json(user));\n});`
          : `// API SEGURA (Comprobación estricta de pertenencia de objetos)\napp.get('/api/v1/users/:id/profile', (req, res) => {\n  // Validación: Compara el ID solicitado con el ID del usuario autenticado en el token\n  if (req.user.id !== req.params.id && req.user.role !== 'admin') {\n    return res.status(403).json({ error: 'Unauthorized object access' });\n  }\n  db.findUser(req.params.id).then(user => res.json(user));\n});`
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
