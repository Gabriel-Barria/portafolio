"""
Script de validación para Mini Proyectos
Verifica que todos los componentes estén funcionando correctamente
"""

import time
from datetime import datetime

def log(message, status="INFO"):
    """Log con timestamp"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    icons = {"INFO": "ℹ️", "SUCCESS": "✅", "ERROR": "❌", "WARNING": "⚠️"}
    print(f"[{timestamp}] {icons.get(status, '•')} {message}")

def test_docker_container():
    """Verificar que el container esté corriendo"""
    log("Verificando container Docker...")
    import subprocess
    try:
        result = subprocess.run(
            ["docker", "ps", "--filter", "name=portfolio-web", "--format", "{{.Status}}"],
            capture_output=True,
            text=True
        )
        if "Up" in result.stdout:
            log("Container portfolio-web está corriendo", "SUCCESS")
            return True
        else:
            log("Container no está corriendo", "ERROR")
            return False
    except Exception as e:
        log(f"Error al verificar container: {e}", "ERROR")
        return False

def test_files_in_container():
    """Verificar archivos en el container"""
    log("Verificando archivos en container...")
    import subprocess
    
    files_to_check = [
        "/usr/share/nginx/html/css/mini-projects.css",
        "/usr/share/nginx/html/js/mini-projects.js",
        "/usr/share/nginx/html/index.html"
    ]
    
    all_exist = True
    for file_path in files_to_check:
        try:
            result = subprocess.run(
                ["docker", "exec", "portfolio-web", "test", "-f", file_path],
                capture_output=True
            )
            if result.returncode == 0:
                log(f"✓ {file_path.split('/')[-1]} existe", "SUCCESS")
            else:
                log(f"✗ {file_path.split('/')[-1]} NO existe", "ERROR")
                all_exist = False
        except Exception as e:
            log(f"Error verificando {file_path}: {e}", "ERROR")
            all_exist = False
    
    return all_exist

def test_http_response():
    """Verificar respuesta HTTP"""
    log("Verificando respuesta HTTP en localhost:3002...")
    try:
        import urllib.request
        response = urllib.request.urlopen("http://localhost:3002", timeout=5)
        status = response.getcode()
        if status == 200:
            log(f"HTTP {status} - Sitio responde correctamente", "SUCCESS")
            return True
        else:
            log(f"HTTP {status} - Código inesperado", "WARNING")
            return False
    except Exception as e:
        log(f"Error al conectar: {e}", "ERROR")
        return False

def test_css_file():
    """Verificar que CSS se sirva correctamente"""
    log("Verificando acceso a mini-projects.css...")
    try:
        import urllib.request
        response = urllib.request.urlopen("http://localhost:3002/css/mini-projects.css", timeout=5)
        if response.getcode() == 200:
            content = response.read().decode('utf-8')
            if ".project-modal" in content and ".modal-content" in content:
                log("CSS se sirve correctamente y contiene clases esperadas", "SUCCESS")
                return True
            else:
                log("CSS se sirve pero no contiene clases esperadas", "WARNING")
                return False
        else:
            log(f"CSS responde con código {response.getcode()}", "ERROR")
            return False
    except Exception as e:
        log(f"Error al acceder CSS: {e}", "ERROR")
        return False

def test_js_file():
    """Verificar que JS se sirva correctamente"""
    log("Verificando acceso a mini-projects.js...")
    try:
        import urllib.request
        response = urllib.request.urlopen("http://localhost:3002/js/mini-projects.js", timeout=5)
        if response.getcode() == 200:
            content = response.read().decode('utf-8')
            if "miniProjects" in content and "initializeMiniProjects" in content:
                log("JS se sirve correctamente y contiene funciones esperadas", "SUCCESS")
                return True
            else:
                log("JS se sirve pero no contiene funciones esperadas", "WARNING")
                return False
        else:
            log(f"JS responde con código {response.getcode()}", "ERROR")
            return False
    except Exception as e:
        log(f"Error al acceder JS: {e}", "ERROR")
        return False

def test_html_includes():
    """Verificar que index.html incluya los archivos necesarios"""
    log("Verificando referencias en index.html...")
    try:
        import urllib.request
        response = urllib.request.urlopen("http://localhost:3002", timeout=5)
        html = response.read().decode('utf-8')
        
        checks = {
            "mini-projects.css": 'css/mini-projects.css' in html,
            "mini-projects.js": 'js/mini-projects.js' in html,
            "projectModal": 'id="projectModal"' in html,
            "projectsGrid": 'id="projectsGrid"' in html,
            "filter buttons": 'data-filter="tools"' in html
        }
        
        all_passed = True
        for check_name, result in checks.items():
            if result:
                log(f"✓ {check_name} encontrado", "SUCCESS")
            else:
                log(f"✗ {check_name} NO encontrado", "ERROR")
                all_passed = False
        
        return all_passed
    except Exception as e:
        log(f"Error al verificar HTML: {e}", "ERROR")
        return False

def main():
    """Ejecutar todos los tests"""
    print("\n" + "="*60)
    print("🧪 VALIDACIÓN DE MINI PROYECTOS")
    print("="*60 + "\n")
    
    tests = [
        ("Docker Container", test_docker_container),
        ("Archivos en Container", test_files_in_container),
        ("Respuesta HTTP", test_http_response),
        ("Archivo CSS", test_css_file),
        ("Archivo JS", test_js_file),
        ("Referencias HTML", test_html_includes)
    ]
    
    results = {}
    for test_name, test_func in tests:
        print(f"\n--- Test: {test_name} ---")
        results[test_name] = test_func()
        time.sleep(0.5)
    
    # Resumen
    print("\n" + "="*60)
    print("📊 RESUMEN DE RESULTADOS")
    print("="*60)
    
    passed = sum(1 for r in results.values() if r)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests pasados ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("\n🎉 ¡Todos los tests pasaron! El sistema está listo para pruebas manuales.")
        return 0
    else:
        print(f"\n⚠️ {total - passed} test(s) fallaron. Revisar configuración.")
        return 1

if __name__ == "__main__":
    exit(main())
