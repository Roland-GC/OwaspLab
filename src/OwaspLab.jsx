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
  {
    id: 'sql',
    icon: 'DB',
    title: { es: 'Inyección SQL', en: 'SQL Injection' },
    tag: { es: 'INJECTION', en: 'INJECTION' },
    description: {
      es: 'Se manipula una consulta para hacer cosas que no debía.',
      en: 'A query is manipulated to do things it should not.'
    },
    component: SqlInjection,
    details: {
      es: {
        summary: 'La inyección SQL ocurre cuando la aplicación concatena entradas del usuario directamente en la sentencia SQL sin validar ni parametrizar. Un atacante puede cerrar la consulta original y añadir condiciones, comandos o lógica propia.',
        sections: [
          { label: 'Cómo ocurre', text: 'Si el backend hace algo como SELECT * FROM users WHERE id = \" + request.getParameter("id") + \" y el valor llega con caracteres especiales como 1 OR 1=1, el motor de base de datos interpreta una consulta distinta a la prevista.' },
          { label: 'Impacto', text: 'Puede revelar usuarios, contraseñas hash, datos confidenciales, modificar registros o incluso controlar la base de datos completa en entornos mal configurados.' },
          { label: 'Mitigación', text: 'Usa consultas preparadas o sentencias parametrizadas, valida tipos de entrada y limita los permisos del usuario de la base de datos.' }
        ]
      },
      en: {
        summary: 'SQL injection occurs when the application concatenates user input directly into the SQL statement without validation or parameterization. An attacker can close the original query and add conditions, commands, or custom logic.',
        sections: [
          { label: 'How it happens', text: 'If the backend does something like SELECT * FROM users WHERE id = \" + request.getParameter("id") + \" and the value arrives with special characters such as 1 OR 1=1, the database engine interprets a different query than intended.' },
          { label: 'Impact', text: 'It can expose users, password hashes, confidential data, modify records, or even take full control of the database in poorly configured environments.' },
          { label: 'Mitigation', text: 'Use prepared statements, validate input types, and restrict database user permissions to the minimum necessary.' }
        ]
      }
    }
  },
  {
    id: 'xss',
    icon: '</>',
    title: { es: 'Cross-Site Scripting', en: 'Cross-Site Scripting' },
    tag: { es: 'XSS', en: 'XSS' },
    description: {
      es: 'Un atacante inserta código malicioso que se ejecuta en el navegador.',
      en: 'An attacker injects malicious code that executes in the browser.'
    },
    component: XssAttack,
    details: {
      es: {
        summary: 'El XSS se produce cuando una aplicación refleja o almacena contenido no sanitizado y el navegador lo interpreta como HTML o JavaScript. El ataque se ejecuta en la sesión del usuario víctima.',
        sections: [
          { label: 'Cómo ocurre', text: 'Si el código hace echo "<div>" . $_POST["comment"] . "</div>" y el usuario publica <script>alert(1)</script>, el navegador ejecutará ese script en la aplicación.' },
          { label: 'Impacto', text: 'Puede robar cookies de sesión, redirigir a páginas de phishing, manipular el DOM o ejecutar acciones como si el usuario fuera el atacante.' },
          { label: 'Mitigación', text: 'Sanitiza, escapa caracteres HTML y usa bibliotecas o frameworks con protección activa contra XSS.' }
        ]
      },
      en: {
        summary: 'XSS occurs when the application reflects or stores unsanitized content and the browser interprets it as HTML or JavaScript. The attack runs in the victim user session.',
        sections: [
          { label: 'How it happens', text: 'If the code does echo "<div>" . $_POST["comment"] . "</div>" and the user posts <script>alert(1)</script>, the browser will execute that script in the app.' },
          { label: 'Impact', text: 'It can steal session cookies, redirect to phishing pages, manipulate the DOM, or perform actions as if the user were the attacker.' },
          { label: 'Mitigation', text: 'Sanitize and escape HTML characters and use libraries or frameworks with built-in XSS protection.' }
        ]
      }
    }
  },
  {
    id: 'idor',
    icon: 'ID',
    title: { es: 'Control de acceso', en: 'Access control' },
    tag: { es: 'IDOR', en: 'IDOR' },
    description: {
      es: 'Permite ver o cambiar recursos sin tener permiso para ello.',
      en: 'Allows viewing or changing resources without permission.'
    },
    component: IdorAttack,
    details: {
      es: {
        summary: 'El IDOR (Insecure Direct Object Reference) aparece cuando el sistema acepta un identificador del recurso sin comprobar si el usuario actual tiene permiso para acceder a ese objeto.',
        sections: [
          { label: 'Cómo ocurre', text: 'Una URL como /facturas?id=1002 puede devolver otra factura aunque el usuario autenticado no sea propietario o no tenga permisos sobre ella.' },
          { label: 'Impacto', text: 'Permite visualizar, editar o eliminar datos ajenos, como facturas, perfiles, archivos o permisos, sin autorización adecuada.' },
          { label: 'Mitigación', text: 'Verifica la pertenencia del recurso con la identidad del usuario, no solo con la existencia del ID, y aplica políticas de acceso por objeto.' }
        ]
      },
      en: {
        summary: 'IDOR occurs when the system accepts a resource identifier without checking whether the current user has permission to access that object.',
        sections: [
          { label: 'How it happens', text: 'A URL such as /invoices?id=1002 can return another invoice even if the authenticated user is not the owner or lacks permission.' },
          { label: 'Impact', text: 'It allows viewing, editing, or deleting other users data such as invoices, profiles, files, or permissions without proper authorization.' },
          { label: 'Mitigation', text: 'Verify the resource ownership against the user identity instead of only checking whether the ID exists, and apply object-level access policies.' }
        ]
      }
    }
  },
  {
    id: 'crypto',
    icon: '#',
    title: { es: 'Fallos criptográficos', en: 'Cryptographic failures' },
    tag: { es: 'CRYPTO', en: 'CRYPTO' },
    description: {
      es: 'Se usan algoritmos o claves débiles y la información queda expuesta.',
      en: 'Weak algorithms or keys are used and information becomes exposed.'
    },
    component: CryptoFailures,
    details: {
      es: {
        summary: 'Los fallos criptográficos aparecen cuando se usan algoritmos obsoletos, configuraciones débiles o almacenamiento inseguro de contraseñas y secretos.',
        sections: [
          { label: 'Cómo ocurre', text: 'Usar MD5, SHA1 o almacenar contraseñas en texto plano permite que un atacante compare hashes rápidamente o los rompa con diccionarios y tablas arcoíris.' },
          { label: 'Impacto', text: 'Los atacantes pueden recuperar contraseñas, comprometer sesiones o descifrar información ordinaria si la criptografía no es robusta.' },
          { label: 'Mitigación', text: 'Usa algoritmos modernos como bcrypt, Argon2 o PBKDF2, con sal aleatoria y una política de longitud y rotación de claves segura.' }
        ]
      },
      en: {
        summary: 'Cryptographic failures happen when obsolete algorithms, weak configurations, or insecure storage of passwords and secrets are used.',
        sections: [
          { label: 'How it happens', text: 'Using MD5, SHA1, or storing passwords in plain text allows attackers to compare hashes quickly or crack them with dictionaries and rainbow tables.' },
          { label: 'Impact', text: 'Attackers can recover passwords, compromise sessions, or decrypt ordinary data if the cryptography is not strong enough.' },
          { label: 'Mitigation', text: 'Use modern algorithms like bcrypt, Argon2, or PBKDF2 with random salts and a secure key-rotation policy.' }
        ]
      }
    }
  },
  {
    id: 'misconfig',
    icon: '⚙',
    title: { es: 'Mala configuración', en: 'Security misconfiguration' },
    tag: { es: 'CONFIG', en: 'CONFIG' },
    description: {
      es: 'La app o el servidor está abierto por error a ataques por defecto.',
      en: 'The app or server is inadvertently exposed to default attacks.'
    },
    component: MisconfigAttack,
    details: {
      es: {
        summary: 'La mala configuración es un error operacional y de seguridad: mostrar errores detallados, dejar listados directorios, exponer archivos de configuración o activar funciones invasivas por defecto.',
        sections: [
          { label: 'Cómo ocurre', text: 'Activar display_errors, permitir Options Indexes o dejar copias de seguridad de configuración accesibles facilita que un atacante enumere rutas, claves y arquitectura interna del sistema.' },
          { label: 'Impacto', text: 'Abre la puerta a enumeración, explotación de vulnerabilidades, robo de credenciales y acceso lateral a servicios sensibles.' },
          { label: 'Mitigación', text: 'Desactiva mensajes detallados, bloquea listados de carpetas, elimina archivos de respaldo, usa hardening del servidor y revisa configuraciones por defecto.' }
        ]
      },
      en: {
        summary: 'Security misconfiguration is an operational and security error: showing detailed errors, leaving directory listings enabled, exposing config files, or activating invasive features by default.',
        sections: [
          { label: 'How it happens', text: 'Enabling display_errors, allowing Options Indexes, or leaving backup config files accessible makes it easy for an attacker to enumerate paths, keys, and internal system architecture.' },
          { label: 'Impact', text: 'It opens the door to enumeration, exploitation of vulnerabilities, credential theft, and lateral access to sensitive services.' },
          { label: 'Mitigation', text: 'Disable detailed error messages, block folder listing, remove backup files, harden the server, and review default configurations.' }
        ]
      }
    }
  },
  {
    id: 'outdated',
    icon: '↻',
    title: { es: 'Componentes vulnerables', en: 'Vulnerable components' },
    tag: { es: 'SCA', en: 'SCA' },
    description: {
      es: 'Librerías antiguas tienen fallos conocidos que cualquiera puede explotar.',
      en: 'Old libraries have known flaws that anyone can exploit.'
    },
    component: OutdatedComponents,
    details: {
      es: {
        summary: 'Cuando una aplicación usa librerías, frameworks o módulos desactualizados, queda expuesta a vulnerabilidades conocidas documentadas en CVEs.',
        sections: [
          { label: 'Cómo ocurre', text: 'Un paquete vulnerable como Log4j 2.14.1 puede seguir instalado y ser explotado por entradas de usuario no confiables si el sistema las procesa en un contexto peligroso.' },
          { label: 'Impacto', text: 'Los fallos de dependencias pueden permitir ejecución remota de código, robo de datos o acceso completo al servidor sin necesidad de explotar una vulnerabilidad propia del sistema.' },
          { label: 'Mitigación', text: 'Mantén un proceso de actualización y auditoría constante con herramientas como npm audit, Snyk, Dependabot o escáneres de composición de software.' }
        ]
      },
      en: {
        summary: 'When an application uses outdated libraries, frameworks, or modules, it becomes exposed to known vulnerabilities documented in CVEs.',
        sections: [
          { label: 'How it happens', text: 'A vulnerable package such as Log4j 2.14.1 may remain installed and be exploited by untrusted user input when the system processes it in a dangerous context.' },
          { label: 'Impact', text: 'Dependency flaws can allow remote code execution, data theft, or full server access without exploiting a vulnerability in the app itself.' },
          { label: 'Mitigation', text: 'Maintain a constant update and audit process with tools such as npm audit, Snyk, Dependabot, or software composition analysis scanners.' }
        ]
      }
    }
  },
  {
    id: 'jwt',
    icon: '{}',
    title: { es: 'Manipulación JWT', en: 'JWT manipulation' },
    tag: { es: 'JWT', en: 'JWT' },
    description: {
      es: 'Se altera el token para fingir otra identidad o permisos.',
      en: 'The token is altered to impersonate another identity or permissions.'
    },
    component: JwtAttack,
    details: {
      es: {
        summary: 'Los JWT son tokens firmados y, si el backend no verifica la firma o acepta algoritmos inseguros, un atacante puede modificar el payload y hacer pasar el token como si fuera válido.',
        sections: [
          { label: 'Cómo ocurre', text: 'Cuando se usa jwt.decode() sin verificar la firma o se permite alg=none o algoritmos no esperados, el atacante puede cambiar roles o identidades en el payload.' },
          { label: 'Impacto', text: 'El intruso puede escalar privilegios, hacerse pasar por administrador o acceder a endpoints protegidos con identidad falsa.' },
          { label: 'Mitigación', text: 'Verifica la firma con una clave secreta segura, restringe algoritmos permitidos, valida expiración y no confíes en el payload sin comprobación.' }
        ]
      },
      en: {
        summary: 'JWTs are signed tokens, and if the backend does not verify the signature or accepts insecure algorithms, an attacker can modify the payload and present the token as valid.',
        sections: [
          { label: 'How it happens', text: 'When jwt.decode() is used without verifying the signature, or alg=none or unexpected algorithms are allowed, the attacker can change roles or identities in the payload.' },
          { label: 'Impact', text: 'The intruder can escalate privileges, impersonate an administrator, or access protected endpoints with false identity.' },
          { label: 'Mitigation', text: 'Verify the signature with a secure secret, restrict allowed algorithms, validate expiration, and do not trust the payload without verification.' }
        ]
      }
    }
  },
  {
    id: 'bola',
    icon: 'API',
    title: { es: 'Autorización BOLA', en: 'BOLA authorization' },
    tag: { es: 'BOLA', en: 'BOLA' },
    description: {
      es: 'Se accede a objetos o endpoints ajenos simplemente cambiando un identificador.',
      en: 'Access is gained to other objects or endpoints simply by changing an identifier.'
    },
    component: BolaAttack,
    details: {
      es: {
        summary: 'La autorización BOLA ocurre cuando una API valida la autenticación del usuario pero no comprueba si ese usuario puede operar sobre el objeto concreto solicitado.',
        sections: [
          { label: 'Cómo ocurre', text: 'La ruta /api/v1/users/110/profile se ejecuta sin comprobar que el usuario autenticado sea el mismo 110 o tenga permisos administrativos para ese recurso.' },
          { label: 'Impacto', text: 'Un usuario puede leer o modificar perfiles, pedidos, archivos o datos de terceros solo alterando el ID en la URL o el payload.' },
          { label: 'Mitigación', text: 'En cada acceso, compara el ID del recurso con la identidad del usuario autenticado y aplica permisos por objeto y por acción.' }
        ]
      },
      en: {
        summary: 'BOLA authorization occurs when an API validates the user authentication but does not check whether that user can operate on the specific object requested.',
        sections: [
          { label: 'How it happens', text: 'The route /api/v1/users/110/profile executes without verifying that the authenticated user is the same 110 or has administrative rights over that resource.' },
          { label: 'Impact', text: 'A user can read or modify profiles, orders, files, or third-party data simply by altering the ID in the URL or payload.' },
          { label: 'Mitigation', text: 'On every request, compare the resource ID with the authenticated user identity and enforce object- and action-based permissions.' }
        ]
      }
    }
  },
];

function ModuleDetail({ module, language }) {
  const details = module.details?.[language];

  if (!details) return null;

  return (
    <section className="module-detail-panel" aria-label={language === 'en' ? `Detailed description of ${module.title[language]}` : `Descripción detallada de ${module.title[language]}`}>
      <div className="module-detail-header">
        <span className="section-kicker">{language === 'en' ? 'DETAILED DESCRIPTION' : 'DESCRIPCIÓN DETALLADA'}</span>
        <h3>{module.title[language]}</h3>
      </div>
      <p className="detail-summary">{details.summary}</p>
      <div className="detail-grid">
        {details.sections.map((section) => (
          <article key={section.label} className="detail-card">
            <h4>{section.label}</h4>
            <p>{section.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function OwaspLab() {
  const [language, setLanguage] = useState('es');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sql');
  const [showDetails, setShowDetails] = useState(false);
  const activeModule = modules.find((module) => module.id === activeTab) ?? modules[0];
  const ActiveComponent = activeModule.component;

  const languageOptions = [
    { value: 'es', label: '🇪🇸 ES' },
    { value: 'en', label: '🇺🇸 US' }
  ];

  const copy = {
    es: {
      eyebrow: 'OWASP SECURITY PLAYGROUND',
      status: 'ENTORNO SEGURO',
      title: 'Aprende seguridad',
      highlight: 'haciendo.',
      hero: 'Un laboratorio interactivo para explorar vulnerabilidades web y aprender a prevenirlas.',
      start: 'Comando de inicio',
      modules: 'MÓDULOS DE PRÁCTICA',
      choose: 'Elige un escenario',
      scenario: 'Escenarios de seguridad',
      more: 'Saber más',
      less: 'Ocultar información',
      footer: 'Solo para aprendizaje y pruebas locales',
      languageLabel: 'Idioma',
      languageOptions: { es: 'Español', en: 'English' }
    },
    en: {
      eyebrow: 'OWASP SECURITY PLAYGROUND',
      status: 'SAFE ENVIRONMENT',
      title: 'Learn security',
      highlight: 'by doing.',
      hero: 'An interactive lab to explore web vulnerabilities and learn how to prevent them.',
      start: 'Start command',
      modules: 'PRACTICE MODULES',
      choose: 'Choose a scenario',
      scenario: 'Security scenarios',
      more: 'Learn more',
      less: 'Hide information',
      footer: 'For learning and local testing only',
      languageLabel: 'Language',
      languageOptions: { es: 'Español', en: 'English' }
    }
  }[language];

  const handleTabChange = (nextTab) => {
    setActiveTab(nextTab);
    setShowDetails(false);
  };

  return (
    <main className="lab-shell">
      <header className="hero">
        <div className="hero-topline">
          <span className="brand-mark" aria-hidden="true">&gt;_</span>
          <span className="eyebrow">{copy.eyebrow}</span>
          <span className="status-pill"><span className="status-dot" /> {copy.status}</span>
          <div className="language-switch" aria-label={copy.languageLabel}>
            <button
              type="button"
              className="language-button"
              onClick={() => setLanguageMenuOpen((current) => !current)}
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}
            >
              {languageOptions.find((option) => option.value === language)?.label}
            </button>

            {languageMenuOpen && (
              <div className="language-menu" role="menu" aria-label={copy.languageLabel}>
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`language-option ${language === option.value ? 'active' : ''}`}
                    role="menuitemradio"
                    aria-checked={language === option.value}
                    onClick={() => {
                      setLanguage(option.value);
                      setLanguageMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <h1>{copy.title} <span>{copy.highlight}</span></h1>
        <p className="hero-copy">{copy.hero}</p>
        <div className="terminal-command" aria-label={copy.start}>
          <span className="terminal-prompt">$</span>
          <span>owasp_top10_playground</span>
          <span className="terminal-flag">--run</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </div>
      </header>

      <section className="workspace" aria-label="Laboratorio interactivo">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{copy.modules}</span>
            <h2>{copy.choose}</h2>
          </div>
          <span className="module-count">0{modules.length} {language === 'en' ? 'MODULES' : 'MÓDULOS'}</span>
        </div>

        <div className="tabs" role="tablist" aria-label={copy.scenario}>
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              id={`tab-${module.id}`}
              role="tab"
              aria-selected={activeTab === module.id}
              aria-controls="module-panel"
              onClick={() => handleTabChange(module.id)}
              className={`tab-button ${activeTab === module.id ? 'active' : ''}`}
            >
              <span className={`tab-icon module-icon-${module.id}`} aria-hidden="true">{module.icon}</span>
              <span className="tab-label">
                <strong>{module.title[language]}</strong>
                <small>{module.tag[language]}</small>
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

          {activeModule.details && (
            <button
              type="button"
              className="more-details-button"
              onClick={() => setShowDetails((current) => !current)}
              aria-expanded={showDetails}
            >
              {showDetails ? copy.less : copy.more}
            </button>
          )}

          {showDetails && activeModule.details && <ModuleDetail module={activeModule} language={language} />}
        </div>
      </section>

      <footer className="page-footer">
        <span><span className="footer-dot" /> {language === 'en' ? 'PRACTICE · LEARN · PROTECT' : 'PRACTICA · APRENDE · PROTEGE'}</span>
        <span>{copy.footer}</span>
      </footer>
    </main>
  );
}
