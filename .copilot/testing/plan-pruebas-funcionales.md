# Plan de Pruebas Funcionales - Portafolio Vanilla

## 📋 Información General

**Versión del Plan:** 1.0  
**Fecha:** 2025-11-07  
**Aplicación:** Portafolio Personal (HTML/CSS/JS)  
**URL de Prueba:** http://localhost:3002  
**Navegadores:** Chrome, Firefox, Safari, Edge  

---

## 🎯 Objetivos de las Pruebas

1. Verificar que todas las funcionalidades interactivas funcionen correctamente
2. Validar la responsividad en diferentes dispositivos
3. Comprobar la accesibilidad y usabilidad
4. Asegurar el rendimiento y la carga rápida
5. Validar la persistencia de configuraciones (tema)

---

## 📱 Dispositivos y Navegadores

### Desktop
- [ ] Chrome (último)
- [ ] Firefox (último)
- [ ] Edge (último)
- [ ] Safari (si disponible)

### Mobile/Tablet
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Viewport 375px (móvil pequeño)
- [ ] Viewport 768px (tablet)
- [ ] Viewport 1920px (desktop)

---

## ✅ Casos de Prueba

### 1. Navegación

#### TC-NAV-01: Menú de Navegación Desktop
**Precondición:** Abrir aplicación en viewport > 992px  
**Pasos:**
1. Hacer clic en cada enlace del menú (Home, About, Skills, Projects, Contact)
2. Verificar scroll suave a cada sección
3. Verificar que el enlace activo se resalta

**Resultado Esperado:**
- [ ] Scroll suave a la sección correcta
- [ ] Enlace activo tiene clase `.active`
- [ ] Offset correcto (70px desde el top)

---

#### TC-NAV-02: Menú Móvil (Hamburguesa)
**Precondición:** Abrir aplicación en viewport < 768px  
**Pasos:**
1. Hacer clic en el botón hamburguesa
2. Verificar que el menú se expande
3. Hacer clic en un enlace
4. Verificar que el menú se cierra automáticamente

**Resultado Esperado:**
- [ ] Menú se expande/contrae con animación
- [ ] Icono hamburguesa se transforma en X
- [ ] Menú se cierra al seleccionar enlace
- [ ] Scroll funciona correctamente

---

#### TC-NAV-03: Navbar Sticky
**Precondición:** Página cargada  
**Pasos:**
1. Hacer scroll hacia abajo más de 50px
2. Verificar cambio de apariencia del navbar
3. Hacer scroll arriba

**Resultado Esperado:**
- [ ] Navbar se vuelve sticky con fondo sólido
- [ ] Clase `.scrolled` se agrega/remueve correctamente
- [ ] Transición suave de estilos

---

### 2. Tema (Dark/Light Mode)

#### TC-THEME-01: Toggle de Tema
**Precondición:** Tema light activo  
**Pasos:**
1. Hacer clic en botón de tema (luna/sol)
2. Verificar cambio visual
3. Hacer clic nuevamente

**Resultado Esperado:**
- [ ] Tema cambia entre light y dark
- [ ] Icono cambia entre luna y sol
- [ ] Transición suave de colores
- [ ] Todos los componentes aplican tema correctamente

---

#### TC-THEME-02: Persistencia de Tema
**Precondición:** Ninguna  
**Pasos:**
1. Cambiar a tema dark
2. Recargar página (F5)
3. Verificar tema persistido

**Resultado Esperado:**
- [ ] Tema se guarda en localStorage
- [ ] Al recargar, tema dark se mantiene
- [ ] No hay "flash" de tema light antes de cargar

---

### 3. Hero Section

#### TC-HERO-01: Efecto de Texto Typing
**Precondición:** Página cargada  
**Pasos:**
1. Observar el subtitle del hero
2. Esperar ciclo completo de 4 textos
3. Verificar loop infinito

**Resultado Esperado:**
- [ ] Texto se escribe carácter por carácter
- [ ] Pausa de 2s al completar cada texto
- [ ] Texto se borra antes del siguiente
- [ ] Cicla entre: Full Stack Developer, Frontend Specialist, Backend Engineer, DevOps Enthusiast
- [ ] Cursor parpadeante visible

---

#### TC-HERO-02: Enlaces Sociales
**Precondición:** Página cargada  
**Pasos:**
1. Hacer hover sobre cada icono social
2. Hacer clic en cada enlace

**Resultado Esperado:**
- [ ] Hover effect visible (transform, color)
- [ ] Enlaces abren en nueva pestaña
- [ ] Iconos tienen aria-label para accesibilidad

---

#### TC-HERO-03: Animación Background
**Precondición:** Página cargada  
**Pasos:**
1. Observar shapes animados en background
2. Verificar movimiento continuo

**Resultado Esperado:**
- [ ] Shapes flotan con animación `float`
- [ ] Movimiento es fluido y sin saltos
- [ ] No impacta rendimiento

---

### 4. About Section

#### TC-ABOUT-01: Tarjetas de Estadísticas
**Precondición:** Scroll a sección About  
**Pasos:**
1. Verificar 3 tarjetas (Años, Proyectos, Clientes)
2. Hacer hover sobre cada tarjeta
3. Verificar números y labels

**Resultado Esperado:**
- [ ] 3 tarjetas visibles: 3+ años, 20+ proyectos, 15+ clientes
- [ ] Hover effect con transform y shadow
- [ ] Iconos apropiados para cada stat

---

#### TC-ABOUT-02: Animación al Scroll
**Precondición:** Página cargada arriba  
**Pasos:**
1. Hacer scroll hacia sección About
2. Observar fade-in de contenido

**Resultado Esperado:**
- [ ] Sección aparece con fade-in
- [ ] Transform translateY(0) al entrar en viewport
- [ ] Transición de 0.6s suave

---

### 5. Skills Section

#### TC-SKILLS-01: Barras de Progreso
**Precondición:** Scroll a sección Skills  
**Pasos:**
1. Observar 3 categorías de skills
2. Verificar animación de barras al entrar
3. Validar porcentajes

**Resultado Esperado:**
- [ ] 3 categorías visibles: Frontend, Backend, DevOps
- [ ] Barras se animan con `progressBar` keyframe
- [ ] Porcentajes correctos para cada skill
- [ ] Animación solo ocurre una vez al entrar

---

#### TC-SKILLS-02: Responsive Skills
**Precondición:** Viewport < 768px  
**Pasos:**
1. Abrir sección Skills en móvil
2. Verificar layout de grid

**Resultado Esperado:**
- [ ] Grid se ajusta a 1 columna
- [ ] Skills siguen siendo legibles
- [ ] Barras de progreso se ajustan al ancho

---

### 6. Projects Section

#### TC-PROJ-01: Filtro de Proyectos
**Precondición:** Sección Projects visible  
**Pasos:**
1. Hacer clic en "All"
2. Hacer clic en "Web"
3. Hacer clic en "Mobile"
4. Hacer clic en "API"

**Resultado Esperado:**
- [ ] Botón activo tiene clase `.active`
- [ ] Proyectos se filtran correctamente por categoría
- [ ] "All" muestra todos los proyectos (6)
- [ ] "Web" muestra 2 proyectos
- [ ] "Mobile" muestra 2 proyectos
- [ ] "API" muestra 2 proyectos
- [ ] Transición de fade-out/fade-in al filtrar

---

#### TC-PROJ-02: Tarjetas de Proyecto
**Precondición:** Proyectos renderizados  
**Pasos:**
1. Hacer hover sobre cada tarjeta
2. Verificar información visible
3. Hacer clic en enlaces Demo y Code

**Resultado Esperado:**
- [ ] 6 proyectos totales renderizados inicialmente
- [ ] Hover effect con transform y shadow
- [ ] Cada proyecto tiene: título, categoría, descripción, tags
- [ ] Enlaces "Demo" y "Code" visibles
- [ ] Enlaces funcionan (incluso si son placeholders)

---

#### TC-PROJ-03: Responsive Projects
**Precondición:** Viewport < 768px  
**Pasos:**
1. Ver sección Projects en móvil
2. Verificar layout de tarjetas

**Resultado Esperado:**
- [ ] Grid se ajusta a 1 columna
- [ ] Tarjetas ocupan ancho completo
- [ ] Contenido sigue siendo legible

---

### 7. Contact Section

#### TC-CONT-01: Tarjetas de Información
**Precondición:** Sección Contact visible  
**Pasos:**
1. Verificar 3 tarjetas de contacto
2. Hacer hover sobre cada tarjeta

**Resultado Esperado:**
- [ ] 3 tarjetas: Email, Teléfono, Ubicación
- [ ] Iconos apropiados
- [ ] Hover effect funciona
- [ ] Información legible

---

#### TC-CONT-02: Formulario de Contacto
**Precondición:** Sección Contact visible  
**Pasos:**
1. Llenar campo Name
2. Llenar campo Email
3. Llenar campo Subject
4. Llenar campo Message
5. Hacer clic en "Send Message"

**Resultado Esperado:**
- [ ] Todos los campos son requeridos (HTML5 validation)
- [ ] Email valida formato correcto
- [ ] Botón submit funcional
- [ ] Alert "Mensaje enviado exitosamente" aparece
- [ ] Formulario se resetea después de envío

---

#### TC-CONT-03: Validación de Formulario
**Precondición:** Formulario vacío  
**Pasos:**
1. Intentar enviar formulario vacío
2. Llenar solo nombre e intentar enviar
3. Poner email inválido e intentar enviar

**Resultado Esperado:**
- [ ] Validación HTML5 previene envío
- [ ] Mensajes de error nativos aparecen
- [ ] Email inválido es rechazado

---

### 8. Footer

#### TC-FOOT-01: Enlaces de Footer
**Precondición:** Scroll al footer  
**Pasos:**
1. Hacer clic en cada enlace de navegación
2. Hacer clic en enlaces sociales

**Resultado Esperado:**
- [ ] Enlaces de navegación hacen scroll a secciones
- [ ] Enlaces sociales funcionan
- [ ] Copyright visible con año actual

---

### 9. Back to Top Button

#### TC-BTT-01: Aparición del Botón
**Precondición:** Página en el top  
**Pasos:**
1. Hacer scroll hacia abajo más de 300px
2. Observar aparición del botón
3. Hacer scroll arriba

**Resultado Esperado:**
- [ ] Botón no visible en top (opacity 0)
- [ ] Botón aparece al bajar 300px con clase `.visible`
- [ ] Botón desaparece al volver arriba
- [ ] Transición suave

---

#### TC-BTT-02: Funcionalidad del Botón
**Precondición:** Botón visible  
**Pasos:**
1. Hacer clic en botón Back to Top
2. Observar scroll

**Resultado Esperado:**
- [ ] Scroll suave hasta el top (0)
- [ ] Botón desaparece al llegar arriba

---

### 10. Performance

#### TC-PERF-01: Carga Inicial
**Precondición:** Cache limpio  
**Pasos:**
1. Abrir DevTools > Network
2. Cargar página (hard refresh)
3. Verificar tiempos

**Resultado Esperado:**
- [ ] DOMContentLoaded < 500ms
- [ ] Load completo < 2s
- [ ] Sin errores 404 en console
- [ ] CSS/JS se cargan correctamente

---

#### TC-PERF-02: Lighthouse Score
**Precondición:** DevTools > Lighthouse  
**Pasos:**
1. Ejecutar audit de Performance
2. Ejecutar audit de Accessibility
3. Ejecutar audit de Best Practices
4. Ejecutar audit de SEO

**Resultado Esperado:**
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

---

### 11. Accesibilidad

#### TC-A11Y-01: Navegación por Teclado
**Precondición:** Página cargada  
**Pasos:**
1. Usar Tab para navegar por elementos interactivos
2. Verificar focus visible
3. Usar Enter para activar enlaces/botones

**Resultado Esperado:**
- [ ] Todos los elementos interactivos son tabulables
- [ ] Focus outline visible
- [ ] Orden lógico de tabulación
- [ ] Enter activa elementos

---

#### TC-A11Y-02: Screen Reader
**Precondición:** Screen reader activo  
**Pasos:**
1. Navegar con screen reader
2. Verificar labels y aria attributes

**Resultado Esperado:**
- [ ] Elementos tienen aria-label apropiados
- [ ] Headings tienen jerarquía correcta (h1, h2, h3)
- [ ] Imágenes/iconos tienen alt text o aria-hidden

---

### 12. Responsive Design

#### TC-RESP-01: Mobile (375px)
**Precondición:** DevTools responsive mode  
**Pasos:**
1. Ajustar viewport a 375px
2. Verificar todas las secciones
3. Probar interacciones

**Resultado Esperado:**
- [ ] Menú hamburguesa visible
- [ ] Contenido legible sin scroll horizontal
- [ ] Botones táctiles (min 44x44px)
- [ ] Imágenes responsive

---

#### TC-RESP-02: Tablet (768px)
**Precondición:** DevTools responsive mode  
**Pasos:**
1. Ajustar viewport a 768px
2. Verificar grid layouts
3. Verificar navegación

**Resultado Esperado:**
- [ ] Grids a 2 columnas donde apropiado
- [ ] Navbar puede ser desktop o mobile
- [ ] Spacing apropiado

---

#### TC-RESP-03: Desktop (1920px)
**Precondición:** DevTools responsive mode  
**Pasos:**
1. Ajustar viewport a 1920px
2. Verificar max-width contenedores
3. Verificar centering

**Resultado Esperado:**
- [ ] Contenido no excede max-width (1200px)
- [ ] Contenido centrado
- [ ] No hay elementos cortados

---

## 🐛 Registro de Defectos

| ID | Severidad | Descripción | Paso | Estado | Fecha |
|----|-----------|-------------|------|--------|-------|
| - | - | - | - | - | - |

**Severidades:**
- **Crítica:** Impide funcionalidad principal
- **Alta:** Funcionalidad afectada significativamente
- **Media:** Problema cosmético o de UX
- **Baja:** Mejora sugerida

---

## 📊 Resumen de Ejecución

**Fecha de Ejecución:** _______  
**Ejecutado por:** _______  

**Resultados:**
- Total de casos: 34
- Pasados: ___
- Fallados: ___
- Bloqueados: ___
- No ejecutados: ___

**Porcentaje de éxito:** ____%

---

## 📝 Notas Adicionales

- Todas las pruebas deben ejecutarse en modo incógnito para evitar cache
- Documentar cualquier comportamiento inesperado en Registro de Defectos
- Capturar screenshots de defectos críticos
- Validar en diferentes sistemas operativos si es posible

---

## ✅ Criterios de Aceptación

El portafolio será aceptado cuando:
1. ✅ Todos los casos críticos pasan
2. ✅ Al menos 95% de casos totales pasan
3. ✅ No hay defectos bloqueantes
4. ✅ Performance Lighthouse > 90
5. ✅ Accessibility Lighthouse > 90
6. ✅ Funciona en Chrome, Firefox, Edge
7. ✅ Responsive en mobile, tablet, desktop

---

**Próximos pasos:** Ejecutar plan de pruebas y documentar resultados en `resultados-pruebas.md`
