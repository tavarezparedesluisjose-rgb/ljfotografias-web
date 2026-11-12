# LJ Fotografías · sitio web

Página de LJ Fotografías para **tavarezparedesluisjose.com**: portafolio, catálogo de experiencias con paquetes y precios, comparador, demostración de impresiones, marcos y álbum, y reserva por WhatsApp.

## Qué hay en esta carpeta

| Archivo o carpeta | Para qué sirve |
| --- | --- |
| `data/catalogo.json` | Precios, paquetes, beneficios, servicios y número de WhatsApp. Es lo que se edita desde el panel. |
| `src/index.html` | Diseño, animaciones y funcionamiento de la página. |
| `img/` | Fotos. Las fotos nuevas que subas desde el panel también quedan aquí. |
| `build.js` | Une el diseño con los datos y genera la página final en `dist/`. GitHub lo ejecuta solo. |
| `.github/workflows/pages.yml` | Publica la página en GitHub Pages en cada cambio. |
| `.pages.yml` | Configuración del panel de edición (Pages CMS). |
| `favicon.svg`, `apple-touch-icon.png` | Ícono del obturador para el navegador y el teléfono. |

`robots.txt` y `sitemap.xml` se generan solos al publicar.

## Dónde está publicada

La página se publica gratis con **GitHub Pages**, sin avisos de terceros. Cada cambio en `main` se publica solo en uno o dos minutos (pestaña **Actions** del repositorio).

### Dominio en GoDaddy (ya configurado)
- Cuatro registros **A** con nombre `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- Registro **CNAME** `www` → `tavarezparedesluisjose-rgb.github.io`.
- Los registros del correo de Microsoft 365 (MX, TXT, autodiscover…) no se tocan.

El archivo `CNAME` con el dominio se genera solo desde `config.dominio` en `data/catalogo.json`. Si cambias de dominio, cámbialo ahí y en **Settings › Pages** del repositorio.

Las reservas llegan por WhatsApp con todos los datos del formulario.

## Aparecer en Google
1. Entra a search.google.com/search-console y agrega una propiedad de tipo **Dominio** con `tavarezparedesluisjose.com`.
2. Google te da un registro **TXT**: agrégalo en el DNS de GoDaddy y pulsa Verificar.
3. En **Sitemaps** envía `sitemap.xml`.
4. En **Inspección de URL** pega `https://tavarezparedesluisjose.com/` y pulsa **Solicitar indexación**.
5. Crea o reclama tu ficha en **Google Business Profile** (Fotógrafo, Punta Cana). Es lo que más ayuda para salir en “fotógrafo en Punta Cana” y en Google Maps.

La página ya incluye título, descripción, imagen para compartir y datos estructurados de negocio local con tus paquetes y precios.

## Editar después

**Tú, sin código:** entra a app.pagescms.org con GitHub, elige `ljfotografias-web` y abre **Catálogo y precios**. Puedes cambiar precios, beneficios, fotos, servicios y el número de WhatsApp. Al guardar, GitHub publica el cambio en uno o dos minutos.

**Con Claude:** pide el cambio en el chat (nuevas secciones, animaciones, diseño). Con GitHub conectado, Claude sube el cambio al repositorio y GitHub lo publica solo.

## Probar en tu computadora (opcional)
Con Node instalado: `node build.js` y abre `dist/index.html`.
