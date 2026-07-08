# Ordena - Sistema de Gestión de Pedidos para Restaurantes

Este proyecto es una aplicación web fullstack diseñada para la gestión integral de pedidos en restaurantes. Permite el control de productos, usuarios, mesas y órdenes mediante un sistema de control de acceso basado en roles (RBAC) con los perfiles de ADMINISTRADOR, MESERO, COCINERO y CLIENTE.

**Tecnologías principales:** React.js (Frontend), Node.js con Express.js (Backend) y MySQL (Base de datos).

---

## Instrucciones de Instalación y Despliegue (Paso a Paso)

Siga estas instrucciones detalladas para clonar, configurar la base de datos y ejecutar el proyecto localmente en su entorno de desarrollo.

### Prerrequisitos
Asegúrese de tener instalado en su sistema:
* **Node.js** (Versión v18 o superior recomendada)
* **MySQL Server** (A través de MySQL Workbench)
* **Git**

---




### 1. Clonar el Repositorio
Abra su terminal (Git Bash, CMD o PowerShell) y ejecute los siguientes comandos para clonar el proyecto y situarse en la raíz:

```bash
git clone https://github.com/stevencara2009/team_2_project_ordena_fullstack.git
cd team_2_project_ordena_fullstack





### 2. Importar la Base de Datos en MySQL Workbench
El repositorio ya incluye el volcado de la base de datos (Dump Structure and Data) exportado directamente desde MySQL Workbench. Para restaurarlo, siga estos pasos:

Abra MySQL Workbench y conéctese a su instancia local.

Asegúrese de que el servicio de MySQL esté activo.

En la barra lateral izquierda (panel Navigator), vaya a la pestaña Management y haga clic en Data Import/Restore.

En la ventana que se abre, seleccione la opción Import from Self-Contained File.

Haga clic en el botón de los tres puntos (...) y busque el archivo de respaldo ubicado en el proyecto en: backend/database/init.sql

En la opción Default Target Schema, si no tiene la base de datos creada, puede hacer clic en New... y nombrarla como ordena_db.

Vaya a la pestaña Import Progress (abajo a la derecha) y haga clic en el botón Start Import.

Una vez finalizado el proceso, haga clic en el botón de actualizar (Refresh) en la sección de Schemas para comprobar que se han creado todas las tablas con sus respectivos registros de prueba.






### 3. Configuración y Arranque del Backend
Desde la raíz del proyecto, navegue a la carpeta del backend:

Bash
cd backend
Instale todas las dependencias del servidor:

Bash
npm install
Cree un archivo llamado exactamente .env dentro de la carpeta backend/ y configure sus credenciales de acceso locales de MySQL:

Fragmento de código. Ejemplo:
PORT = 1234

DB_HOST = localhost
DB_USER = root
DB_PORT = 3306
DB_PASSWORD = 123456789
DB_DATABASE = ordena

CLOUDINARY_CLOUD_NAME = dbhwc6lgi
CLOUDINARY_API_KEY = 835918579196947
CLOUDINARY_API_SECRET = g2bFuMqcr8ZVJaJWEbfc2Axh6vQ
CLOUDINARY_URL = cloudinary://835918579196947:g2bFuMqcr8ZVJaJWEbfc2Axh6vQ@dbhwc6lgi

(Nota: Reemplace SU_CONTRASEÑA_DE_MYSQL_AQUI por la clave de su usuario local de MySQL. Si no tiene contraseña, deje el espacio en blanco).

Inicie el servidor de Node.js en modo desarrollo con soporte de base de datos MySQL:

Bash
npm run start:mysql
Debería ver un mensaje indicando que el servidor está corriendo en el puerto 1234 y que la base de datos se ha conectado exitosamente.







### 4.  Configuración y Arranque del Frontend
Abra una nueva ventana o pestaña de la terminal (para dejar el backend corriendo en segundo plano) y sitúese de nuevo en la raíz del proyecto.

Navegue a la carpeta del frontend:

Bash
cd frontend
Instale las dependencias de la interfaz de usuario:

Bash
npm install
Cree un archivo llamado .env dentro de la carpeta frontend/ para configurar la URL de la API:

Fragmento de código
VITE_API_URL=http://localhost:1234
Inicie el servidor de desarrollo de React (Vite):

Bash
npm run dev







### 5.  Acceso a la Aplicación
Una vez que ambos servidores estén encendidos, abra su navegador web de preferencia e ingrese a la siguiente dirección para interactuar con el sistema de gestión de pedidos:

👉 http://localhost:5173/login





🔑 Credenciales de Prueba Disponibles:
Utilice las cuentas de correo y contraseñas que se importaron por defecto en su tabla TBL_USERS para probar los diferentes flujos del sistema según su rol (Administrador, Mesero, Cocinero o Cliente). Ejemplo para el rol de administrador:

user: stevencara20@gmail.com
password: 123456A#