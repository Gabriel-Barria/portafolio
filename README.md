# Portafolio Gabriel Barria## Portafolio de Gabriel Barria



Portafolio moderno y responsivo desarrollado con **Astro 4**, **React**, **Tailwind CSS** y **TypeScript**.Proyecto construido con Astro + Tailwind.



## Características### Scripts

- Desarrollo: `npm run dev`

- ✅ Diseño moderno con modo oscuro/claro- Build: `npm run build`

- ✅ Página de habilidades técnicas con categorización- Preview: `npm run preview`

- ✅ APIs demostrables integradas como proyectos

- ✅ Formulario de contacto funcional### Endpoints API de ejemplo

- ✅ SEO optimizado con Sitemap- GET `/api/hello?name=Gabriel`

- ✅ Totalmente responsivo (mobile-first)- GET `/api/time`

- ✅ Dockerizado para producción- GET `/api/echo` y POST `/api/echo` (echo de JSON)

- GET `/api/random-quote`

## Stack Tecnológico

### Páginas

- **Framework**: Astro 4.1.0- `/` Inicio

- **UI**: React 18.2.0 (para componentes interactivos)- `/proyectos/` Proyectos

- **Styling**: Tailwind CSS 3.4.1- `/acerca/` Acerca de mí

- **Lenguaje**: TypeScript- `/contacto/` Contacto

- **Deployment**: Docker + Nginx

### Docker

## InstalaciónPara construir y ejecutar con Docker:



```bash```bash

# Instalar dependenciasdocker build -t portafolio .

npm installdocker run -p 8080:80 portafolio

```

# Iniciar servidor de desarrollo

npm run devLuego accede a http://localhost:8080



# Build para producción### Características

npm run build- ✅ Dark mode

- ✅ Responsive design

# Ver preview del build- ✅ SEO optimizado (sitemap, robots.txt, meta tags)

npm run preview- ✅ APIs REST de ejemplo

```- ✅ Tailwind CSS

- ✅ Astro 3.x

##Estructura del Proyecto


```
src/
├── pages/              # Rutas y endpoints
│   ├── index.astro     # Home
│   ├── about.astro     # Acerca de mí (habilidades)
│   ├── projects.astro  # Proyectos/APIs
│   ├── contact.astro   # Contacto
│   └── api/            # Endpoints de APIs
│       ├── analyze-text.ts
│       ├── color-palette.ts
│       ├── calculator.ts
│       └── data-predictor.ts
├── components/         # Componentes React & Astro
├── layouts/            # Layouts base
├── styles/             # CSS global
└── data/               # Datos y configuración

public/                 # Assets estáticos
docker/                 # Configuración Docker
dist/                   # Build generado
```

## APIs Integradas

El portafolio incluye varios endpoints API demostrables que sirven como proyectos:

### 1. **Analizador de Texto** (`/api/analyze-text`)
- Análisis de caracteres, palabras, oraciones
- Métricas de densidad
- Tiempo de lectura estimado

### 2. **Generador de Paletas** (`/api/color-palette`)
- Genera paletas de colores aleatorias
- Exporta en múltiples formatos (HEX, RGB, HSL)
- Paletas armónicas

### 3. **Calculadora Avanzada** (`/api/calculator`)
- Operaciones matemáticas complejas
- Historial de cálculos
- Conversiones de unidades

### 4. **Predictor de Datos** (`/api/data-predictor`)
- Análisis de tendencias simples
- Predicciones basadas en datos históricos
- Visualización de patrones

## Habilidades Mostradas

### Frontend
- HTML, CSS, JavaScript/TypeScript
- React, Astro
- Tailwind CSS, Responsive Design
- Accesibilidad (WCAG)

### Backend
- Node.js, Express (opcional)
- APIs REST
- Procesamiento de datos

### DevOps
- Docker, Docker Compose
- GitHub Actions (opcional)
- Deployment en Vercel/Netlify

## Docker

```bash
# Construir imagen
docker build -t portafolio .

# Ejecutar contenedor
docker run -p 8080:80 portafolio

# Acceder a
http://localhost:8080
```

## Desarrollo Local

```bash
npm run dev
# http://localhost:3000
```

## Build y Deploy

```bash
npm run build
npm run preview

# Deploy en Vercel
vercel deploy dist
```

## Licencia

MIT - Gabriel Barria 2025
