import React, { useState } from 'react';

export default function CryptoFailures({ language = 'es' }) {
  const [password, setPassword] = useState('admin123');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const copy = language === 'en'
    ? {
        title: 'Cryptographic failures',
        attacker: 'Attacker mode',
        defender: 'Defender mode',
        placeholder: 'Type a password to simulate storage',
        action: 'Process',
        alert: `⚠️ [RED TEAM ALERT] Insecure storage:\nPlaintext: ${password}\nMD5 hash (obsolete): 0192023a7bbd73250516f069df18b500\n* Vulnerable to dictionary attacks and instant rainbow tables.`,
        safe: `🛡️ [BLUE TEAM] Robust cryptography:\nBcrypt hash (secure): $2b$12$Kj9xLWv5hYqP0...\n* Includes automatic salting and adaptive cost factor against brute force.`,
        details: ['Cryptographic failures occur when obsolete algorithms, short keys, or insecure secret storage are used. MD5 and SHA-1, for example, are easy to attack with offline rainbow tables or brute force.', 'The recommendation is to use modern salted hashing functions like Bcrypt, Argon2, or PBKDF2 and keep the infrastructure updated. Security is not only about hiding the data, but protecting it with a solid cryptographic design.'],
      }
    : {
        title: 'Fallos Criptográficos',
        attacker: 'Modo atacante',
        defender: 'Modo defensor',
        placeholder: 'Escribe una contraseña para simular su guardado',
        action: 'Procesar',
        alert: `⚠️ [ALERTA RED TEAM] Almacenamiento Inseguro: \nTexto Plano: ${password} \nHash MD5 (Obsoleto): 0192023a7bbd73250516f069df18b500 \n* Vulnerable a ataques de diccionario y Rainbow Tables instantáneos.`,
        safe: `🛡️ [BLUE TEAM] Criptografía Robusta: \nHash Bcrypt (Seguro): $2b$12$Kj9xLWv5hYqP0... \n* Incluye salting automático y factor de coste adaptativo contra fuerza bruta.`,
        details: ['Los fallos criptográficos aparecen cuando se usan algoritmos obsoletos, claves demasiado cortas o almacenamiento inseguro de secretos. MD5 y SHA-1, por ejemplo, son fácilmente atacables mediante ataques offline con tablas arcoíris o fuerza bruta.', 'La recomendación es usar funciones modernas de hashing con sal, como Bcrypt, Argon2 o PBKDF2, y mantener la infraestructura con bibliotecas actualizadas. La seguridad no depende solo de ocultar los datos, sino de protegerlos con un diseño criptográfico sólido.'],
      };

  const handleHash = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      setOutput(copy.alert);
    } else {
      setOutput(copy.safe);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#cba6f7] mb-4">🛡️ Vulnerabilidad: A02:2021 - {copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 {copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 {copy.defender}</button>
      </div>

      <form onSubmit={handleHash} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder={copy.placeholder}
          className="flex-grow p-2 bg-[#181825] border border-[#313244] rounded text-white text-sm focus:outline-none focus:border-cyan-500"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded text-sm font-bold">{copy.action}</button>
      </form>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] whitespace-pre-line" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// ALMACENAMIENTO INSEGURO (Criptografía débil)\n$password = $_POST['password'];\n$insecure_hash = md5($password); // ¡MD5 está roto y es vulnerable!`
          : `// ALMACENAMIENTO SEGURO (Algoritmo resistente)\n$password = $_POST['password'];\n$secure_hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);`
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
