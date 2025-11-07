#!/usr/bin/env python3
"""
Optimizador de Imágenes
Comprime imágenes PNG y JPG para mejorar el rendimiento web
Requiere: pip install Pillow
"""

import os
from pathlib import Path
from PIL import Image
import sys

class ImageOptimizer:
    def __init__(self, source_dir, quality=85, max_width=1920):
        self.source_dir = Path(source_dir)
        self.quality = quality
        self.max_width = max_width
        self.stats = {
            'total_files': 0,
            'optimized': 0,
            'original_size': 0,
            'optimized_size': 0,
            'errors': []
        }
    
    def optimize_image(self, image_path):
        """Optimiza una imagen individual"""
        try:
            # Abrir imagen
            img = Image.open(image_path)
            
            # Tamaño original
            original_size = os.path.getsize(image_path)
            self.stats['original_size'] += original_size
            
            # Redimensionar si es muy grande
            if img.width > self.max_width:
                ratio = self.max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((self.max_width, new_height), Image.Resampling.LANCZOS)
            
            # Convertir RGBA a RGB si es necesario (para JPG)
            if image_path.suffix.lower() in ['.jpg', '.jpeg'] and img.mode in ['RGBA', 'LA', 'P']:
                # Crear fondo blanco
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Guardar optimizada
            save_kwargs = {
                'optimize': True,
                'quality': self.quality
            }
            
            if image_path.suffix.lower() == '.png':
                save_kwargs = {'optimize': True}
            
            img.save(image_path, **save_kwargs)
            
            # Tamaño optimizado
            optimized_size = os.path.getsize(image_path)
            self.stats['optimized_size'] += optimized_size
            
            # Calcular ahorro
            saved = original_size - optimized_size
            saved_percent = (saved / original_size * 100) if original_size > 0 else 0
            
            self.stats['optimized'] += 1
            
            return {
                'success': True,
                'original': original_size,
                'optimized': optimized_size,
                'saved': saved,
                'saved_percent': saved_percent
            }
            
        except Exception as e:
            self.stats['errors'].append({
                'file': image_path,
                'error': str(e)
            })
            return {
                'success': False,
                'error': str(e)
            }
    
    def scan_and_optimize(self):
        """Escanea y optimiza todas las imágenes"""
        print("\n🖼️  Image Optimizer")
        print("=" * 60)
        print(f"\n📂 Source: {self.source_dir}")
        print(f"⚙️  Quality: {self.quality}")
        print(f"📏 Max Width: {self.max_width}px\n")
        
        # Extensiones soportadas
        image_extensions = ['.jpg', '.jpeg', '.png']
        
        # Buscar imágenes
        for ext in image_extensions:
            for image_path in self.source_dir.rglob(f'*{ext}'):
                # Saltar directorios específicos
                if any(part in image_path.parts for part in ['node_modules', '.git', 'dist']):
                    continue
                
                self.stats['total_files'] += 1
                
                print(f"Processing: {image_path.name}...", end=' ')
                
                result = self.optimize_image(image_path)
                
                if result['success']:
                    if result['saved'] > 0:
                        print(f"✅ Saved {result['saved']:,} bytes ({result['saved_percent']:.1f}%)")
                    else:
                        print("✅ Already optimized")
                else:
                    print(f"❌ Error: {result['error']}")
        
        # Reporte final
        self.print_report()
    
    def print_report(self):
        """Imprime reporte de optimización"""
        print("\n" + "=" * 60)
        print("📊 Optimization Report\n")
        
        print(f"Total images: {self.stats['total_files']}")
        print(f"Optimized: {self.stats['optimized']}")
        print(f"Errors: {len(self.stats['errors'])}\n")
        
        if self.stats['original_size'] > 0:
            total_saved = self.stats['original_size'] - self.stats['optimized_size']
            total_saved_percent = (total_saved / self.stats['original_size'] * 100)
            
            print(f"Original size:  {self.stats['original_size']:,} bytes ({self.stats['original_size'] / 1024 / 1024:.2f} MB)")
            print(f"Optimized size: {self.stats['optimized_size']:,} bytes ({self.stats['optimized_size'] / 1024 / 1024:.2f} MB)")
            print(f"Total saved:    {total_saved:,} bytes ({total_saved / 1024 / 1024:.2f} MB)")
            print(f"Savings:        {total_saved_percent:.1f}%\n")
        
        if self.stats['errors']:
            print("⚠️  Errors:\n")
            for error in self.stats['errors']:
                print(f"   ❌ {error['file'].name}: {error['error']}")
            print()
        
        print("=" * 60 + "\n")

def main():
    """Función principal"""
    # Verificar Pillow
    try:
        import PIL
    except ImportError:
        print("❌ Error: Pillow no está instalado")
        print("Instalar con: pip install Pillow")
        sys.exit(1)
    
    # Configuración
    source_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'img')
    quality = 85  # Calidad JPEG (1-100)
    max_width = 1920  # Ancho máximo en píxeles
    
    # Verificar si el directorio existe
    if not os.path.exists(source_dir):
        print(f"⚠️  Directory not found: {source_dir}")
        print("Creating directory...")
        os.makedirs(source_dir, exist_ok=True)
        print("✅ Directory created. Add images and run again.")
        sys.exit(0)
    
    # Ejecutar optimización
    optimizer = ImageOptimizer(source_dir, quality, max_width)
    optimizer.scan_and_optimize()

if __name__ == '__main__':
    main()
