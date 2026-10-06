import React, { useState } from 'react';

export default function BolaAttack() {
  const [viewMode, setViewMode] = useState('attacker');
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/users/109/profile');
  const [output, setOutput] = useState('');

  const handleApiCall = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (apiEndpoint.includes('/users/110/')) {
        setOutput(`🚨 [ALERTA RED TEAM - Fuga de Datos por BOLA]
GET ${apiEndpoint} HTTP/1.1
Respuesta del Servidor (200 OK):
{
  "status": "success",
  "data": {
    "user_id": 110,
    "username": "ceo_corporativo",
    "email": "ceo@empresa.com",
    "backup_phone": "+34 600 000 000",
    "role": "SuperAdmin"
  }
}`);
      } else {
        setOutput(`Petición enviada a la API. Devuelve los datos del ID solicitado porque la API no valida si el token del usuario actual tiene permiso para consultar otros perfiles.`);
      }
    } else {
      setOutput(`🛡️ [BLUE TEAM - Validación a nivel de Objeto Activa]
GET ${apiEndpoint} HTTP/1.1
Respuesta del Servidor (403 Forbidden):
{
  "status": "error",
  "message": "Fallo de autorización: El usuario autenticado en la sesión no tiene permisos para acceder al recurso solicitado."
}`);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#f38ba8] mb-4">🛡️ API Vulnerability: API1:2019 - BOLA (Broken Object Level Authorization)</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); setApiEndpoint('/api/v1/users/110/profile'); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 Modo Atacante</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); setApiEndpoint('/api/v1/users/110/profile'); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 Modo Defensor</button>
      </div>

      <form onSubmit={handleApiCall} className="mb-4">
        <label className="block text-xs text-[#a6adc8] mb-1">Simulación de Endpoint de API consultada:</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={apiEndpoint} 
            onChange={(e) => setApiEndpoint(e.target.value)}
            className="flex-grow p-2 bg-[#181825] border border-[#313244] rounded text-white text-xs font-mono focus:outline-none"
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded text-xs font-bold">Llamar API</button>
        </div>
      </form>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] overflow-x-auto">{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// API VULNERABLE (Falta verificación de políticas de autorización)\napp.get('/api/v1/users/:id/profile', (req, res) => {\n  // Error: Se confía en el parámetro de la ruta sin mapear la propiedad con el token del cliente\n  db.findUser(req.params.id).then(user => res.json(user));\n});`
          : `// API SEGURA (Comprobación estricta de pertenencia de objetos)\napp.get('/api/v1/users/:id/profile', (req, res) => {\n  // Validación: Compara el ID solicitado con el ID del usuario autenticado en el token\n  if (req.user.id !== req.params.id && req.user.role !== 'admin') {\n    return res.status(403).json({ error: 'Unauthorized object access' });\n  }\n  db.findUser(req.params.id).then(user => res.json(user));\n});`
        }
      </pre>
    </div>
  );
}
