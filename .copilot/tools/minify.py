#!/usr/bin/env python3
"""
Minificador de CSS y JS
Optimiza archivos para producción removiendo espacios, comentarios y líneas vacías
"""

import re
import os
from pathlib import Path

def minify_css(content):
    """Minifica contenido CSS"""
    # Remover comentarios /* */
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Remover líneas vacías
    content = re.sub(r'\n\s*\n', '\n', content)
    
    # Remover espacios innecesarios
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s*{\s*', '{', content)
    content = re.sub(r'\s*}\s*', '}', content)
    content = re.sub(r'\s*:\s*', ':', content)
    content = re.sub(r'\s*;\s*', ';', content)
    content = re.sub(r'\s*,\s*', ',', content)
    
    return content.strip()

def minify_js(content):
    """Minifica contenido JavaScript (básico)"""
    # Remover comentarios de línea //
    content = re.sub(r'//.*', '', content)
    
    # Remover comentarios de bloque /* */
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Remover líneas vacías
    content = re.sub(r'\n\s*\n', '\n', content)
    
    # Remover espacios múltiples (conservar strings)
    # Nota: Esta es una minificación básica, para producción usar herramientas como Terser
    content = re.sub(r'\n', '', content)
    content = re.sub(r'\s+', ' ', content)
    
    return content.strip()

def process_files(source_dir, output_dir):
    """Procesa todos los archivos CSS y JS"""
    source_path = Path(source_dir)
    output_path = Path(output_dir)
    
    # Crear directorio de salida si no existe
    output_path.mkdir(parents=True, exist_ok=True)
    
    stats = {
        'css': {'original': 0, 'minified': 0, 'savings': 0},
        'js': {'original': 0, 'minified': 0, 'savings': 0}
    }
    
    # Procesar archivos CSS
    for css_file in source_path.rglob('*.css'):
        with open(css_file, 'r', encoding='utf-8') as f:
            original = f.read()
            stats['css']['original'] += len(original)
        
        minified = minify_css(original)
        stats['css']['minified'] += len(minified)
        
        # Crear estructura de directorios
        relative_path = css_file.relative_to(source_path)
        output_file = output_path / relative_path.parent / f"{relative_path.stem}.min.css"
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(minified)
        
        print(f"✅ {relative_path} → {relative_path.parent}/{relative_path.stem}.min.css")
    
    # Procesar archivos JS
    for js_file in source_path.rglob('*.js'):
        if js_file.stem.endswith('.min'):
            continue  # Saltar archivos ya minificados
            
        with open(js_file, 'r', encoding='utf-8') as f:
            original = f.read()
            stats['js']['original'] += len(original)
        
        minified = minify_js(original)
        stats['js']['minified'] += len(minified)
        
        # Crear estructura de directorios
        relative_path = js_file.relative_to(source_path)
        output_file = output_path / relative_path.parent / f"{relative_path.stem}.min.js"
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(minified)
        
        print(f"✅ {relative_path} → {relative_path.parent}/{relative_path.stem}.min.js")
    
    # Calcular ahorros
    stats['css']['savings'] = ((stats['css']['original'] - stats['css']['minified']) / stats['css']['original'] * 100) if stats['css']['original'] > 0 else 0
    stats['js']['savings'] = ((stats['js']['original'] - stats['js']['minified']) / stats['js']['original'] * 100) if stats['js']['original'] > 0 else 0
    
    return stats

def main():
    """Función principal"""
    print("\n🗜️  Minificador CSS/JS")
    print("=" * 50)
    
    # Configuración
    source_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'public')
    output_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'dist')
    
    print(f"\n📂 Source: {source_dir}")
    print(f"📂 Output: {output_dir}\n")
    
    # Procesar archivos
    stats = process_files(source_dir, output_dir)
    
    # Mostrar estadísticas
    print("\n" + "=" * 50)
    print("📊 Estadísticas de Minificación\n")
    
    if stats['css']['original'] > 0:
        print(f"CSS:")
        print(f"  Original:  {stats['css']['original']:,} bytes")
        print(f"  Minified:  {stats['css']['minified']:,} bytes")
        print(f"  Ahorrado:  {stats['css']['savings']:.1f}%\n")
    
    if stats['js']['original'] > 0:
        print(f"JavaScript:")
        print(f"  Original:  {stats['js']['original']:,} bytes")
        print(f"  Minified:  {stats['js']['minified']:,} bytes")
        print(f"  Ahorrado:  {stats['js']['savings']:.1f}%\n")
    
    print("=" * 50)
    print("✅ Minificación completada!\n")

if __name__ == '__main__':
    main()
