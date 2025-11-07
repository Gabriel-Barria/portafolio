# 🛠️ Herramientas de Automatización

Este directorio contiene scripts Python para automatizar tareas comunes de desarrollo y optimización del portafolio.

---

## 📋 Scripts Disponibles

### 1. `minify.py` - Minificador CSS/JS

Minifica archivos CSS y JavaScript para producción, removiendo espacios, comentarios y líneas vacías.

**Uso:**
```bash
python .copilot/tools/minify.py
```

**Funcionalidades:**
- Minifica todos los archivos `.css` del proyecto
- Minifica todos los archivos `.js` del proyecto
- Genera archivos `.min.css` y `.min.js`
- Muestra estadísticas de ahorro de espacio

**Salida:**
```
public/dist/
├── css/
│   └── styles.min.css
└── js/
    └── main.min.js
```

---

### 2. `check-links.py` - Validador de Enlaces

Verifica que todos los enlaces internos y externos en HTML, CSS y JS funcionen correctamente.

**Uso:**
```bash
python .copilot/tools/check-links.py
```

**Funcionalidades:**
- Verifica enlaces en archivos `.html`, `.css`, `.js`
- Comprueba URLs externas (http/https)
- Valida existencia de archivos locales
- Reporte detallado de enlaces rotos
- Exit code para CI/CD (0 = éxito, 1 = enlaces rotos)

**Verifica:**
- `href="..."` en HTML
- `src="..."` en HTML
- `url(...)` en CSS
- Rutas en strings de JS

---

### 3. `optimize-images.py` - Optimizador de Imágenes

Comprime imágenes PNG y JPG para mejorar el rendimiento web.

**Requisito:**
```bash
pip install Pillow
```

**Uso:**
```bash
python .copilot/tools/optimize-images.py
```

**Funcionalidades:**
- Comprime imágenes JPG/JPEG con calidad configurable (default: 85)
- Optimiza imágenes PNG sin pérdida
- Redimensiona imágenes muy grandes (max: 1920px de ancho)
- Convierte RGBA a RGB para JPG
- Estadísticas de ahorro de espacio
- Preserva estructura de directorios

**Configuración:**
```python
quality = 85      # Calidad JPEG (1-100)
max_width = 1920  # Ancho máximo en píxeles
```

---

## 🚀 Uso Rápido

### Optimizar Todo el Proyecto
```bash
# 1. Optimizar imágenes
python .copilot/tools/optimize-images.py

# 2. Minificar CSS/JS
python .copilot/tools/minify.py

# 3. Verificar enlaces
python .copilot/tools/check-links.py
```

### Pre-Deploy Checklist
```bash
# Ejecutar todas las herramientas antes de deploy
python .copilot/tools/optimize-images.py && \
python .copilot/tools/minify.py && \
python .copilot/tools/check-links.py
```

---

## 📊 Ejemplos de Salida

### Minify Output
```
🗜️  Minificador CSS/JS
==================================================

📂 Source: C:\...\portafolio\public
📂 Output: C:\...\portafolio\public\dist

✅ css/styles.css → css/styles.min.css
✅ js/main.js → js/main.min.js

==================================================
📊 Estadísticas de Minificación

CSS:
  Original:  95,432 bytes
  Minified:  68,201 bytes
  Ahorrado:  28.5%

JavaScript:
  Original:  45,789 bytes
  Minified:  32,156 bytes
  Ahorrado:  29.8%

==================================================
✅ Minificación completada!
```

### Link Checker Output
```
🔗 Link Checker
============================================================

📂 Scanning: C:\...\portafolio\public

Checking: index.html... ✅
Checking: styles.css... ✅
Checking: main.js... ✅

============================================================
📊 Link Check Report

Files checked: 3
Broken links: 0

✅ All links are valid!

============================================================
```

### Image Optimizer Output
```
🖼️  Image Optimizer
============================================================

📂 Source: C:\...\portafolio\public\img
⚙️  Quality: 85
📏 Max Width: 1920px

Processing: hero-bg.jpg... ✅ Saved 245,678 bytes (45.2%)
Processing: project-1.png... ✅ Already optimized
Processing: profile.jpg... ✅ Saved 123,456 bytes (32.1%)

============================================================
📊 Optimization Report

Total images: 3
Optimized: 3
Errors: 0

Original size:  1,234,567 bytes (1.18 MB)
Optimized size: 865,433 bytes (0.83 MB)
Total saved:    369,134 bytes (0.35 MB)
Savings:        29.9%

============================================================
```

---

## ⚙️ Configuración

### Variables de Entorno (Futuro)
```bash
# .env
MINIFY_OUTPUT_DIR=public/dist
IMAGE_QUALITY=85
IMAGE_MAX_WIDTH=1920
CHECK_EXTERNAL_LINKS=true
```

---

## 🔧 Personalización

### Modificar Calidad de Minificación
Editar en `minify.py`:
```python
def minify_css(content):
    # Ajustar regex para preservar ciertos comentarios
    content = re.sub(r'/\*(?!!).*?\*/', '', content, flags=re.DOTALL)
```

### Cambiar Directorio de Salida
Editar en cada script:
```python
output_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'build')
```

---

## 🧪 Testing

### Probar Scripts sin Modificar Archivos
Agregar flag `--dry-run` (futuro):
```bash
python .copilot/tools/minify.py --dry-run
```

---

## 📝 Notas

- **Python 3.6+** requerido
- Scripts son **idempotentes** (pueden ejecutarse múltiples veces)
- **No modifican archivos originales** (solo crean `.min.` o sobrescriben optimizados)
- Compatibles con **Windows, Linux, macOS**

---

## 🔮 Roadmap

### Próximas Herramientas
- [ ] `generate-sitemap.py` - Generador de sitemap.xml
- [ ] `lighthouse-audit.py` - Auditoría automatizada con Lighthouse
- [ ] `deploy.py` - Script de deployment automatizado
- [ ] `backup.py` - Backup incremental del proyecto
- [ ] `analytics.py` - Extractor de métricas de analytics

---

## 🤝 Contribuir

Para agregar nuevas herramientas:

1. Crear script en `.copilot/tools/`
2. Seguir convención de nombres: `accion-objetivo.py`
3. Incluir docstring y comentarios
4. Agregar sección en este README
5. Probar en diferentes OS

---

## 📄 Licencia

MIT - Gabriel Barria 2025
