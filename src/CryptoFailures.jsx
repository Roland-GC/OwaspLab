import React, { useState } from 'react';

export default function CryptoFailures({ language = 'es' }) {
  const copy = {
    es: {
      title: '🛡️ Vulnerabilidad: A02:2021 - Fallos Criptográficos',
      attacker: '🔴 Modo Atacante',
      defender: '🟢 Modo Defensor',
      placeholder: 'Escribe una contraseña para simular su guardado',
      button: 'Procesar',
      unsafe: `⚠️ [ALERTA RED TEAM] Almacenamiento Inseguro: \nTexto Plano: ${'${password}'} \nHash MD5 (Obsoleto): 0192023a7bbd73250516f069df18b500 \n* Vulnerable a ataques de diccionario y Rainbow Tables instantáneos.`,
      safe: `🛡️ [BLUE TEAM] Criptografía Robusta: \nHash Bcrypt (Seguro): $2b$12$Kj9xLWv5hYqP0... \n* Incluye salting automático y factor de coste adaptativo contra fuerza bruta.`
    },
    en: {
      title: '🛡️ Vulnerability: A02:2021 - Cryptographic Failures',
      attacker: '🔴 Attacker mode',
      defender: '🟢 Defender mode',
      placeholder: 'Type a password to simulate saving it',
      button: 'Process',
      unsafe: `⚠️ [RED TEAM ALERT] Insecure storage: \nPlain text: ${'${password}'} \nMD5 hash (obsolete): 0192023a7bbd73250516f069df18b500 \n* Vulnerable to dictionary and instant rainbow table attacks.`,
      safe: `🛡️ [BLUE TEAM] Strong cryptography: \nBcrypt hash (Secure): $2b$12$Kj9xLWv5hYqP0... \n* Includes automatic salting and adaptive cost factor against brute force.`
    }
  }[language];

  const [password, setPassword] = useState('admin123');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handleHash = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      setOutput(copy.unsafe.replace('${password}', password));
    } else {
      setOutput(copy.safe);
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#cba6f7] mb-4">{copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.defender}</button>
      </div>

      <form onSubmit={handleHash} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder={copy.placeholder} 
          className="flex-grow p-2 bg-[#181825] border border-[#313244] rounded text-white text-sm focus:outline-none focus:border-cyan-500"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded text-sm font-bold">{copy.button}</button>
      </form>

      {output && <pre className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4] whitespace-pre-line">{output}</pre>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// ALMACENAMIENTO INSEGURO (Criptografía débil)\n$password = $_POST['password'];\n$insecure_hash = md5($password); // ¡MD5 está roto y es vulnerable!`
          : `// ALMACENAMIENTO SEGURO (Algoritmo resistente)\n$password = $_POST['password'];\n$secure_hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);`
        }
      </pre>
    </div>
  );
}
