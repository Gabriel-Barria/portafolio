# Arquitectura del Portafolio

## Stack Tecnológico
- **Framework**: Astro 4.1.0 (SSG)
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 3.4.1
- **Language**: TypeScript 5.3.3
- **Container**: Docker + Nginx

## Estructura del Proyecto
```
portafolio/
├── src/
│   ├── pages/          # Rutas y páginas
│   │   ├── api/        # Endpoints API
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   └── contact.astro
│   ├── layouts/        # Layout base
│   ├── components/     # Header, Footer
│   ├── styles/         # CSS global
│   └── data/           # Skills, Projects data
├── public/             # Assets estáticos
└── Dockerfile          # Multi-stage build

## APIs Disponibles

### 1. POST /api/analyze-text
Analiza texto y devuelve estadísticas.
Request: { "text": "string" }
Response: { "chars": number, "words": number, "sentences": number, "readingTime": number }

### 2. GET /api/color-palette
Genera paleta de 5 colores aleatorios.
Response: { "palette": ["#color1", "#color2", ...] }

### 3. POST /api/calculator
Calculadora con operaciones básicas.
Request: { "operation": "add|subtract|multiply|divide", "a": number, "b": number }
Response: { "result": number }

### 4. POST /api/data-predictor
Predicción simple de tendencias.
Request: { "data": [number, number, ...] }
Response: { "avg": number, "trend": "upward|downward", "prediction": number }

## Deployment
1. Build: `docker-compose build`
2. Run: `docker-compose up prod`
3. Access: http://localhost:8080
