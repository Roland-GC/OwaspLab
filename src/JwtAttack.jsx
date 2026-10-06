import React, { useState } from 'react';

export default function JwtAttack() {
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handleSimulateToken = () => {
    if (viewMode === 'attacker') {
      setOutput(`🚨 [ALERTA RED TEAM - JWT Modificado de forma fraudulenta]
[+] Cabecera original: {"alg": "HS256", "typ": "JWT"}
[+] Payload modificado: {"user": "invitado", "role": "admin"}  <-- Cambiado de 'user' a 'admin'
[+] Firma: [Dejada en blanco / Algoritmo forzado a "none"]

Resultado en el Servidor: Acceso concedido al Panel de Administración debido a la falta de validación estructural de la firma del Token.`);
    } else {
      setOutput(`🛡️ [BLUE TEAM - Validación Robusta de Firma]
Resultado: Error HTTP 401 Unauthorized. 
Mensaje: La firma del token JWT no coincide con la clave secreta del servidor o utiliza un algoritmo no permitido (none). Petición descartada.`);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#f9e2af] mb-4">🛡️ Vulnerabilidad: Manipulación de Payload JWT & Evasión de Firma</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 Modo Atacante</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 Modo Defensor</button>
      </div>

      <button onClick={handleSimulateToken} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded text-xs font-bold mb-4">
        Enviar Token Modificado al Servidor Web
      </button>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] whitespace-pre-wrap">{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// BACKEND VULNERABLE (Node.js/Express)\nconst token = req.headers['authorization'];\n// Error crítico: Decodificar el JWT sin verificar la clave secreta (Signature verification skipped)\nconst decoded = jwt.decode(token);\nreq.user = decoded;`
          : `// BACKEND SEGURO (Mitigación mediante verificación estricta)\nconst token = req.headers['authorization'];\n// Obliga al servidor a verificar la firma usando la clave secreta y algoritmos permitidos\njwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {\n  if (err) return res.sendStatus(403);\n  req.user = decoded;\n});`
        }
      </pre>
    </div>
  );
}
