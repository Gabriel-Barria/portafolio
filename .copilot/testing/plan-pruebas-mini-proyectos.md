# Plan de Pruebas Funcionales - Mini Proyectos Interactivos

## 📋 Información General

**Versión del Plan:** 2.0  
**Fecha:** 2025-11-07  
**Aplicación:** Portafolio Personal con 10 Mini Proyectos  
**URL de Prueba:** http://localhost:3002  
**Navegadores:** Chrome, Firefox, Safari, Edge  

---

## 🎯 Objetivos de las Pruebas

1. Verificar que los 10 mini-proyectos se carguen correctamente
2. Validar la funcionalidad de cada mini-proyecto individualmente
3. Comprobar el sistema de modales y navegación
4. Asegurar el filtrado por categorías
5. Validar la persistencia de datos (localStorage)

---

## 🎮 Mini Proyectos a Probar

1. **Calculadora** - Operaciones matemáticas básicas
2. **Lista de Tareas** - CRUD con localStorage
3. **Selector de Colores** - Generador RGB/HEX
4. **Pomodoro Timer** - Timer de productividad
5. **Consulta del Clima** - Datos meteorológicos simulados
6. **Quiz Game** - Juego de preguntas y respuestas
7. **Memory Game** - Juego de memoria con cartas
8. **Calculadora IMC** - Índice de masa corporal
9. **Conversor de Monedas** - Conversión de divisas
10. **Markdown Previewer** - Editor Markdown en tiempo real

---

## ✅ Casos de Prueba - Sistema de Proyectos

### TC-PROJ-01: Renderizado de Mini Proyectos
**Precondición:** Navegar a la sección Projects  
**Pasos:**
1. Hacer scroll a la sección de proyectos
2. Contar el número de tarjetas visibles
3. Verificar que cada tarjeta tenga: título, descripción, icono, botón "Probar"

**Resultado Esperado:**
- [ ] 10 tarjetas de proyectos visibles
- [ ] Cada tarjeta tiene toda la información completa
- [ ] Iconos apropiados para cada proyecto
- [ ] Botón "Probar" funcional en cada tarjeta

---

### TC-PROJ-02: Filtrado por Categorías
**Precondición:** Página cargada, sección Projects visible  
**Pasos:**
1. Hacer clic en "Todos" - verificar 10 proyectos
2. Hacer clic en "Herramientas" - verificar proyectos filtrados
3. Hacer clic en "Productividad" - verificar proyectos filtrados
4. Hacer clic en "Juegos" - verificar proyectos filtrados
5. Hacer clic en "Diseño" - verificar proyectos filtrados
6. Hacer clic en "Salud" - verificar proyectos filtrados

**Resultado Esperado:**
- [ ] "Todos" muestra los 10 proyectos
- [ ] "Herramientas" muestra: Calculadora, Clima, Conversor (3)
- [ ] "Productividad" muestra: Todo List, Pomodoro, Markdown (3)
- [ ] "Juegos" muestra: Quiz, Memory (2)
- [ ] "Diseño" muestra: Color Picker (1)
- [ ] "Salud" muestra: IMC (1)
- [ ] Transición de fade-out/fade-in al cambiar filtro
- [ ] Botón activo tiene estilos highlight

---

### TC-PROJ-03: Apertura de Modal
**Precondición:** Proyectos renderizados  
**Pasos:**
1. Hacer clic en botón "Probar" de cualquier proyecto
2. Verificar que el modal se abre
3. Verificar título del modal
4. Verificar contenido del proyecto cargado
5. Verificar botón "X" de cierre visible

**Resultado Esperado:**
- [ ] Modal se abre con animación suave
- [ ] Fondo semi-transparente con blur
- [ ] Título del modal correcto
- [ ] Contenido del proyecto cargado completamente
- [ ] Botón de cierre (X) funcional
- [ ] Scroll del body bloqueado

---

### TC-PROJ-04: Cierre de Modal
**Precondición:** Modal abierto  
**Pasos:**
1. Hacer clic en botón "X"
2. Verificar que el modal se cierra
3. Abrir otro modal
4. Hacer clic fuera del modal (en el overlay)

**Resultado Esperado:**
- [ ] Botón "X" cierra el modal con animación
- [ ] Clic en overlay cierra el modal
- [ ] Scroll del body se restaura
- [ ] Se puede abrir otro modal sin problemas

---

## 🧮 Casos de Prueba - Calculadora

### TC-CALC-01: Operaciones Básicas
**Precondición:** Modal de calculadora abierto  
**Pasos:**
1. Hacer clic en "5 + 3 ="
2. Verificar resultado: 8
3. Hacer clic en "C"
4. Hacer clic en "10 - 4 ="
5. Verificar resultado: 6
6. Hacer clic en "7 × 8 ="
7. Verificar resultado: 56
8. Hacer clic en "20 ÷ 5 ="
9. Verificar resultado: 4

**Resultado Esperado:**
- [ ] Suma: 5 + 3 = 8 ✓
- [ ] Resta: 10 - 4 = 6 ✓
- [ ] Multiplicación: 7 × 8 = 56 ✓
- [ ] División: 20 ÷ 5 = 4 ✓
- [ ] Botón "C" limpia el display
- [ ] Display muestra "0" al inicio

---

### TC-CALC-02: Decimales
**Precondición:** Modal de calculadora abierto  
**Pasos:**
1. Hacer clic en "5.5 + 2.3 ="
2. Verificar resultado
3. Hacer clic en "10.8 ÷ 2 ="
4. Verificar resultado

**Resultado Esperado:**
- [ ] Acepta entrada de decimales con "."
- [ ] Cálculos con decimales correctos
- [ ] Resultados redondeados apropiadamente

---

### TC-CALC-03: Manejo de Errores
**Precondición:** Modal de calculadora abierto  
**Pasos:**
1. Hacer clic en "5 ÷ 0 ="
2. Verificar mensaje de error
3. Hacer clic en operadores sin números
4. Verificar comportamiento

**Resultado Esperado:**
- [ ] División por 0 muestra "Error" o "Infinity"
- [ ] No se rompe con inputs inválidos
- [ ] Se puede recuperar con "C"

---

## ✅ Casos de Prueba - Lista de Tareas

### TC-TODO-01: Agregar Tarea
**Precondición:** Modal de Todo List abierto  
**Pasos:**
1. Escribir "Comprar leche" en el input
2. Hacer clic en "Agregar"
3. Verificar que la tarea aparece en la lista
4. Agregar 2 tareas más

**Resultado Esperado:**
- [ ] Tarea se agrega a la lista
- [ ] Input se limpia después de agregar
- [ ] Cada tarea tiene checkbox y botón eliminar
- [ ] Múltiples tareas se pueden agregar

---

### TC-TODO-02: Completar Tarea
**Precondición:** Al menos 1 tarea en la lista  
**Pasos:**
1. Hacer clic en el checkbox de una tarea
2. Verificar que la tarea se marca como completada
3. Hacer clic nuevamente en el checkbox

**Resultado Esperado:**
- [ ] Tarea se marca como completada (tachada)
- [ ] Opacidad reducida visualmente
- [ ] Se puede desmarcar haciendo clic nuevamente
- [ ] Estado persiste al cerrar y reabrir modal

---

### TC-TODO-03: Eliminar Tarea
**Precondición:** Al menos 1 tarea en la lista  
**Pasos:**
1. Hacer clic en el botón eliminar (trash icon)
2. Verificar que la tarea se elimina

**Resultado Esperado:**
- [ ] Tarea se elimina de la lista
- [ ] No se requiere confirmación
- [ ] Estado persiste en localStorage

---

### TC-TODO-04: Persistencia localStorage
**Precondición:** Varias tareas agregadas  
**Pasos:**
1. Agregar 3 tareas
2. Completar 1 tarea
3. Cerrar modal
4. Recargar página (F5)
5. Abrir modal de Todo List nuevamente

**Resultado Esperado:**
- [ ] Las 3 tareas siguen presentes
- [ ] Estado de completadas se mantiene
- [ ] Datos persisten después de recargar

---

## 🎨 Casos de Prueba - Selector de Colores

### TC-COLOR-01: Ajuste de Sliders
**Precondición:** Modal de Color Picker abierto  
**Pasos:**
1. Mover slider R (rojo) a diferentes valores
2. Mover slider G (verde) a diferentes valores
3. Mover slider B (azul) a diferentes valores
4. Observar cambios en el display de color

**Resultado Esperado:**
- [ ] Display de color cambia en tiempo real
- [ ] Valores numéricos se actualizan (0-255)
- [ ] Código HEX se actualiza correctamente
- [ ] Color de fondo del display refleja RGB

---

### TC-COLOR-02: Color Aleatorio
**Precondición:** Modal de Color Picker abierto  
**Pasos:**
1. Hacer clic en botón "Color Aleatorio"
2. Verificar que los sliders cambian
3. Hacer clic 3 veces más

**Resultado Esperado:**
- [ ] Genera valores RGB aleatorios
- [ ] Sliders se actualizan
- [ ] Display de color cambia
- [ ] Cada clic genera color diferente

---

### TC-COLOR-03: Conversión RGB a HEX
**Precondición:** Modal de Color Picker abierto  
**Pasos:**
1. Establecer R=255, G=0, B=0
2. Verificar HEX: #FF0000
3. Establecer R=0, G=255, B=0
4. Verificar HEX: #00FF00
5. Establecer R=0, G=0, B=255
6. Verificar HEX: #0000FF

**Resultado Esperado:**
- [ ] Rojo puro: #FF0000 ✓
- [ ] Verde puro: #00FF00 ✓
- [ ] Azul puro: #0000FF ✓
- [ ] Conversión matemática correcta

---

## ⏱️ Casos de Prueba - Pomodoro Timer

### TC-POMO-01: Modo Trabajo
**Precondición:** Modal de Pomodoro abierto  
**Pasos:**
1. Verificar que muestra "25:00" por defecto
2. Hacer clic en "Iniciar"
3. Esperar que cuente hacia atrás
4. Verificar que el tiempo disminuye

**Resultado Esperado:**
- [ ] Timer inicia en 25:00
- [ ] Cuenta regresiva funciona (1 segundo por segundo)
- [ ] Formato MM:SS correcto
- [ ] Timer no se detiene al cerrar/abrir modal

---

### TC-POMO-02: Pausar y Reiniciar
**Precondición:** Timer corriendo  
**Pasos:**
1. Hacer clic en "Pausar"
2. Verificar que el timer se detiene
3. Hacer clic en "Iniciar" nuevamente
4. Hacer clic en "Reiniciar"
5. Verificar que vuelve a 25:00

**Resultado Esperado:**
- [ ] "Pausar" detiene el contador
- [ ] "Iniciar" reanuda desde donde quedó
- [ ] "Reiniciar" vuelve al tiempo inicial
- [ ] Estado se mantiene correctamente

---

### TC-POMO-03: Cambio de Modos
**Precondición:** Modal de Pomodoro abierto  
**Pasos:**
1. Hacer clic en "Descanso Corto"
2. Verificar timer: 5:00
3. Hacer clic en "Descanso Largo"
4. Verificar timer: 15:00
5. Hacer clic en "Trabajo"
6. Verificar timer: 25:00

**Resultado Esperado:**
- [ ] "Trabajo" = 25 minutos
- [ ] "Descanso Corto" = 5 minutos
- [ ] "Descanso Largo" = 15 minutos
- [ ] Cambiar modo pausa el timer
- [ ] Botón activo tiene highlight

---

### TC-POMO-04: Finalización del Timer
**Precondición:** Timer configurado en 0:02  
**Pasos:**
1. Iniciar timer
2. Esperar a que llegue a 0:00
3. Verificar alerta

**Resultado Esperado:**
- [ ] Timer llega a 0:00
- [ ] Aparece alerta "¡Tiempo terminado!"
- [ ] Timer se detiene automáticamente

---

## 🌤️ Casos de Prueba - Consulta del Clima

### TC-WEATHER-01: Búsqueda de Ciudad
**Precondición:** Modal de Weather abierto  
**Pasos:**
1. Escribir "Santiago" en el input
2. Hacer clic en "Buscar"
3. Verificar datos mostrados
4. Buscar "Buenos Aires"
5. Verificar datos actualizados

**Resultado Esperado:**
- [ ] Muestra temperatura simulada
- [ ] Muestra descripción del clima
- [ ] Muestra humedad y viento
- [ ] Nombre de ciudad se actualiza
- [ ] Datos cambian con cada búsqueda

---

### TC-WEATHER-02: Input Vacío
**Precondición:** Modal de Weather abierto  
**Pasos:**
1. Dejar input vacío
2. Hacer clic en "Buscar"

**Resultado Esperado:**
- [ ] No hace búsqueda con input vacío
- [ ] No muestra error
- [ ] Mantiene datos anteriores

---

## 🎯 Casos de Prueba - Quiz Game

### TC-QUIZ-01: Responder Preguntas
**Precondición:** Modal de Quiz abierto  
**Pasos:**
1. Leer primera pregunta
2. Hacer clic en una respuesta
3. Verificar feedback visual (verde/rojo)
4. Esperar transición a siguiente pregunta
5. Responder todas las preguntas

**Resultado Esperado:**
- [ ] 5 preguntas en total
- [ ] Respuesta correcta se marca en verde
- [ ] Respuesta incorrecta se marca en rojo
- [ ] Transición automática de 1.5s
- [ ] Progreso visible "Pregunta X de 5"

---

### TC-QUIZ-02: Resultado Final
**Precondición:** Todas las preguntas respondidas  
**Pasos:**
1. Completar las 5 preguntas
2. Verificar pantalla de resultado
3. Verificar puntaje mostrado
4. Hacer clic en "Jugar de Nuevo"

**Resultado Esperado:**
- [ ] Muestra puntaje: X/5
- [ ] Muestra porcentaje
- [ ] Botón "Jugar de Nuevo" funciona
- [ ] Quiz se reinicia desde pregunta 1

---

### TC-QUIZ-03: No Doble Clic
**Precondición:** Pregunta visible  
**Pasos:**
1. Hacer clic en una respuesta
2. Intentar hacer clic en otra respuesta inmediatamente

**Resultado Esperado:**
- [ ] Solo se registra el primer clic
- [ ] No se puede cambiar respuesta
- [ ] Evita puntaje duplicado

---

## 🃏 Casos de Prueba - Memory Game

### TC-MEMORY-01: Iniciar Juego
**Precondición:** Modal de Memory abierto  
**Pasos:**
1. Verificar 16 cartas (4x4)
2. Verificar que están volteadas (no muestran emoji)
3. Verificar estadísticas: Movimientos=0, Parejas=0/8

**Resultado Esperado:**
- [ ] 16 cartas en grid 4x4
- [ ] Todas las cartas volteadas al inicio
- [ ] Estadísticas en 0
- [ ] 8 parejas de emojis diferentes

---

### TC-MEMORY-02: Voltear Cartas
**Precondición:** Juego iniciado  
**Pasos:**
1. Hacer clic en una carta
2. Verificar que muestra emoji
3. Hacer clic en otra carta
4. Verificar comportamiento

**Resultado Esperado:**
- [ ] Primera carta se voltea y muestra emoji
- [ ] Segunda carta se voltea
- [ ] Si no coinciden, se vuelven a voltear después de 1s
- [ ] Si coinciden, quedan volteadas
- [ ] Contador de movimientos incrementa

---

### TC-MEMORY-03: Encontrar Pareja
**Precondición:** Juego iniciado  
**Pasos:**
1. Voltear 2 cartas con el mismo emoji
2. Verificar que quedan volteadas
3. Verificar estadísticas

**Resultado Esperado:**
- [ ] Pareja correcta queda volteada
- [ ] Color cambia (matched state)
- [ ] Parejas: 1/8
- [ ] No se pueden volver a voltear

---

### TC-MEMORY-04: Completar Juego
**Precondición:** 7 parejas encontradas  
**Pasos:**
1. Encontrar la última pareja
2. Verificar mensaje de victoria
3. Verificar número de movimientos

**Resultado Esperado:**
- [ ] Alerta "¡Ganaste!" aparece
- [ ] Muestra total de movimientos
- [ ] Parejas: 8/8
- [ ] Botón "Nueva Partida" reinicia

---

### TC-MEMORY-05: Nueva Partida
**Precondición:** Juego en progreso  
**Pasos:**
1. Hacer clic en "Nueva Partida"
2. Verificar que el juego se reinicia

**Resultado Esperado:**
- [ ] Cartas se mezclan nuevamente
- [ ] Estadísticas vuelven a 0
- [ ] Cartas están todas volteadas
- [ ] Emojis en nuevas posiciones

---

## ⚖️ Casos de Prueba - Calculadora IMC

### TC-BMI-01: Calcular IMC Normal
**Precondición:** Modal de IMC abierto  
**Pasos:**
1. Ingresar Peso: 70 kg
2. Ingresar Altura: 170 cm
3. Hacer clic en "Calcular IMC"
4. Verificar resultado

**Resultado Esperado:**
- [ ] IMC calculado: 24.2
- [ ] Categoría: "Peso Normal"
- [ ] Color verde (#10b981)
- [ ] Fórmula: peso / (altura/100)²

---

### TC-BMI-02: Diferentes Categorías
**Precondición:** Modal de IMC abierto  
**Pasos:**
1. Calcular con Peso=50, Altura=170 → Bajo Peso
2. Calcular con Peso=85, Altura=170 → Sobrepeso
3. Calcular con Peso=100, Altura=170 → Obesidad

**Resultado Esperado:**
- [ ] IMC < 18.5 → "Bajo Peso" (azul)
- [ ] IMC 18.5-24.9 → "Peso Normal" (verde)
- [ ] IMC 25-29.9 → "Sobrepeso" (naranja)
- [ ] IMC ≥ 30 → "Obesidad" (rojo)

---

### TC-BMI-03: Validación de Inputs
**Precondición:** Modal de IMC abierto  
**Pasos:**
1. Dejar campos vacíos y hacer clic en "Calcular"
2. Ingresar valores negativos
3. Ingresar valores de 0

**Resultado Esperado:**
- [ ] Alerta si campos vacíos
- [ ] Alerta si valores negativos
- [ ] Alerta si valores = 0
- [ ] Mensaje: "Por favor ingresa valores válidos"

---

## 💱 Casos de Prueba - Conversor de Monedas

### TC-CURR-01: Conversión Básica
**Precondición:** Modal de Currency abierto  
**Pasos:**
1. Ingresar Monto: 100
2. De: USD
3. A: CLP
4. Hacer clic en "Convertir"
5. Verificar resultado

**Resultado Esperado:**
- [ ] Muestra resultado en CLP
- [ ] Muestra tasa de cambio
- [ ] Cálculo correcto (100 * tasa)
- [ ] Formato con 2 decimales

---

### TC-CURR-02: Diferentes Monedas
**Precondición:** Modal de Currency abierto  
**Pasos:**
1. Convertir USD → EUR
2. Convertir EUR → GBP
3. Convertir CLP → ARS
4. Verificar que todas funcionan

**Resultado Esperado:**
- [ ] Todas las combinaciones de monedas funcionan
- [ ] Tasas de cambio realistas
- [ ] 5 monedas disponibles: USD, EUR, GBP, CLP, ARS

---

### TC-CURR-03: Validaciones
**Precondición:** Modal de Currency abierto  
**Pasos:**
1. Dejar monto vacío y convertir
2. Ingresar monto negativo
3. Seleccionar misma moneda origen y destino

**Resultado Esperado:**
- [ ] Alerta si monto vacío
- [ ] Alerta si monto ≤ 0
- [ ] Alerta si ambas monedas son iguales

---

## 📝 Casos de Prueba - Markdown Previewer

### TC-MD-01: Preview en Tiempo Real
**Precondición:** Modal de Markdown abierto  
**Pasos:**
1. Escribir "# Título" en el editor
2. Verificar preview muestra `<h1>`
3. Escribir "**negrita**"
4. Verificar preview muestra bold
5. Escribir "*cursiva*"
6. Verificar preview muestra italic

**Resultado Esperado:**
- [ ] Preview se actualiza al escribir (sin delay)
- [ ] # → <h1>
- [ ] ## → <h2>
- [ ] ### → <h3>
- [ ] **texto** → <strong>
- [ ] *texto* → <em>

---

### TC-MD-02: Enlaces y Listas
**Precondición:** Modal de Markdown abierto  
**Pasos:**
1. Escribir "[Link](https://example.com)"
2. Escribir lista:
   ```
   - Item 1
   - Item 2
   ```
3. Verificar preview

**Resultado Esperado:**
- [ ] [texto](url) → <a href="url">texto</a>
- [ ] Listas con viñetas se renderizan
- [ ] Enlaces son clickeables

---

### TC-MD-03: Texto Inicial
**Precondición:** Abrir modal de Markdown por primera vez  
**Pasos:**
1. Verificar que hay texto de ejemplo
2. Verificar que el preview está renderizado

**Resultado Esperado:**
- [ ] Editor tiene texto de ejemplo
- [ ] Preview muestra el ejemplo renderizado
- [ ] Se puede editar y borrar el texto

---

## 📊 Resumen de Ejecución

**Fecha de Ejecución:** _______  
**Ejecutado por:** _______  

### Resultados Globales
| Categoría | Total Casos | Pasados | Fallados |
|-----------|-------------|---------|----------|
| Sistema de Proyectos | 4 | | |
| Calculadora | 3 | | |
| Lista de Tareas | 4 | | |
| Selector de Colores | 3 | | |
| Pomodoro Timer | 4 | | |
| Consulta del Clima | 2 | | |
| Quiz Game | 3 | | |
| Memory Game | 5 | | |
| Calculadora IMC | 3 | | |
| Conversor de Monedas | 3 | | |
| Markdown Previewer | 3 | | |
| **TOTAL** | **37** | | |

**Porcentaje de éxito:** ____%

---

## 🐛 Registro de Defectos

| ID | Proyecto | Severidad | Descripción | Estado |
|----|----------|-----------|-------------|--------|
| - | - | - | - | - |

---

## ✅ Criterios de Aceptación

- ✅ Los 10 mini-proyectos se cargan correctamente
- ✅ Sistema de modales funciona sin errores
- ✅ Filtrado por categorías preciso
- ✅ Cada mini-proyecto cumple su funcionalidad
- ✅ Persistencia de datos (Todo List) funciona
- ✅ No hay errores de JavaScript en consola
- ✅ Responsive en mobile, tablet, desktop
- ✅ Accesible con teclado
- ✅ Performance > 85 Lighthouse

---

**Próximos pasos:** Ejecutar plan, documentar resultados, crear tests automatizados
