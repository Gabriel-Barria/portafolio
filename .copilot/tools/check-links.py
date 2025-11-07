#!/usr/bin/env python3
"""
Validador de Enlaces
Verifica que todos los enlaces internos y externos funcionen correctamente
"""

import re
import os
from pathlib import Path
from urllib.parse import urlparse
import http.client
import time

class LinkChecker:
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.broken_links = []
        self.checked_urls = {}
        
    def check_url(self, url, max_retries=2):
        """Verifica si una URL externa responde"""
        if url in self.checked_urls:
            return self.checked_urls[url]
        
        parsed = urlparse(url)
        
        if not parsed.scheme or not parsed.netloc:
            return True  # URL relativa, se verifica de otra forma
        
        for attempt in range(max_retries):
            try:
                if parsed.scheme == 'https':
                    conn = http.client.HTTPSConnection(parsed.netloc, timeout=5)
                else:
                    conn = http.client.HTTPConnection(parsed.netloc, timeout=5)
                
                conn.request('HEAD', parsed.path or '/')
                response = conn.getresponse()
                conn.close()
                
                status = response.status
                success = 200 <= status < 400
                
                self.checked_urls[url] = success
                return success
                
            except Exception as e:
                if attempt == max_retries - 1:
                    self.checked_urls[url] = False
                    return False
                time.sleep(1)
        
        return False
    
    def check_file_exists(self, file_path):
        """Verifica si un archivo local existe"""
        # Normalizar ruta
        if file_path.startswith('/'):
            file_path = file_path[1:]
        
        full_path = self.base_dir / file_path
        return full_path.exists()
    
    def extract_links(self, content, file_type='html'):
        """Extrae enlaces de contenido HTML, CSS o JS"""
        links = []
        
        if file_type == 'html':
            # href="..."
            links.extend(re.findall(r'href=["\'](.*?)["\']', content))
            # src="..."
            links.extend(re.findall(r'src=["\'](.*?)["\']', content))
            # url(...)
            links.extend(re.findall(r'url\(["\']?(.*?)["\']?\)', content))
        
        elif file_type == 'css':
            # url(...)
            links.extend(re.findall(r'url\(["\']?(.*?)["\']?\)', content))
        
        elif file_type == 'js':
            # Rutas en strings
            links.extend(re.findall(r'["\']([./][^"\']*?\.(jpg|jpeg|png|gif|svg|css|js|json))["\']', content))
        
        return links
    
    def check_file(self, file_path):
        """Verifica enlaces en un archivo"""
        print(f"Checking: {file_path.name}...", end=' ')
        
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Determinar tipo de archivo
        ext = file_path.suffix.lower()
        file_type = {
            '.html': 'html',
            '.htm': 'html',
            '.css': 'css',
            '.js': 'js'
        }.get(ext, 'html')
        
        # Extraer enlaces
        links = self.extract_links(content, file_type)
        
        broken_in_file = []
        
        for link in links:
            # Saltar anclas, mailto, tel, javascript
            if link.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:')):
                continue
            
            # Verificar si es URL externa
            if link.startswith(('http://', 'https://')):
                if not self.check_url(link):
                    broken_in_file.append(f"❌ {link} (external URL down)")
            
            # Verificar archivo local
            else:
                if not self.check_file_exists(link):
                    broken_in_file.append(f"⚠️  {link} (file not found)")
        
        if broken_in_file:
            print(f"❌ {len(broken_in_file)} broken")
            self.broken_links.append({
                'file': file_path.relative_to(self.base_dir),
                'links': broken_in_file
            })
        else:
            print("✅")
    
    def scan_directory(self):
        """Escanea todo el directorio"""
        print("\n🔗 Link Checker")
        print("=" * 60)
        print(f"\n📂 Scanning: {self.base_dir}\n")
        
        # Archivos a verificar
        patterns = ['**/*.html', '**/*.htm', '**/*.css', '**/*.js']
        
        files_checked = 0
        for pattern in patterns:
            for file_path in self.base_dir.rglob(pattern):
                # Saltar directorios de dependencias
                if any(part in file_path.parts for part in ['node_modules', '.git', 'dist']):
                    continue
                
                self.check_file(file_path)
                files_checked += 1
        
        # Reporte
        print("\n" + "=" * 60)
        print("📊 Link Check Report\n")
        print(f"Files checked: {files_checked}")
        print(f"Broken links: {len(self.broken_links)}")
        
        if self.broken_links:
            print("\n⚠️  Issues Found:\n")
            for item in self.broken_links:
                print(f"📄 {item['file']}")
                for link in item['links']:
                    print(f"   {link}")
                print()
        else:
            print("\n✅ All links are valid!\n")
        
        print("=" * 60 + "\n")
        
        return len(self.broken_links) == 0

def main():
    """Función principal"""
    # Ruta base del proyecto
    base_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'public')
    
    checker = LinkChecker(base_dir)
    success = checker.scan_directory()
    
    # Exit code para CI/CD
    exit(0 if success else 1)

if __name__ == '__main__':
    main()
