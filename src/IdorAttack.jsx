import React, { useState } from 'react';

export default function IdorAttack({ language = 'es' }) {
  const [invoiceId, setInvoiceId] = useState('1001');
  const [viewMode, setViewMode] = useState('attacker');
  const [output, setOutput] = useState('');

  const copy = language === 'en'
    ? {
        title: 'Broken access control (IDOR)',
        attacker: 'Attacker mode',
        defender: 'Defender mode',
        placeholder: 'Change the invoice ID (e.g. 1002)',
        action: 'Query',
        invoiceYour: '📄 [Your invoice] ID: 1001 | Customer: Your Name | Total: 45.00€',
        alert: '🚨 [RED TEAM ALERT - IDOR Successful] ID: 1002 | Customer: Global Administrator | Total: 8900.00€ | Exposed data: IBAN ES21 3000...',
        elseText: `📄 Invoice ID ${invoiceId} fetched without verifying your identity.`,
        deny: '🛡️ [BLUE TEAM] Access denied: the requested invoice does not belong to your active session.',
        details: ['An IDOR occurs when the system trusts a client-side identifier without checking whether the resource belongs to the authenticated user. Changing a value like <strong>1001</strong> to <strong>1002</strong> can reveal information that is not yours.', 'The fix is made in the backend: validate the relationship between the current user and the requested resource before returning it. Access control must be enforced in the business logic and not only in the UI.'],
      }
    : {
        title: 'Control de acceso roto (IDOR)',
        attacker: 'Modo atacante',
        defender: 'Modo defensor',
        placeholder: 'Cambia el ID de la factura (Ej: 1002)',
        action: 'Consultar',
        invoiceYour: '📄 [Tu Factura] ID: 1001 | Cliente: Tu Nombre | Total: 45.00€',
        alert: '🚨 [ALERTA RED TEAM - IDOR Exitoso] ID: 1002 | Cliente: Administrador Global | Total: 8900.00€ | Datos expuestos: IBAN ES21 3000...',
        elseText: `📄 Factura ID ${invoiceId} recuperada del sistema sin verificar tu identidad.`,
        deny: '🛡️ [BLUE TEAM] Acceso Denegado: La factura solicitada no pertenece a tu ID de sesión activa.',
        details: ['Un IDOR ocurre cuando el sistema confía en un identificador del cliente sin comprobar que ese recurso pertenece al usuario autenticado. Cambiar un valor como <strong>1001</strong> por <strong>1002</strong> puede revelar información ajena.', 'La corrección suele hacerse en backend: validar la relación entre el usuario actual y el recurso solicitado antes de devolverlo. El control de acceso debe aplicarse en la lógica de negocio, no solo en la interfaz.'],
      };

  const handleFetch = (e) => {
    e.preventDefault();
    if (viewMode === 'attacker') {
      if (invoiceId === '1001') {
        setOutput(copy.invoiceYour);
      } else if (invoiceId === '1002') {
        setOutput(copy.alert);
      } else {
        setOutput(copy.elseText);
      }
    } else {
      if (invoiceId === '1001') {
        setOutput(copy.invoiceYour);
      } else {
        setOutput(copy.deny);
      }
    }
  };

  return (
    <div className="bg-[#11111b] p-6 rounded-lg border border-[#313244]">
      <h3 className="text-xl text-[#f38ba8] mb-4">🛡️ Vulnerabilidad: A01:2021 - {copy.title}</h3>
      
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setViewMode('attacker'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'attacker' ? 'bg-red-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🔴 {copy.attacker}</button>
        <button onClick={() => { setViewMode('defender'); setOutput(''); }} className={`flex-grow p-2 rounded text-xs font-bold ${viewMode === 'defender' ? 'bg-green-500 text-black' : 'bg-[#181825] text-white border border-[#313244]'}`}>🟢 {copy.defender}</button>
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

      {output && <div className="p-3 bg-[#181825] border border-cyan-800 rounded text-xs mb-4 text-[#cdd6f4]" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{output}</div>}

      <pre className="text-[11px] p-3 bg-[#181825] rounded text-[#a6adc8] overflow-x-auto border border-[#313244]">
        {viewMode === 'attacker' 
          ? `// PHP VULNERABLE (Falta control de pertenencia)\n$invoice_id = $_GET['id'];\n$query = "SELECT * FROM invoices WHERE id = $invoice_id";\n// Muestra cualquier factura si el ID existe`
          : `// PHP SEGURO (Validación de propiedad)\n$invoice_id = $_GET['id'];\n$user_id = $_SESSION['user_id'];\n$query = "SELECT * FROM invoices WHERE id = ? AND user_id = ?";\n// Solo muestra la factura si pertenece al usuario logueado`
        }
      </pre>

      <details className="details-panel">
        <summary>{language === 'en' ? 'More details' : 'Más detalles'}</summary>
        <div className="details-content">
          {copy.details.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </details>
    </div>
  );
}
