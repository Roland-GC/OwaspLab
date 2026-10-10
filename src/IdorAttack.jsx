import React, { useState } from 'react';

export default function IdorAttack({ language = 'es' }) {
  const copy = {
    es: {
      title: '🛡️ Vulnerabilidad: A01:2021 - Control de Acceso Roto (IDOR)',
      attacker: '🔴 Modo Atacante',
      defender: '🟢 Modo Defensor',
      placeholder: 'Cambia el ID de la factura (Ej: 1002)',
      action: 'Consultar',
      ownInvoice: '📄 [Tu Factura] ID: 1001 | Cliente: Tu Nombre | Total: 45.00€',
      adminInvoice: '🚨 [ALERTA RED TEAM - IDOR Exitoso] ID: 1002 | Cliente: Administrador Global | Total: 8900.00€ | Datos expuestos: IBAN ES21 3000...',
      generic: '📄 Factura ID ',
      denied: '🛡️ [BLUE TEAM] Acceso Denegado: La factura solicitada no pertenece a tu ID de sesión activa.'
    },
    en: {
      title: '🛡️ Vulnerability: A01:2021 - Broken Access Control (IDOR)',
      attacker: '🔴 Attacker mode',
      defender: '🟢 Defender mode',
      placeholder: 'Change the invoice ID (Example: 1002)',
      action: 'Query',
      ownInvoice: '📄 [Your Invoice] ID: 1001 | Customer: Your Name | Total: 45.00€',
      adminInvoice: '🚨 [RED TEAM ALERT - IDOR Successful] ID: 1002 | Customer: Global Administrator | Total: 8900.00€ | Exposed data: IBAN ES21 3000...',
      generic: '📄 Invoice ID ',
      denied: '🛡️ [BLUE TEAM] Access denied: the requested invoice does not belong to your active session user ID.'
    }
  }[language];

  const [invoiceId, setInvoiceId] = useState('1001');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const handleFetch = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (invoiceId === '1001') {
        setOutput(copy.ownInvoice);
      } else if (invoiceId === '1002') {
        setOutput(copy.adminInvoice);
      } else {
        setOutput(`${copy.generic}${invoiceId} recovered from the system without verifying your identity.`);
      }
    } else {
      if (invoiceId === '1001') {
        setOutput(copy.ownInvoice);
      } else {
        setOutput(copy.denied);
      }
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#f38ba8] mb-4">{copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>{copy.defender}</button>
      </div>

      <form onSubmit={handleFetch} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={invoiceId} 
          onChange={(e) => setInvoiceId(e.target.value)}
          placeholder={copy.placeholder} 
          className="flex-grow p-2 bg-[#181825] border border-[#313244] rounded text-white text-sm focus:outline-none focus:border-cyan-500"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 rounded text-sm font-bold">{copy.action}</button>
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
