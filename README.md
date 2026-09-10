# Control OT · Top Motors — Guía de instalación

App web instalable en Android que busca una OT en tu Excel de Google Drive
(`TM_TSI Control Inicio Fin Mecanicos_260908.xlsx`) y registra la hora de
inicio/fin de atención con un botón.

No requiere servidor propio: se aloja gratis en **GitHub Pages** y desde tu
teléfono se "instala" como cualquier app (ícono en el home, pantalla completa).

---

## ⚠️ Paso 0 — Antes que nada: revisa el permiso del archivo

Revisé el archivo en Drive y hoy solo tiene permiso de **lectura** para
"cualquiera con el enlace". Para que la app pueda **guardar** las horas
necesitas permiso de **edición**:

1. Abre el archivo en Google Drive → botón **Compartir**.
2. Agrega tu cuenta (`martin.aniceto.sotero@gmail.com`) o cambia "Cualquier
   persona con el enlace" de **Lector** a **Editor**.

Sin este paso, la app podrá *buscar* OTs pero fallará al intentar *guardar*
(verás un aviso claro en la app si esto pasa).

---

## Paso 1 — Cuenta de GitHub (gratis)

1. Entra a https://github.com y crea una cuenta si no tienes una.
2. Crea un repositorio nuevo:
   - Ve a https://github.com/new
   - Nombre: `control-ot-tm` (o el que prefieras)
   - Público (necesario para el plan gratis de GitHub Pages)
   - Crear repositorio

3. Sube estos 4 archivos al repositorio (botón **"Add file" → "Upload files"**
   en la página del repo, y arrastra los archivos de esta carpeta):
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`

4. Activa GitHub Pages:
   - En el repo: **Settings → Pages**
   - "Branch": elige `main` y carpeta `/ (root)` → **Save**
   - Espera 1-2 minutos. Tu app quedará publicada en:
     `https://TU-USUARIO.github.io/control-ot-tm/`

Anota esa URL exacta — la necesitas en el paso siguiente.

---

## Paso 2 — Crear credenciales de Google (Client ID)

Esto le dice a Google que tu app tiene permiso de pedirte acceso a Drive.

1. Ve a https://console.cloud.google.com/ (con tu cuenta de Google, la misma
   que usarás en la app).
2. Crea un proyecto nuevo: menú superior → **Nuevo proyecto** → nómbralo
   "Control OT TM" → Crear.
3. Habilita la API de Drive:
   - Menú ☰ → **APIs y servicios → Biblioteca**
   - Busca "Google Drive API" → **Habilitar**
4. Configura la pantalla de consentimiento OAuth:
   - Menú ☰ → **APIs y servicios → Pantalla de consentimiento de OAuth**
   - Tipo de usuario: **Externo** → Crear
   - Nombre de la app: "Control OT Top Motors", correo de soporte: el tuyo
   - Guarda y continúa en las siguientes pantallas (no hace falta llenar todo)
   - En **"Usuarios de prueba"**, agrega tu correo
     (`martin.aniceto.sotero@gmail.com`)
   - Guarda. La app queda en modo "Prueba" — funciona perfecto para uso
     personal, sin límite de tiempo, mientras tu correo esté en la lista de
     prueba (no necesitas "publicar" ni pasar la revisión de Google).
5. Crea el Client ID:
   - Menú ☰ → **APIs y servicios → Credenciales**
   - **Crear credenciales → ID de cliente de OAuth**
   - Tipo de aplicación: **Aplicación web**
   - Nombre: "Control OT Web"
   - En **"Orígenes de JavaScript autorizados"** agrega la URL de GitHub
     Pages del Paso 1, **sin barra final**, por ejemplo:
     `https://TU-USUARIO.github.io`
   - Crear
   - Copia el **Client ID** que te muestra (termina en
     `.apps.googleusercontent.com`)

---

## Paso 3 — Pegar el Client ID en la app

1. Abre `index.html` (en tu computadora, con cualquier editor de texto, o
   directo en GitHub con el botón de lápiz ✏️).
2. Busca la línea:
   ```js
   CLIENT_ID: 'PEGA_AQUI_TU_CLIENT_ID.apps.googleusercontent.com',
   ```
3. Reemplaza el texto entre comillas por el Client ID que copiaste.
4. Guarda y vuelve a subir el archivo a GitHub (si lo editaste localmente),
   o guarda el cambio directo si lo editaste en la web de GitHub.

El `FILE_ID` del Excel ya viene puesto correctamente — no lo toques a menos
que cambien de archivo.

---

## Paso 4 — Instalar en tu Android

1. Abre Chrome en tu teléfono y entra a tu URL de GitHub Pages
   (`https://TU-USUARIO.github.io/control-ot-tm/`).
2. Toca **"Conectar con Google Drive"** y acepta el permiso (la primera vez
   Google puede mostrar un aviso de "app no verificada" — es normal en modo
   de prueba: toca **Avanzado → Ir a Control OT Top Motors (no seguro)**).
3. Toca el menú ⋮ de Chrome → **"Instalar app"** (o "Agregar a pantalla de
   inicio"). Quedará como un ícono más en tu teléfono, se abre a pantalla
   completa.

---

## Cómo funciona la app

- Al abrir, detecta el mes actual y busca/guarda en la hoja de ese mes
  (SETIEMBRE, NOVIEMBRE o DICIEMBRE). Si el mes no tiene hoja creada, te
  avisa y usa la primera hoja disponible — pide a sistemas que cree la hoja
  del mes que falte (ej. OCTUBRE) con el mismo formato que las demás.
- Ingresas el número de OT y toca "Buscar OT":
  - Si existe y le falta hora de inicio → eliges Mecánico y Responsable y
    tocas "Registrar hora de inicio (ahora)".
  - Si ya tiene inicio pero no fin → tocas "Registrar hora de fin (ahora)".
  - Si ya tiene ambas horas → solo se muestra la información.
  - Si la OT no existe todavía → puedes crear el registro desde cero.
- La app agrega automáticamente una columna **FECHA** (además de las horas)
  la primera vez que se usa cada hoja — no necesitas tocar el Excel a mano.

## Cosas a tener en cuenta

- La sesión de Google dura ~1 hora; si pasa ese tiempo la app te pedirá
  reconectar (un toque, no hay que rehacer todo el proceso).
- Como es un solo usuario (tú), no hay control de que dos personas editen al
  mismo tiempo. Si en algún momento das acceso a más personas, dos guardados
  casi simultáneos podrían pisarse entre sí.
- El Mecánico y Responsable salen de una lista fija (Diego Castellanos,
  Jesus Lara, Rolber Mendoza, Angelo Ramirez). Si cambia el equipo, edita el
  arreglo `MECANICOS` en `index.html`.
# Control OT · Top Motors — Guía de instalación

App web instalable en Android que busca una OT en tu Excel de Google Drive
(`TM_TSI Control Inicio Fin Mecanicos_260908.xlsx`) y registra la hora de
inicio/fin de atención con un botón.

No requiere servidor propio: se aloja gratis en **GitHub Pages** y desde tu
teléfono se "instala" como cualquier app (ícono en el home, pantalla completa).

---

## ⚠️ Paso 0 — Antes que nada: revisa el permiso del archivo

Revisé el archivo en Drive y hoy solo tiene permiso de **lectura** para
"cualquiera con el enlace". Para que la app pueda **guardar** las horas
necesitas permiso de **edición**:

1. Abre el archivo en Google Drive → botón **Compartir**.
2. Agrega tu cuenta (`martin.aniceto.sotero@gmail.com`) o cambia "Cualquier
   persona con el enlace" de **Lector** a **Editor**.

Sin este paso, la app podrá *buscar* OTs pero fallará al intentar *guardar*
(verás un aviso claro en la app si esto pasa).

---

## Paso 1 — Cuenta de GitHub (gratis)

1. Entra a https://github.com y crea una cuenta si no tienes una.
2. Crea un repositorio nuevo:
   - Ve a https://github.com/new
   - Nombre: `control-ot-tm` (o el que prefieras)
   - Público (necesario para el plan gratis de GitHub Pages)
   - Crear repositorio

3. Sube estos 5 archivos al repositorio (botón **"Add file" → "Upload files"**
   en la página del repo, y arrastra los archivos de esta carpeta):
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`

4. Activa GitHub Pages:
   - En el repo: **Settings → Pages**
   - "Branch": elige `main` y carpeta `/ (root)` → **Save**
   - Espera 1-2 minutos. Tu app quedará publicada en:
     `https://TU-USUARIO.github.io/control-ot-tm/`

Anota esa URL exacta — la necesitas en el paso siguiente.

---

## Paso 2 — Crear credenciales de Google (Client ID)

Esto le dice a Google que tu app tiene permiso de pedirte acceso a Drive.

1. Ve a https://console.cloud.google.com/ (con tu cuenta de Google, la misma
   que usarás en la app).
2. Crea un proyecto nuevo: menú superior → **Nuevo proyecto** → nómbralo
   "Control OT TM" → Crear.
3. Habilita la API de Drive:
   - Menú ☰ → **APIs y servicios → Biblioteca**
   - Busca "Google Drive API" → **Habilitar**
4. Configura la pantalla de consentimiento OAuth:
   - Menú ☰ → **APIs y servicios → Pantalla de consentimiento de OAuth**
   - Tipo de usuario: **Externo** → Crear
   - Nombre de la app: "Control OT Top Motors", correo de soporte: el tuyo
   - Guarda y continúa en las siguientes pantallas (no hace falta llenar todo)
   - En **"Usuarios de prueba"**, agrega tu correo
     (`martin.aniceto.sotero@gmail.com`)
   - Guarda. La app queda en modo "Prueba" — funciona perfecto para uso
     personal, sin límite de tiempo, mientras tu correo esté en la lista de
     prueba (no necesitas "publicar" ni pasar la revisión de Google).
5. Crea el Client ID:
   - Menú ☰ → **APIs y servicios → Credenciales**
   - **Crear credenciales → ID de cliente de OAuth**
   - Tipo de aplicación: **Aplicación web**
   - Nombre: "Control OT Web"
   - En **"Orígenes de JavaScript autorizados"** agrega la URL de GitHub
     Pages del Paso 1, **sin barra final**, por ejemplo:
     `https://TU-USUARIO.github.io`
   - Crear
   - Copia el **Client ID** que te muestra (termina en
     `.apps.googleusercontent.com`)

---

## Paso 3 — Pegar el Client ID en la app

1. Abre `index.html` (en tu computadora, con cualquier editor de texto, o
   directo en GitHub con el botón de lápiz ✏️).
2. Busca la línea:
   ```js
   CLIENT_ID: 'PEGA_AQUI_TU_CLIENT_ID.apps.googleusercontent.com',
   ```
3. Reemplaza el texto entre comillas por el Client ID que copiaste.
4. Guarda y vuelve a subir el archivo a GitHub (si lo editaste localmente),
   o guarda el cambio directo si lo editaste en la web de GitHub.

El `FILE_ID` del Excel ya viene puesto correctamente — no lo toques a menos
que cambien de archivo.

---

## Paso 4 — Instalar en tu Android

1. Abre Chrome en tu teléfono y entra a tu URL de GitHub Pages
   (`https://TU-USUARIO.github.io/control-ot-tm/`).
2. Toca **"Conectar con Google Drive"** y acepta el permiso (la primera vez
   Google puede mostrar un aviso de "app no verificada" — es normal en modo
   de prueba: toca **Avanzado → Ir a Control OT Top Motors (no seguro)**).
3. Toca el menú ⋮ de Chrome → **"Instalar app"** (o "Agregar a pantalla de
   inicio"). Quedará como un ícono más en tu teléfono, se abre a pantalla
   completa.

---

## Cómo funciona la app

- Al abrir, detecta el mes actual y busca/guarda en la hoja de ese mes
  (SETIEMBRE, NOVIEMBRE o DICIEMBRE). Si el mes no tiene hoja creada, te
  avisa y usa la primera hoja disponible — pide a sistemas que cree la hoja
  del mes que falte (ej. OCTUBRE) con el mismo formato que las demás.
- Ingresas el número de OT y toca "Buscar OT":
  - Si existe y le falta hora de inicio → eliges Mecánico y Responsable y
    tocas "Registrar hora de inicio (ahora)".
  - Si ya tiene inicio pero no fin → tocas "Registrar hora de fin (ahora)".
  - Si ya tiene ambas horas → solo se muestra la información.
  - Si la OT no existe todavía → puedes crear el registro desde cero.
- La app agrega automáticamente una columna **FECHA** (además de las horas)
  la primera vez que se usa cada hoja — no necesitas tocar el Excel a mano.

## Cosas a tener en cuenta

- La sesión de Google dura ~1 hora; si pasa ese tiempo la app te pedirá
  reconectar (un toque, no hay que rehacer todo el proceso).
- Como es un solo usuario (tú), no hay control de que dos personas editen al
  mismo tiempo. Si en algún momento das acceso a más personas, dos guardados
  casi simultáneos podrían pisarse entre sí.
- El Mecánico y Responsable salen de una lista fija (Diego Castellanos,
  Jesus Lara, Rolber Mendoza, Angelo Ramirez). Si cambia el equipo, edita el
  arreglo `MECANICOS` en `index.html`.
