# Arquitectura del Portafolio

## 🎯 Resumen Ejecutivo

Portafolio personal construido con **tecnologías web vanilla** (HTML5, CSS3, JavaScript ES6+) sin frameworks. Diseñado para ser simple, rápido, mantenible y fácil de desplegar en cualquier servidor estático.

---

## 📚 Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Custom properties, gradientes, animaciones, grid/flexbox
- **JavaScript ES6+**: Vanilla JS sin dependencias
- **Font Awesome 6.4.0**: Iconografía

### Infraestructura
- **Web Server**: Nginx Alpine (Docker)
- **Containerización**: Docker + Docker Compose
- **Port**: 3002 (configurable en docker-compose.yml)

### Sin Build Tools
✅ No hay npm/yarn  
✅ No hay bundlers (webpack, vite, etc.)  
✅ No hay transpiladores  
✅ Archivos servidos directamente  

---

## 🏗️ Estructura del Proyecto

```
portafolio/
├── public/                    # Todo el código fuente
│   ├── index.html            # SPA principal (4200+ líneas)
│   ├── css/
│   │   └── styles.css        # Sistema completo de diseño (900+ líneas)
│   ├── js/
│   │   └── main.js           # Toda la interactividad
│   ├── img/                  # Imágenes del portafolio
│   └── assets/               # Assets adicionales
├── .copilot/
│   ├── docs/
│   │   ├── arquitectura.md   # Este archivo
│   │   └── instrucciones.md  # Metodología de 12 pasos
│   ├── testing/
│   │   └── plan-pruebas-funcionales.md
│   └── tools/                # Scripts de automatización (futuro)
├── Dockerfile                # Nginx Alpine simple
├── docker-compose.yml        # Orquestación
└── README.md                 # Documentación principal
```

---

## 🎨 Sistema de Diseño

### Variables CSS (`:root`)
```css
/* Colores principales */
--primary-color: #667eea
--secondary-color: #764ba2
--accent-color: #f093fb

/* Gradientes */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
--gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)

/* Temas (Light/Dark) */
[data-theme="light"] { --bg-primary: #ffffff, --text-primary: #2d3748 }
[data-theme="dark"] { --bg-primary: #1a202c, --text-primary: #f7fafc }
```

### Breakpoints Responsive
- **Mobile**: < 768px (1 columna, menú hamburguesa)
- **Tablet**: 768px - 991px (2 columnas)
- **Desktop**: ≥ 992px (3+ columnas, menú horizontal)

---

## 🧩 Componentes y Secciones

### 1. **Navigation Bar**
- Sticky scroll con cambio de fondo
- Menú hamburguesa en mobile
- Active link highlighting
- Theme toggle (luna/sol)
- Smooth scroll a secciones

### 2. **Hero Section**
- Título + typing effect animado
- 4 textos rotando: "Full Stack Developer", "Frontend Specialist", "Backend Engineer", "DevOps Enthusiast"
- Shapes flotantes en background
- Enlaces sociales (GitHub, LinkedIn, Email, Twitter)
- CTA buttons

### 3. **About Section**
- Descripción personal
- 3 stat cards:
  - 3+ años de experiencia
  - 20+ proyectos completados
  - 15+ clientes satisfechos
- Fade-in animation al scroll

### 4. **Skills Section**
- 3 categorías de habilidades:
  - **Frontend**: HTML5, CSS3, JavaScript, React, Vue, TypeScript, Tailwind CSS
  - **Backend**: Node.js, Python, PHP, Express, Django, REST APIs, GraphQL
  - **DevOps**: Docker, Git, Linux, CI/CD, AWS, Nginx, MongoDB, PostgreSQL
- Progress bars animadas con porcentajes
- Animation trigger con Intersection Observer

### 5. **Projects Section**
- Filtros: All | Web | Mobile | API
- 6 proyectos de ejemplo:
  1. E-Commerce Platform (web)
  2. Task Management App (mobile)
  3. Weather API Service (api)
  4. Blog CMS (web)
  5. Fitness Tracker (mobile)
  6. Payment Gateway Integration (api)
- Cada proyecto: título, categoría, descripción, tags, links (demo/code)
- Fade transition al filtrar

### 6. **Contact Section**
- 3 info cards: Email, Teléfono, Ubicación
- Formulario con validación HTML5:
  - Nombre (required)
  - Email (required, type="email")
  - Asunto (required)
  - Mensaje (required, textarea)
- Alert success al enviar

### 7. **Footer**
- 3 columnas de links
- Enlaces de navegación
- Enlaces sociales
- Copyright dinámico

### 8. **Back to Top Button**
- Aparece al bajar > 300px
- Smooth scroll al top
- Transición de opacity

---

## ⚡ Funcionalidades JavaScript

### `main.js` - Módulos Funcionales

#### 1. **initializeNavigation()**
- Sticky navbar on scroll
- Mobile menu toggle
- Active link highlighting
- Smooth scroll con offset

#### 2. **initializeThemeToggle()**
- Toggle dark/light mode
- localStorage persistence
- Icon swap (luna ↔ sol)

#### 3. **initializeTypingEffect()**
- Efecto de máquina de escribir
- Loop infinito de 4 textos
- Cursor parpadeante CSS

#### 4. **initializeScrollAnimations()**
- Intersection Observer API
- Fade-in sections al scroll
- Skill bars animation trigger

#### 5. **initializeProjects()**
- Renderizado dinámico desde array
- Filtrado por categoría
- Fade transition al cambiar filtro

#### 6. **initializeContactForm()**
- Form submit handler
- Console log de datos (placeholder)
- Alert success + reset form

#### 7. **initializeBackToTop()**
- Show/hide button on scroll
- Smooth scroll to top

#### Utilities
- `debounce(func, wait)` - Performance optimization
- `throttle(func, limit)` - Scroll event optimization

---

## 🐳 Docker Configuration

### Dockerfile (Single-stage)
```dockerfile
FROM nginx:alpine
COPY public/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
services:
  portfolio:
    build: .
    container_name: portfolio-web
    ports:
      - "3002:80"
    restart: unless-stopped
```

---

## 🚀 Deployment

### Desarrollo Local

#### Con Docker (Recomendado)
```bash
# Build imagen
docker-compose build

# Levantar contenedor
docker-compose up -d

# Ver logs
docker-compose logs -f

# Acceder
# http://localhost:3002

# Detener
docker-compose down
```

#### Sin Docker (Servidor local)
```bash
# Python
python -m http.server 8000 --directory public

# Node.js (npx)
npx serve public -p 8000

# PHP
php -S localhost:8000 -t public
```

### Producción

#### Opción 1: Netlify / Vercel
1. Conectar repo de GitHub
2. Build command: (ninguno)
3. Publish directory: `public`
4. Deploy automático en cada push

#### Opción 2: VPS con Docker
```bash
# Clonar repo
git clone https://github.com/Gabriel-Barria/portafolio.git
cd portafolio

# Build y deploy
docker-compose up -d

# Configurar Nginx reverse proxy (host)
# Apuntar a localhost:3002
```

#### Opción 3: Nginx directo
```bash
# Copiar archivos
cp -r public/* /var/www/html/

# Configurar virtual host
# Reload Nginx
systemctl reload nginx
```

---

## 🧪 Testing

### Plan de Pruebas
Ver: `.copilot/testing/plan-pruebas-funcionales.md`

**34 casos de prueba** cubriendo:
- ✅ Navegación (3 casos)
- ✅ Tema dark/light (2 casos)
- ✅ Hero animations (3 casos)
- ✅ About section (2 casos)
- ✅ Skills (2 casos)
- ✅ Projects filtering (3 casos)
- ✅ Contact form (3 casos)
- ✅ Footer (1 caso)
- ✅ Back to top (2 casos)
- ✅ Performance (2 casos)
- ✅ Accesibilidad (2 casos)
- ✅ Responsive (3 casos)

### Tests Automatizados (Futuro)
Planificado: Playwright o Cypress para E2E testing

---

## 📊 Performance

### Métricas Objetivo (Lighthouse)
- **Performance**: > 90
- **Accessibility**: > 90
- **Best Practices**: > 90
- **SEO**: > 90

### Optimizaciones
- ✅ Sin framework overhead
- ✅ CSS inline en `<style>` (opcional)
- ✅ Font Awesome CDN con preload
- ✅ Images lazy loading (futuro)
- ✅ Minificación CSS/JS (futuro con tools)

---

## ♿ Accesibilidad

- ✅ HTML semántico (`<nav>`, `<section>`, `<footer>`)
- ✅ ARIA labels en iconos
- ✅ Focus visible en elementos interactivos
- ✅ Navegación por teclado completa
- ✅ Contraste de colores WCAG AA
- ✅ Headings jerárquicos (h1 → h2 → h3)

---

## 🔮 Roadmap de Mejoras

### Corto Plazo
- [ ] Tests automatizados con Playwright
- [ ] Minificación CSS/JS
- [ ] Lazy loading de imágenes
- [ ] Service Worker para PWA
- [ ] Google Analytics / Plausible

### Mediano Plazo
- [ ] Blog con generador estático (11ty)
- [ ] Backend real para formulario (Netlify Forms / FormSpree)
- [ ] CMS headless (Strapi / Sanity)
- [ ] Internacionalización (ES/EN)

### Largo Plazo
- [ ] Panel admin para gestionar proyectos
- [ ] API REST con Express para contenido dinámico
- [ ] Dashboard de analytics personalizado

---

## 🤝 Contribución

### Estructura de Commits
```
feat: Nueva funcionalidad
fix: Corrección de bug
docs: Actualización de documentación
style: Cambios de formato (no código)
refactor: Refactorización de código
test: Añadir/modificar tests
chore: Tareas de mantenimiento
```

### Flujo de Desarrollo
1. `git pull origin main`
2. Crear rama: `git checkout -b feature/nombre`
3. Desarrollar siguiendo `.copilot/docs/instrucciones.md`
4. Probar según `plan-pruebas-funcionales.md`
5. Commit: `git commit -m "feat: descripción"`
6. Push: `git push origin feature/nombre`
7. Pull Request a `main`

---

## 📞 Soporte

**Desarrollador**: Gabriel Barria  
**GitHub**: @Gabriel-Barria  
**Email**: contact@gabrielbarria.dev  

---

**Última actualización**: 2025-11-07  
**Versión**: 2.0.0 (Vanilla Rebuild)
