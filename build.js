// Construye la página publicada en dist/ a partir de src/index.html y data/catalogo.json.
// GitHub Actions lo ejecuta solo en cada cambio (ver .github/workflows/pages.yml). No necesita instalar nada.
const fs = require("fs");
const path = require("path");

const raiz = __dirname;
const dist = path.join(raiz, "dist");
const datos = JSON.parse(fs.readFileSync(path.join(raiz, "data", "catalogo.json"), "utf8"));
const dominio = String(datos.config.dominio || "").replace(/^https?:\/\//, "").replace(/\/+$/, "");
const url = "https://" + dominio + "/";
const seguro = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

// Datos estructurados para Google: negocio local con sus paquetes y precios.
const paquetes = [];
datos.categorias.forEach((c) => (c.paquetes || []).forEach((p) => paquetes.push({ c, p })));
const rd = paquetes.filter((x) => x.p.mon === "RD$" && Number(x.p.precio) > 0).map((x) => Number(x.p.precio));
const fmt = (n) => n.toLocaleString("en-US");
const negocio = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": url + "#negocio",
  name: "LJ Fotografías",
  alternateName: "L-J Fotografía",
  description: "Fotógrafo de bodas, quince años, retratos, sesiones casuales, fotografía inmobiliaria y eventos en Punta Cana, República Dominicana.",
  url,
  image: url + "img/ig-c8.jpg",
  logo: url + "apple-touch-icon.png",
  telephone: "+" + String(datos.config.whatsapp || "").replace(/\D/g, ""),
  priceRange: rd.length ? "RD$" + fmt(Math.min(...rd)) + " – RD$" + fmt(Math.max(...rd)) : undefined,
  foundingDate: "2017",
  founder: { "@type": "Person", name: "Luis José Tavarez Paredes" },
  address: { "@type": "PostalAddress", addressLocality: "Punta Cana", addressRegion: "La Altagracia", addressCountry: "DO" },
  areaServed: [{ "@type": "City", name: "Punta Cana" }, { "@type": "Country", name: "República Dominicana" }],
  sameAs: ["https://www.instagram.com/ljfotografias87", "https://l-jfotografia.mypixieset.com/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Experiencias fotográficas",
    itemListElement: datos.categorias.map((c) => ({
      "@type": "OfferCatalog",
      name: c.nombre,
      itemListElement: (c.paquetes || c.servicios || []).map((it) => {
        const oferta = { "@type": "Offer", itemOffered: { "@type": "Service", name: it.nombre, description: it.corto } };
        if (it.precio) { oferta.price = String(it.precio); oferta.priceCurrency = it.mon === "US$" ? "USD" : "DOP"; }
        return oferta;
      })
    }))
  }
};

let html = fs.readFileSync(path.join(raiz, "src", "index.html"), "utf8");
html = html
  .replace("/*@@CONFIG@@*/null", seguro(datos.config))
  .replace("/*@@CATALOGO@@*/null", seguro(datos.categorias))
  .replace("/*@@ADICIONALES@@*/null", seguro(datos.adicionales || {}))
  .replace("<!--@@JSONLD@@-->", '<script type="application/ld+json">' + seguro(negocio) + "</script>")
  .split("@@DOMINIO@@").join(dominio);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, "index.html"), html);
fs.cpSync(path.join(raiz, "img"), path.join(dist, "img"), { recursive: true });
["favicon.svg", "apple-touch-icon.png"].forEach((f) => {
  if (fs.existsSync(path.join(raiz, f))) fs.copyFileSync(path.join(raiz, f), path.join(dist, f));
});
if (dominio) fs.writeFileSync(path.join(dist, "CNAME"), dominio + "\n");
fs.writeFileSync(path.join(dist, ".nojekyll"), "");
const hoy = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + url + "sitemap.xml\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>' + url + "</loc><lastmod>" + hoy + "</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n");
console.log("Listo: dist/ con " + paquetes.length + " paquetes para " + url);
