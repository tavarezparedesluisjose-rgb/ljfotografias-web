# LJ Fotografías · sitio web

Página de LJ Fotografías para **tavarezparedesluisjose.com**: portafolio, catálogo de experiencias con paquetes y precios, comparador, demostración de impresiones, marcos y álbum, y reserva por WhatsApp.

## Qué hay en esta carpeta

| Archivo o carpeta | Para qué sirve |
| --- | --- |
| `data/catalogo.json` | Precios, paquetes, beneficios, servicios y número de WhatsApp. Es lo que se edita desde el panel. |
| `src/index.html` | Diseño, animaciones y funcionamiento de la página. |
| `img/` | Fotos. Las fotos nuevas que subas desde el panel también quedan aquí. |
| `build.js` | Une el diseño con los datos y genera la página final en `dist/`. Netlify lo ejecuta solo. |
| `netlify.toml` | Le dice a Netlify cómo publicar. |
| `.pages.yml` | Configuración del panel de edición (Pages CMS). |
| `favicon.svg`, `apple-touch-icon.png` | Ícono del obturador para el navegador y el teléfono. |

`robots.txt` y `sitemap.xml` se generan solos al publicar.

## Publicar por primera vez

### 1. Subir a GitHub
1. En github.com crea un repositorio nuevo llamado `ljfotografias-web` (puede ser privado).
2. Sube todo el contenido de esta carpeta. En Mac, pulsa **Cmd + Shift + .** en el Finder para ver los archivos ocultos (`.pages.yml` y `.gitignore`) y súbelos también.

La forma más simple es conectar GitHub a Claude (Configuración › Conectores › GitHub) y pedirle a Claude que lo suba.

### 2. Publicar con Netlify
1. Entra a netlify.com con tu cuenta de GitHub.
2. **Add new site › Import an existing project › GitHub** y elige `ljfotografias-web`.
3. No cambies nada: `netlify.toml` ya indica el comando (`node build.js`) y la carpeta (`dist`). Pulsa **Deploy**.
4. En **Forms**, activa la detección de formularios para que se guarden las solicitudes de reserva. Ahí puedes activar un aviso por correo.

### 3. Conectar el dominio de GoDaddy
1. En Netlify: **Domain management › Add a domain** › `tavarezparedesluisjose.com`.
2. En GoDaddy: **Mis productos › DNS** del dominio.
   - Registro **A**, nombre `@`, valor `75.2.60.5`. Borra otros registros A de `@` y cualquier “Forwarding” o página de estacionamiento.
   - Registro **CNAME**, nombre `www`, valor `TU-SITIO.netlify.app` (el nombre que te dio Netlify).
3. Espera a que se propague (puede tardar hasta un día). Netlify activa el candado HTTPS solo.

### 4. Aparecer en Google
1. Entra a search.google.com/search-console y agrega una propiedad de tipo **Dominio** con `tavarezparedesluisjose.com`.
2. Google te da un registro **TXT**: agrégalo en el DNS de GoDaddy y pulsa Verificar.
3. En **Sitemaps** envía `sitemap.xml`.
4. En **Inspección de URL** pega `https://tavarezparedesluisjose.com/` y pulsa **Solicitar indexación**.
5. Crea o reclama tu ficha en **Google Business Profile** (Fotógrafo, Punta Cana). Es lo que más ayuda para salir en “fotógrafo en Punta Cana” y en Google Maps.

La página ya incluye título, descripción, imagen para compartir y datos estructurados de negocio local con tus paquetes y precios.

## Editar después

**Tú, sin código:** entra a app.pagescms.org con GitHub, elige `ljfotografias-web` y abre **Catálogo y precios**. Puedes cambiar precios, beneficios, fotos, servicios y el número de WhatsApp. Al guardar, Netlify publica el cambio en uno o dos minutos.

**Con Claude:** pide el cambio en el chat (nuevas secciones, animaciones, diseño). Con GitHub conectado, Claude sube el cambio al repositorio y Netlify lo publica solo.

## Probar en tu computadora (opcional)
Con Node instalado: `node build.js` y abre `dist/index.html`.
