import React, { useState } from 'react';
import SqlInjection from './SqlInjection';
import XssAttack from './XssAttack';
import IdorAttack from './IdorAttack';
import CryptoFailures from './CryptoFailures';
import MisconfigAttack from './MisconfigAttack';
import OutdatedComponents from './OutdatedComponents';
import JwtAttack from './JwtAttack';
import BolaAttack from './BolaAttack';

const modules = [
  { id: 'sql', icon: 'DB', title: 'Inyección SQL', tag: 'A03 · INJECTION', description: 'Se manipula una consulta para hacer cosas que no debía.', component: SqlInjection },
  { id: 'xss', icon: '</>', title: 'Cross-Site Scripting', tag: 'A03 · XSS', description: 'Un atacante inserta código malicioso que se ejecuta en el navegador.', component: XssAttack },
  { id: 'idor', icon: 'ID', title: 'Control de acceso', tag: 'A01 · IDOR', description: 'Permite ver o cambiar recursos sin tener permiso para ello.', component: IdorAttack },
  { id: 'crypto', icon: '#', title: 'Fallos criptográficos', tag: 'A02 · CRYPTO', description: 'Se usan algoritmos o claves débiles y la información queda expuesta.', component: CryptoFailures },
  { id: 'misconfig', icon: '⚙', title: 'Mala configuración', tag: 'A05 · CONFIG', description: 'La app o el servidor está abierto por error a ataques por defecto.', component: MisconfigAttack },
  { id: 'outdated', icon: '↻', title: 'Componentes vulnerables', tag: 'A06 · SCA', description: 'Librerías antiguas tienen fallos conocidos que cualquiera puede explotar.', component: OutdatedComponents },
  { id: 'jwt', icon: '{}', title: 'Manipulación JWT', tag: 'AUTH · JWT', description: 'Se altera el token para fingir otra identidad o permisos.', component: JwtAttack },
  { id: 'bola', icon: 'API', title: 'Autorización BOLA', tag: 'API1 · BOLA', description: 'Se accede a objetos o endpoints ajenos simplemente cambiando un identificador.', component: BolaAttack },
];

export default function OwaspLab() {
  const [activeTab, setActiveTab] = useState('sql');
  const activeModule = modules.find((module) => module.id === activeTab) ?? modules[0];
  const ActiveComponent = activeModule.component;

  return (
    <main className="lab-shell">
      <header className="hero">
        <div className="hero-topline">
          <span className="brand-mark" aria-hidden="true">&gt;_</span>
          <span className="eyebrow">OWASP SECURITY PLAYGROUND</span>
          <span className="status-pill"><span className="status-dot" /> ENTORNO SEGURO</span>
        </div>
        <h1>Aprende seguridad <span>haciendo.</span></h1>
        <p className="hero-copy">
          Un laboratorio interactivo para explorar vulnerabilidades web y aprender a prevenirlas.
        </p>
        <div className="terminal-command" aria-label="Comando de inicio">
          <span className="terminal-prompt">$</span>
          <span>owasp_top10_playground</span>
          <span className="terminal-flag">--run</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </div>
      </header>

      <section className="workspace" aria-label="Laboratorio interactivo">
        <div className="section-heading">
          <div>
            <span className="section-kicker">MÓDULOS DE PRÁCTICA</span>
            <h2>Elige un escenario</h2>
          </div>
          <span className="module-count">0{modules.length} MÓDULOS</span>
        </div>

        <div className="tabs" role="tablist" aria-label="Escenarios de seguridad">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              id={`tab-${module.id}`}
              role="tab"
              aria-selected={activeTab === module.id}
              aria-controls="module-panel"
              onClick={() => setActiveTab(module.id)}
              className={`tab-button ${activeTab === module.id ? 'active' : ''}`}
            >
              <span className={`tab-icon module-icon-${module.id}`} aria-hidden="true">{module.icon}</span>
              <span className="tab-label">
                <strong>{module.title}</strong>
                <small>{module.tag}</small>
                <span className="tab-description">{module.description}</span>
              </span>
              <span className="tab-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div
          id="module-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeModule.id}`}
          className="module-panel"
        >
          <ActiveComponent />
        </div>
      </section>

      <footer className="page-footer">
        <span><span className="footer-dot" /> PRACTICA · APRENDE · PROTEGE</span>
        <span>Solo para aprendizaje y pruebas locales</span>
      </footer>
    </main>
  );
}
