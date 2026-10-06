import React, { useState } from 'react';

export default function IdorAttack() {
  const [invoiceId, setInvoiceId] = useState('1001');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handleFetch = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (invoiceId === '1001') {
        setOutput("📄 [Tu Factura] ID: 1001 | Cliente: Tu Nombre | Total: 45.00€");
      } else if (invoiceId === '1002') {
        setOutput("🚨 [ALERTA RED TEAM - IDOR Exitoso] ID: 1002 | Cliente: Administrador Global | Total: 8900.00€ | Datos expuestos: IBAN ES21 3000...");
      } else {
        setOutput(`📄 Factura ID ${invoiceId} recuperada del sistema sin verificar tu identidad.`);
      }
    } else {
      if (invoiceId === '1001') {
        setOutput("📄 [Tu Factura] ID: 1001 | Cliente: Tu Nombre | Total: 45.00€");
      } else {
        setOutput("🛡️ [BLUE TEAM] Acceso Denegado: La factura solicitada no pertenece a tu ID de sesión activa.");
      }
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#f38ba8] mb-4">🛡️ Vulnerabilidad: A01:2021 - Control de Acceso Roto (IDOR)</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 Modo Atacante</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 Modo Defensor</button>
      </div>

      <form onSubmit={handleFetch} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={invoiceId} 
          onChange={(e) => setInvoiceId(e.target.value)}
          placeholder="Cambia el ID de la factura (Ej: 1002)" 
          className="flex-grow p-2 bg-[#181825] border border-[#313244] rounded text-white text-sm focus:outline-none focus:border-cyan-500"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded text-sm font-bold">Consultar</button>
      </form>

      {output && <div className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4]">{output}</div>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// PHP VULNERABLE (Falta control de pertenencia)\n$invoice_id = $_GET['id'];\n$query = "SELECT * FROM invoices WHERE id = $invoice_id";\n// Muestra cualquier factura si el ID existe`
          : `// PHP SEGURO (Validación de propiedad)\n$invoice_id = $_GET['id'];\n$user_id = $_SESSION['user_id'];\n$query = "SELECT * FROM invoices WHERE id = ? AND user_id = ?";\n// Solo muestra la factura si pertenece al usuario logueado`
        }
      </pre>
    </div>
  );
}
