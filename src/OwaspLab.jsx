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
  { id: 'sql', icon: 'DB', title: { es: 'Inyección SQL', en: 'SQL Injection' }, tag: 'A03 · INJECTION', description: { es: 'Se manipula una consulta para hacer cosas que no debía.', en: 'A query is manipulated to do things it was never meant to do.' }, component: SqlInjection },
  { id: 'xss', icon: '</>', title: { es: 'Cross-Site Scripting', en: 'Cross-Site Scripting' }, tag: 'A03 · XSS', description: { es: 'Un atacante inserta código malicioso que se ejecuta en el navegador.', en: 'An attacker injects malicious code that runs in the user browser.' }, component: XssAttack },
  { id: 'idor', icon: 'ID', title: { es: 'Control de acceso', en: 'Access control' }, tag: 'A01 · IDOR', description: { es: 'Permite ver o cambiar recursos sin tener permiso para ello.', en: 'Allows viewing or changing resources without proper permission.' }, component: IdorAttack },
  { id: 'crypto', icon: '#', title: { es: 'Fallos criptográficos', en: 'Cryptographic failures' }, tag: 'A02 · CRYPTO', description: { es: 'Se usan algoritmos o claves débiles y la información queda expuesta.', en: 'Weak algorithms or keys are used and sensitive data becomes exposed.' }, component: CryptoFailures },
  { id: 'misconfig', icon: '⚙', title: { es: 'Mala configuración', en: 'Security misconfiguration' }, tag: 'A05 · CONFIG', description: { es: 'La app o el servidor está abierto por error a ataques por defecto.', en: 'The app or server is left exposed by default or misconfigured.' }, component: MisconfigAttack },
  { id: 'outdated', icon: '↻', title: { es: 'Componentes vulnerables', en: 'Vulnerable components' }, tag: 'A06 · SCA', description: { es: 'Librerías antiguas tienen fallos conocidos que cualquiera puede explotar.', en: 'Outdated libraries have known vulnerabilities that attackers can exploit.' }, component: OutdatedComponents },
  { id: 'jwt', icon: '{}', title: { es: 'Manipulación JWT', en: 'JWT manipulation' }, tag: 'AUTH · JWT', description: { es: 'Se altera el token para fingir otra identidad o permisos.', en: 'The token is altered to impersonate another identity or privileges.' }, component: JwtAttack },
  { id: 'bola', icon: 'API', title: { es: 'Autorización BOLA', en: 'BOLA authorization' }, tag: 'API1 · BOLA', description: { es: 'Se accede a objetos o endpoints ajenos simplemente cambiando un identificador.', en: 'Attackers access other users data by changing object identifiers.' }, component: BolaAttack },
];

const copy = {
  es: {
    status: 'ENTORNO SEGURO',
    intro: 'Aprende seguridad',
    introAccent: 'haciendo.',
    description: 'Un laboratorio interactivo para explorar vulnerabilidades web y aprender a prevenirlas.',
    modulesLabel: 'MÓDULOS DE PRÁCTICA',
    chooserTitle: 'Elige un escenario',
    modulesCount: 'MÓDULOS',
    labAria: 'Laboratorio interactivo',
    scenarioAria: 'Escenarios de seguridad',
    tagline: 'PRACTICA · APRENDE · PROTEGE',
    footer: 'Solo para aprendizaje y pruebas locales',
  },
  en: {
    status: 'SAFE ENVIRONMENT',
    intro: 'Learn security',
    introAccent: 'by doing.',
    description: 'An interactive lab to explore web vulnerabilities and learn how to prevent them.',
    modulesLabel: 'PRACTICE MODULES',
    chooserTitle: 'Choose a scenario',
    modulesCount: 'MODULES',
    labAria: 'Interactive lab',
    scenarioAria: 'Security scenarios',
    tagline: 'PRACTICE · LEARN · PROTECT',
    footer: 'For learning and local testing only',
  },
};

export default function OwaspLab() {
  const [language, setLanguage] = useState('es');
  const [activeTab, setActiveTab] = useState('sql');
  const activeModule = modules.find((module) => module.id === activeTab) ?? modules[0];
  const ActiveComponent = activeModule.component;
  const t = copy[language];

  return (
    <main className="lab-shell">
      <header className="hero">
        <div className="hero-topline">
          <span className="brand-mark" aria-hidden="true">&gt;_</span>
          <span className="eyebrow">OWASP SECURITY PLAYGROUND</span>
          <div className="lang-switch" aria-label="Selector de idioma">
            <button type="button" className={language === 'es' ? 'lang-option active' : 'lang-option'} onClick={() => setLanguage('es')} aria-pressed={language === 'es'}>ES</button>
            <button type="button" className={language === 'en' ? 'lang-option active' : 'lang-option'} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>ENG</button>
          </div>
          <span className="status-pill"><span className="status-dot" /> {t.status}</span>
        </div>
        <h1>{t.intro} <span>{t.introAccent}</span></h1>
        <p className="hero-copy">
          {t.description}
        </p>
        <div className="terminal-command" aria-label="Comando de inicio">
          <span className="terminal-prompt">$</span>
          <span>owasp_top10_playground</span>
          <span className="terminal-flag">--run</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </div>
      </header>

      <section className="workspace" aria-label={t.labAria}>
        <div className="section-heading">
          <div>
            <span className="section-kicker">{t.modulesLabel}</span>
            <h2>{t.chooserTitle}</h2>
          </div>
          <span className="module-count">0{modules.length} {t.modulesCount}</span>
        </div>

        <div className="tabs" role="tablist" aria-label={t.scenarioAria}>
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
                <strong>{module.title[language]}</strong>
                <small>{module.tag}</small>
                <span className="tab-description">{module.description[language]}</span>
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
          <ActiveComponent language={language} />
        </div>
      </section>

      <footer className="page-footer">
        <span><span className="footer-dot" /> {t.tagline}</span>
        <span>{t.footer}</span>
      </footer>
    </main>
  );
}
