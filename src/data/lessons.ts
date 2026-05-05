export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  code: string;
  language: "html" | "css" | "javascript";
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "html",
    title: "HTML Esaslary",
    description: "Web sahypalaryň gurluşyny öwreniň",
    icon: "🌐",
    lessons: [
      {
        id: "html-1",
        title: "HTML näme?",
        description: "HTML diline giriş we ilkinji sahypaňyz",
        language: "html",
        content: `# HTML näme?

HTML (HyperText Markup Language) — web sahypalary döretmek üçin ulanylýan belgileme dilidir. Brauzer HTML kodyny okaýar we ony görkezýär.

## Esasy düzüm

Her bir HTML resminamasy şu gurluşa eýe:

- \`<!DOCTYPE html>\` — resminamanyň HTML5 görnüşidigini aňladýar
- \`<html>\` — ähli mazmuny öz içine alýar
- \`<head>\` — metadatalar (at, stil, we ş.m.)
- \`<body>\` — sahypada görünýän mazmun

Aşakdaky kody synap görüň!`,
        code: `<!DOCTYPE html>
<html>
<head>
  <title>Meniň ilkinji sahypam</title>
</head>
<body>
  <h1>Salam, Dünýä!</h1>
  <p>Bu meniň ilkinji web sahypam.</p>
</body>
</html>`,
      },
      {
        id: "html-2",
        title: "Sözbaşylar we Abzaslar",
        description: "h1-h6 sözbaşylar we p abzaslary",
        language: "html",
        content: `# Sözbaşylar we Abzaslar

HTML-de 6 derejeli sözbaşy bar: \`<h1>\` (iň uly) — \`<h6>\` (iň kiçi).

Abzaslar üçin \`<p>\` tegi ulanylýar.

## Möhüm maglumat
- Sahypada diňe **bir** \`<h1>\` bolmaly
- Sözbaşylar tertipli ulanylmaly (h1 → h2 → h3)
- Abzaslar arasynda awtomatiki boşluk goýulýar`,
        code: `<!DOCTYPE html>
<html>
<body>
  <h1>Esasy sözbaşy (h1)</h1>
  <h2>Ikinji dereje (h2)</h2>
  <h3>Üçünji dereje (h3)</h3>
  
  <p>Bu birinji abzas. HTML-de abzaslar
  awtomatiki täze setirden başlanýar.</p>
  
  <p>Bu ikinji abzas. Abzaslaryň arasynda
  boşluk goýulýar.</p>
  
  <h2>Başga bölüm</h2>
  <p>Her bölümiň öz sözbaşysy bolmaly.</p>
</body>
</html>`,
      },
      {
        id: "html-3",
        title: "Sanawlar",
        description: "Tertipli we tertipsiz sanawlar",
        language: "html",
        content: `# Sanawlar

HTML-de iki görnüşli sanaw bar:

## Tertipsiz sanaw (ul)
Nokat bilen belgilenen sanaw — \`<ul>\` we \`<li>\` tegleri.

## Tertipli sanaw (ol)
San bilen belgilenen sanaw — \`<ol>\` we \`<li>\` tegleri.

Sanawlary birek-biregiň içinde hem ýerleşdirip bolýar!`,
        code: `<!DOCTYPE html>
<html>
<body>
  <h2>Söýgüli miwelerim:</h2>
  <ul>
    <li>Alma</li>
    <li>Armyt</li>
    <li>Üzüm</li>
  </ul>

  <h2>Ädimler:</h2>
  <ol>
    <li>HTML öwren</li>
    <li>CSS öwren</li>
    <li>JavaScript öwren</li>
  </ol>

  <h2>Içki sanaw:</h2>
  <ul>
    <li>Programmirleme dilleri
      <ul>
        <li>JavaScript</li>
        <li>Python</li>
      </ul>
    </li>
    <li>Belgileme dilleri
      <ul>
        <li>HTML</li>
        <li>XML</li>
      </ul>
    </li>
  </ul>
</body>
</html>`,
      },
      {
        id: "html-4",
        title: "Baglanyşyklar we Suratlar",
        description: "a we img tegleri bilen işlemek",
        language: "html",
        content: `# Baglanyşyklar we Suratlar

## Baglanyşyklar (a tegi)
\`<a href="URL">\` tegi bilen başga sahypalara baglanyşyk döredilýär.

- \`href\` — barmaly salgy
- \`target="_blank"\` — täze tabda açmak

## Suratlar (img tegi)
\`<img src="URL" alt="düşündiriş">\` — suratlar üçin.

- \`src\` — suratyň salgysy
- \`alt\` — surat görkezilmedik ýagdaýynda tekst
- \`width\` / \`height\` — ölçegler`,
        code: `<!DOCTYPE html>
<html>
<body>
  <h2>Baglanyşyklar</h2>
  <p>
    <a href="https://google.com" target="_blank">
      Google-a git
    </a>
  </p>
  
  <h2>Suratlar</h2>
  <img 
    src="https://picsum.photos/300/200" 
    alt="Tötänleýin surat"
    width="300"
  >
  
  <h2>Surat baglanyşyk hökmünde</h2>
  <a href="https://google.com" target="_blank">
    <img 
      src="https://picsum.photos/200/100" 
      alt="Basyň"
      width="200"
    >
  </a>
</body>
</html>`,
      },
      {
        id: "html-5",
        title: "Tablisalar",
        description: "Maglumatlary tablisa görnüşinde görkezmek",
        language: "html",
        content: `# Tablisalar

HTML tablisasy üçin esasy teglar:

- \`<table>\` — tablisany açýar
- \`<tr>\` — setir (table row)
- \`<th>\` — sözbaşy öýjügi (table header)
- \`<td>\` — maglumat öýjügi (table data)
- \`<thead>\` — sözbaşy bölümi
- \`<tbody>\` — maglumat bölümi`,
        code: `<!DOCTYPE html>
<html>
<body>
  <h2>Okuwçylaryň sanawy</h2>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>Ady</th>
        <th>Ýaşy</th>
        <th>Şäheri</th>
        <th>Bahasy</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Merdan</td>
        <td>20</td>
        <td>Aşgabat</td>
        <td>5</td>
      </tr>
      <tr>
        <td>Aýgül</td>
        <td>19</td>
        <td>Mary</td>
        <td>4</td>
      </tr>
      <tr>
        <td>Serdar</td>
        <td>21</td>
        <td>Türkmenbaşy</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
      },
      {
        id: "html-6",
        title: "Formalar",
        description: "Ulanyjydan maglumat almak",
        language: "html",
        content: `# Formalar

Formalar ulanyjydan maglumat almak üçin ulanylýar.

## Esasy elementler:
- \`<form>\` — formany açýar
- \`<input>\` — giriş meýdany (text, email, password, number...)
- \`<textarea>\` — köp setirli tekst
- \`<select>\` / \`<option>\` — saýlaw menýusy
- \`<button>\` — düwme
- \`<label>\` — belgi`,
        code: `<!DOCTYPE html>
<html>
<body>
  <h2>Hasaba alyş formasy</h2>
  <form>
    <p>
      <label for="name">Adyňyz:</label><br>
      <input type="text" id="name" placeholder="Adyňyzy ýazyň">
    </p>
    
    <p>
      <label for="email">Email:</label><br>
      <input type="email" id="email" placeholder="email@mysal.com">
    </p>
    
    <p>
      <label for="pass">Parol:</label><br>
      <input type="password" id="pass" placeholder="Parolyňyz">
    </p>
    
    <p>
      <label for="city">Şäheriňiz:</label><br>
      <select id="city">
        <option>Aşgabat</option>
        <option>Mary</option>
        <option>Türkmenbaşy</option>
        <option>Daşoguz</option>
        <option>Balkanabat</option>
      </select>
    </p>
    
    <p>
      <label for="bio">Özüňiz barada:</label><br>
      <textarea id="bio" rows="3" cols="30" 
        placeholder="Biraz ýazyň..."></textarea>
    </p>
    
    <p>
      <button type="submit">Hasaba al</button>
    </p>
  </form>
</body>
</html>`,
      },
    ],
  },
  {
    id: "css",
    title: "CSS Esaslary",
    description: "Web sahypalaryň dizaýnyny öwreniň",
    icon: "🎨",
    lessons: [
      {
        id: "css-1",
        title: "CSS näme?",
        description: "CSS-e giriş we birikdirmek usullary",
        language: "html",
        content: `# CSS näme?

CSS (Cascading Style Sheets) — HTML elementleriniň daşky görnüşini üýtgetmek üçin ulanylýar.

## CSS birikdirmek usullary:
1. **Içki stil** — \`style\` atributy bilen
2. **Style tegi** — \`<style>\` tegi bilen
3. **Daşky faýl** — \`<link>\` bilen .css faýla baglanyşyk

Aşakda \`<style>\` tegi bilen mysaly görüň.`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      padding: 20px;
    }
    
    h1 {
      color: #2563eb;
      text-align: center;
    }
    
    p {
      color: #374151;
      font-size: 18px;
      line-height: 1.6;
    }
    
    .box {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      max-width: 500px;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>CSS bilen stillendirildi!</h1>
    <p>Bu tekst CSS arkaly üýtgedildi. 
    Reňk, ölçeg we şrift üýtgedildi.</p>
  </div>
</body>
</html>`,
      },
      {
        id: "css-2",
        title: "Reňkler we Şriftler",
        description: "Tekst reňkleri, fon we şrift sazlamalary",
        language: "html",
        content: `# Reňkler we Şriftler

## Reňk görnüşleri
- **At boýunça**: \`red\`, \`blue\`, \`green\`
- **HEX**: \`#ff0000\`, \`#3b82f6\`
- **RGB**: \`rgb(255, 0, 0)\`
- **HSL**: \`hsl(210, 100%, 50%)\`

## Şrift häsiýetleri
- \`font-family\` — şrift maşgalasy
- \`font-size\` — ölçeg
- \`font-weight\` — galyňlyk
- \`line-height\` — setir aralygy
- \`text-align\` — tekst ýerleşdirme`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Georgia', serif;
      padding: 20px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      min-height: 100vh;
      color: white;
    }
    
    .card {
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 30px;
      max-width: 500px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 28px;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .red { color: #ef4444; }
    .green { color: #22c55e; }
    .blue { color: #60a5fa; }
    .yellow { color: #fbbf24; }
    
    .big { font-size: 24px; }
    .bold { font-weight: bold; }
    .italic { font-style: italic; }
    .center { text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🎨 Reňkler we Şriftler</h1>
    <p class="red big">Gyzyl reňkli uly tekst</p>
    <p class="green bold">Ýaşyl galyň tekst</p>
    <p class="blue italic">Gök ýapgyt tekst</p>
    <p class="yellow center">Sary merkezleşdirilen tekst</p>
  </div>
</body>
</html>`,
      },
      {
        id: "css-3",
        title: "Box Model",
        description: "Margin, padding, border düşünjeleri",
        language: "html",
        content: `# Box Model (Guty modeli)

Her bir HTML elementi bir guty ýalydyr. Onuň 4 bölegi bar:

1. **Content** — mazmun (tekst, surat)
2. **Padding** — mazmunyň içki boşlugy
3. **Border** — çarçuwasy
4. **Margin** — daşky boşlugy

## Möhüm häsiýetler:
- \`padding: 20px\` — ähli tarapdan
- \`margin: 10px 20px\` — ýokary/aşak, çep/sag
- \`border: 2px solid #333\` — galyňlygy, görnüşi, reňki
- \`border-radius\` — burçlary tegeleklemek`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      padding: 20px;
    }
    
    .demo-box {
      background-color: #3b82f6;
      color: white;
      padding: 20px;
      margin: 15px 0;
      border: 3px solid #1d4ed8;
      border-radius: 8px;
      text-align: center;
      font-weight: bold;
    }
    
    .no-padding {
      padding: 0;
      background-color: #ef4444;
      border-color: #dc2626;
    }
    
    .big-padding {
      padding: 40px;
      background-color: #22c55e;
      border-color: #16a34a;
    }
    
    .round {
      border-radius: 50px;
      background-color: #a855f7;
      border-color: #9333ea;
    }
    
    .dashed {
      border: 4px dashed #f59e0b;
      background-color: #fef3c7;
      color: #92400e;
    }
    
    .shadow {
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      background-color: white;
      color: #1f2937;
      border: none;
    }
  </style>
</head>
<body>
  <h2>📦 Box Model mysallary</h2>
  
  <div class="demo-box">Adaty guty (padding: 20px)</div>
  <div class="demo-box no-padding">Padding ýok</div>
  <div class="demo-box big-padding">Uly padding (40px)</div>
  <div class="demo-box round">Tegelek burçlar</div>
  <div class="demo-box dashed">Kesik çyzyk çarçuwa</div>
  <div class="demo-box shadow">Kölege bilen</div>
</body>
</html>`,
      },
      {
        id: "css-4",
        title: "Flexbox",
        description: "Elementleri çeýe ýerleşdirmek",
        language: "html",
        content: `# Flexbox

Flexbox — elementleri setir ýa-da sütün boýunça ýerleşdirmek üçin iň amatly usul.

## Esasy häsiýetler:
- \`display: flex\` — flex konteýneri döretmek
- \`justify-content\` — esasy ok boýunça ýerleşdirmek
- \`align-items\` — kese ok boýunça ýerleşdirmek
- \`flex-direction\` — ugur (row / column)
- \`gap\` — elementleriň arasyndaky boşluk
- \`flex-wrap\` — setirden aşmak`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #1e293b;
      color: white;
      padding: 20px;
    }
    
    h3 { color: #94a3b8; margin: 15px 0 8px; }
    
    .flex-demo {
      display: flex;
      gap: 10px;
      padding: 15px;
      background: #334155;
      border-radius: 10px;
      margin-bottom: 15px;
    }
    
    .box {
      padding: 15px 20px;
      background: #3b82f6;
      border-radius: 8px;
      font-weight: bold;
      text-align: center;
    }
    
    .center {
      justify-content: center;
      align-items: center;
    }
    
    .between {
      justify-content: space-between;
    }
    
    .around {
      justify-content: space-around;
    }
    
    .column {
      flex-direction: column;
    }
    
    .wrap {
      flex-wrap: wrap;
    }
    
    .wrap .box {
      background: #a855f7;
      flex: 1;
      min-width: 80px;
    }
  </style>
</head>
<body>
  <h2>📐 Flexbox mysallary</h2>
  
  <h3>justify-content: center</h3>
  <div class="flex-demo center">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
  </div>
  
  <h3>justify-content: space-between</h3>
  <div class="flex-demo between">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
  </div>
  
  <h3>flex-direction: column</h3>
  <div class="flex-demo column">
    <div class="box">1-nji</div>
    <div class="box">2-nji</div>
    <div class="box">3-nji</div>
  </div>
  
  <h3>flex-wrap</h3>
  <div class="flex-demo wrap">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
    <div class="box">D</div>
    <div class="box">E</div>
  </div>
</body>
</html>`,
      },
      {
        id: "css-5",
        title: "Animasiýalar",
        description: "Transition we animation häsiýetleri",
        language: "html",
        content: `# CSS Animasiýalar

## Transition
Ýuwaş üýtgeşme — hover, focus ýaly ýagdaýlarda ulanylýar.

\`transition: property duration timing-function\`

## Animation + Keyframes
Yzygiderli animasiýa — \`@keyframes\` bilen kesgitlenýär.

Esasy häsiýetler:
- \`animation-name\` — animasiýanyň ady
- \`animation-duration\` — dowamlylygy
- \`animation-iteration-count\` — gaýtalanma sany
- \`animation-timing-function\` — tizlik funksiýasy`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .hover-box {
      display: inline-block;
      padding: 20px 40px;
      background: #3b82f6;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 10px;
    }
    
    .hover-box:hover {
      background: #8b5cf6;
      transform: scale(1.1) rotate(3deg);
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.5);
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-30px); }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.9); }
    }
    
    .bounce {
      display: inline-block;
      font-size: 40px;
      animation: bounce 1s ease infinite;
      margin: 20px;
    }
    
    .spin {
      display: inline-block;
      font-size: 40px;
      animation: spin 2s linear infinite;
      margin: 20px;
    }
    
    .pulse {
      display: inline-block;
      font-size: 40px;
      animation: pulse 1.5s ease infinite;
      margin: 20px;
    }
    
    h3 { color: #94a3b8; }
  </style>
</head>
<body>
  <h2>✨ CSS Animasiýalar</h2>
  
  <h3>Hover effektleri (üstüne geliň)</h3>
  <div class="hover-box">Maňa bas!</div>
  <div class="hover-box">Üýtgeýän!</div>
  
  <h3>Keyframe animasiýalar</h3>
  <div class="bounce">⚽</div>
  <div class="spin">⚙️</div>
  <div class="pulse">💖</div>
</body>
</html>`,
      },
      {
        id: "css-6",
        title: "Grid Layout",
        description: "CSS Grid bilen sahypa düzmek",
        language: "html",
        content: `# CSS Grid

Grid — iki ölçegli (setir + sütün) ýerleşdirme usulydyr.

## Esasy häsiýetler:
- \`display: grid\` — grid konteýneri
- \`grid-template-columns\` — sütünler kesgitlemek
- \`grid-template-rows\` — setirler kesgitlemek
- \`gap\` — aradaky boşluk
- \`grid-column: span 2\` — 2 sütün eýelemek

\`fr\` birligi — boş ýeriň paýyny aňladýar.`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8fafc;
      padding: 20px;
    }
    
    h2 { color: #1e293b; text-align: center; }
    
    .grid-demo {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      max-width: 600px;
      margin: 20px auto;
    }
    
    .grid-item {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
    }
    
    .wide {
      grid-column: span 2;
      background: linear-gradient(135deg, #ec4899, #f43f5e);
    }
    
    .tall {
      grid-row: span 2;
      background: linear-gradient(135deg, #14b8a6, #06b6d4);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .full {
      grid-column: span 3;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
    }
  </style>
</head>
<body>
  <h2>📊 CSS Grid</h2>
  
  <div class="grid-demo">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item wide">4 (2 sütün)</div>
    <div class="grid-item">5</div>
    <div class="grid-item tall">6 (2 setir)</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item full">9 (doly setir)</div>
  </div>
</body>
</html>`,
      },
      {
        id: "css-7",
        title: "Responsive Dizaýn",
        description: "Dürli ekran ölçeglerine uýgunlaşma",
        language: "html",
        content: `# Responsive (Uýgunlaşýan) Dizaýn

Responsive dizaýn — sahypaňyzyň telefon, planşet we kompýuterde gowy görünmegini üpjün edýär.

## Esasy usullar:
- \`@media\` — media queries bilen ekran ölçegine görä stil üýtgetmek
- \`max-width\` / \`min-width\` — şertli ölçeg
- \`vw\`, \`vh\`, \`%\` — otnositel birlikler
- \`flex-wrap\` we \`grid\` — çeýe ýerleşdirme

## Viewport meta tegi:
\`<meta name="viewport" content="width=device-width, initial-scale=1">\`

## Ýygy ulanylýan breakpoints:
- \`max-width: 480px\` — telefon
- \`max-width: 768px\` — planşet
- \`max-width: 1024px\` — kiçi ekran`,
        code: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; padding: 20px; background: #f0f4f8; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { text-align: center; color: #1e293b; margin-bottom: 20px; font-size: 28px; }
    
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .card {
      background: white; border-radius: 12px; padding: 24px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;
    }
    .card .icon { font-size: 40px; margin-bottom: 10px; }
    .card h3 { color: #334155; margin-bottom: 8px; }
    .card p { color: #64748b; font-size: 14px; }
    
    .info {
      margin-top: 20px; padding: 15px; background: #dbeafe;
      border-radius: 8px; text-align: center; color: #1e40af; font-size: 14px;
    }
    
    @media (max-width: 768px) {
      .cards { grid-template-columns: repeat(2, 1fr); }
      h1 { font-size: 22px; }
      .info::after { content: " (Planşet görünüşi)"; }
    }
    @media (max-width: 480px) {
      .cards { grid-template-columns: 1fr; }
      h1 { font-size: 18px; }
      .card { padding: 16px; }
      .info::after { content: " (Telefon görünüşi)"; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📱 Responsive Dizaýn</h1>
    <p style="text-align:center;color:#64748b;margin-bottom:20px;">
      Brauzer penjiresiñ ölçegini üýtgediñ!
    </p>
    <div class="cards">
      <div class="card"><div class="icon">🌐</div><h3>HTML</h3><p>Sahypanyñ gurluşy</p></div>
      <div class="card"><div class="icon">🎨</div><h3>CSS</h3><p>Dizaýn we bezeg</p></div>
      <div class="card"><div class="icon">⚡</div><h3>JS</h3><p>Interaktiw funksiýalar</p></div>
    </div>
    <div class="info">Ekran ölçegi: <span id="size"></span></div>
  </div>
  <script>
    function updateSize() {
      document.getElementById('size').textContent = window.innerWidth + 'x' + window.innerHeight;
    }
    updateSize();
    window.addEventListener('resize', updateSize);
  </script>
</body>
</html>`,
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Esaslary",
    description: "Programmirlemäniň esaslaryny öwreniň",
    icon: "🟨",
    lessons: [
      {
        id: "js-1",
        title: "Değişgenler",
        description: "let, const, var we maglumat görnüşleri",
        language: "javascript",
        content: `# Değişgenler

JavaScript-de maglumat saklamak üçin değişgenler ulanylýar.

## Yglan etmek usullary:
- \`const\` — üýtgedilmeýän (maslahat berilýär)
- \`let\` — üýtgedilip bilýän
- \`var\` — köne usul (ulanmaň)

## Maglumat görnüşleri:
- **String** — tekst: \`"salam"\`
- **Number** — san: \`42\`
- **Boolean** — logiki: \`true / false\`
- **Array** — sanaw: \`[1, 2, 3]\`
- **Object** — obýekt: \`{ady: "Ali"}\``,
        code: `// Değişgenler
const ady = "Merdan";
let yasy = 20;
const talypmy = true;

console.log("Ady:", ady);
console.log("Ýaşy:", yasy);
console.log("Talyp:", talypmy);

// San amallary
const a = 10;
const b = 3;
console.log("Goşmak:", a + b);
console.log("Aýyrmak:", a - b);
console.log("Köpeltmek:", a * b);
console.log("Bölmek:", a / b);

// Sanaw (Array)
const miweler = ["Alma", "Armyt", "Üzüm"];
console.log("Miweler:", miweler);
console.log("Birinji miwe:", miweler[0]);

// Obýekt
const adam = {
  ady: "Aýgül",
  yasy: 19,
  saheri: "Aşgabat"
};
console.log("Adam:", adam);`,
      },
      {
        id: "js-2",
        title: "Şertler (if/else)",
        description: "Şertli operatorlar bilen karar bermek",
        language: "javascript",
        content: `# Şertler

Programmada kararlary \`if/else\` bilen berýäris.

## Deňeşdirme operatorlary:
- \`===\` — deň
- \`!==\` — deň däl
- \`>\`, \`<\`, \`>=\`, \`<=\`

## Logiki operatorlar:
- \`&&\` — we (ikisi hem dogry)
- \`||\` — ýa-da (biri dogry)
- \`!\` — ýok (tersine)`,
        code: `// if / else
const yasy = 18;

if (yasy >= 18) {
  console.log("Ulular üçin rugsat berilýär");
} else {
  console.log("Ýaşyňyz ýeterlik däl");
}

// else if
const baha = 85;

if (baha >= 90) {
  console.log("Baha: A (Ajaýyp!)");
} else if (baha >= 80) {
  console.log("Baha: B (Gowy)");
} else if (baha >= 70) {
  console.log("Baha: C (Orta)");
} else {
  console.log("Baha: D (Ýeterlik däl)");
}

// Logiki operatorlar
const ady = "Admin";
const paroly = "1234";

if (ady === "Admin" && paroly === "1234") {
  console.log("Hoş geldiňiz, Admin!");
} else {
  console.log("Ýalňyş maglumatlar");
}

// Ternary operator
const howa = "ýagyşly";
const maslahat = howa === "ýagyşly" ? "Saýawan al" : "Gezelenç et";
console.log(maslahat);`,
      },
      {
        id: "js-3",
        title: "Sikllar (for, while)",
        description: "Gaýtalanýan amallary ýerine ýetirmek",
        language: "javascript",
        content: `# Sikllar

Sikllar kody birnäçe gezek gaýtalamak üçin ulanylýar.

## Görnüşleri:
- \`for\` — belli san gezek gaýtalamak
- \`while\` — şert dogry bolýança
- \`for...of\` — sanaw elementlerini aýlamak
- \`forEach\` — massiwda her element üçin`,
        code: `// for sikli
console.log("=== for sikli ===");
for (let i = 1; i <= 5; i++) {
  console.log("San:", i);
}

// while sikli
console.log("\\n=== while sikli ===");
let san = 10;
while (san > 0) {
  console.log("Geri sanaw:", san);
  san -= 3;
}

// for...of — massiw üçin
console.log("\\n=== for...of ===");
const reňkler = ["Gyzyl", "Ýaşyl", "Gök"];
for (const reňk of reňkler) {
  console.log("Reňk:", reňk);
}

// forEach
console.log("\\n=== forEach ===");
const sanlar = [2, 4, 6, 8, 10];
sanlar.forEach((san, index) => {
  console.log(index + ":", san, "x2 =", san * 2);
});

// Içki sikl — köpeltme tablisasy
console.log("\\n=== 3-iň köpeltme tablisasy ===");
for (let i = 1; i <= 5; i++) {
  console.log("3 x " + i + " = " + (3 * i));
}`,
      },
      {
        id: "js-4",
        title: "Funksiýalar",
        description: "Gaýtadan ulanylýan kod bloklary",
        language: "javascript",
        content: `# Funksiýalar

Funksiýa — belli bir işi ýerine ýetirýän kod blogy.

## Döretmek usullary:
- \`function ady() {}\` — adaty funksiýa
- \`const ady = () => {}\` — arrow funksiýa
- Parametrler we gaýtarylýan baha

## Artykmaçlyklary:
- Kody gaýtadan ulanmak
- Programmany böleklere bölmek
- Okamak we düzetmek aňsat`,
        code: `// Adaty funksiýa
function salam(ady) {
  return "Salam, " + ady + "!";
}
console.log(salam("Merdan"));
console.log(salam("Aýgül"));

// Arrow funksiýa
const kwadrat = (san) => san * san;
console.log("5² =", kwadrat(5));
console.log("12² =", kwadrat(12));

// Birnäçe parametr
const gosmak = (a, b) => a + b;
console.log("3 + 7 =", gosmak(3, 7));

// Default parametr
function salamla(ady = "Myhman") {
  console.log("Hoş geldiňiz, " + ady + "!");
}
salamla("Serdar");
salamla();

// Funksiýa massiwi gaýtarýar
function juftSanlar(n) {
  const netije = [];
  for (let i = 2; i <= n; i += 2) {
    netije.push(i);
  }
  return netije;
}
console.log("10-a çenli jüft sanlar:", juftSanlar(10));

// Rekursiw funksiýa
function faktorial(n) {
  if (n <= 1) return 1;
  return n * faktorial(n - 1);
}
console.log("5! =", faktorial(5));`,
      },
      {
        id: "js-5",
        title: "DOM Manipulýasiýa",
        description: "HTML elementlerini JavaScript bilen dolandyrmak",
        language: "html",
        content: `# DOM Manipulýasiýa

DOM (Document Object Model) — brauzer HTML-ni obýekt görnüşinde saklaýar. JavaScript bilen bu obýektleri üýtgedip bolýar.

## Elementi tapmak:
- \`document.getElementById("id")\` — ID boýunça
- \`document.querySelector(".class")\` — CSS selektor boýunça
- \`document.querySelectorAll("p")\` — hemmesini tapmak

## Elementi üýtgetmek:
- \`element.textContent\` — teksti üýtgetmek
- \`element.innerHTML\` — HTML goşmak
- \`element.style.color\` — stili üýtgetmek
- \`element.classList.add()\` — klass goşmak
- \`element.setAttribute()\` — atribut goşmak

## Täze element döretmek:
- \`document.createElement("div")\`
- \`parent.appendChild(child)\`
- \`element.remove()\` — elementi ýok etmek`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
    .box { background: #3b82f6; color: white; padding: 20px; border-radius: 10px;
           margin: 10px 0; text-align: center; font-size: 18px; transition: all 0.3s; }
    .highlight { background: #f59e0b !important; transform: scale(1.05); }
    button { padding: 10px 20px; margin: 5px; border: none; border-radius: 8px;
             background: #8b5cf6; color: white; cursor: pointer; font-size: 14px; }
    button:hover { opacity: 0.9; }
    #list { margin-top: 15px; }
    .list-item { background: white; padding: 10px 15px; margin: 5px 0;
                 border-radius: 8px; border-left: 4px solid #3b82f6; }
  </style>
</head>
<body>
  <h2>🔧 DOM Manipulýasiýa</h2>
  
  <div id="myBox" class="box">Maňa bas!</div>
  
  <button onclick="changeText()">Teksti üýtget</button>
  <button onclick="changeColor()">Reňki üýtget</button>
  <button onclick="toggleHighlight()">Highlight</button>
  <button onclick="addItem()">Element goş</button>
  
  <div id="list"></div>
  
  <script>
    const box = document.getElementById('myBox');
    let count = 0;
    
    function changeText() {
      count++;
      box.textContent = 'Basyldy: ' + count + ' gezek!';
    }
    
    function changeColor() {
      const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6'];
      const random = colors[Math.floor(Math.random() * colors.length)];
      box.style.background = random;
    }
    
    function toggleHighlight() {
      box.classList.toggle('highlight');
    }
    
    function addItem() {
      const list = document.getElementById('list');
      const item = document.createElement('div');
      item.className = 'list-item';
      item.textContent = 'Täze element #' + (list.children.length + 1);
      item.onclick = function() { this.remove(); };
      list.appendChild(item);
    }
  </script>
</body>
</html>`,
      },
      {
        id: "js-6",
        title: "Wakalar (Events)",
        description: "Ulanyjy hereketlerine jogap bermek",
        language: "html",
        content: `# Wakalar (Events)

Wakalar — ulanyjynyň hereketlerine jogap bermek üçin ulanylýar.

## Esasy waka görnüşleri:
- \`click\` — basylanda
- \`mouseover\` / \`mouseout\` — syçan gelende/gidende
- \`keydown\` / \`keyup\` — klawiatura basma
- \`input\` — giriş meýdany üýtgände
- \`submit\` — forma iberilende
- \`load\` — sahypa ýüklenende

## Waka birikdirmek usullary:
- \`element.addEventListener("click", fn)\` — maslahat berilýär
- \`onclick="fn()"\` — HTML atributy

## Event obýekti:
- \`event.target\` — haýsy elementde boldy
- \`event.preventDefault()\` — adaty hereketi togtatmak
- \`event.key\` — klawiatura düwmesi`,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .area { width: 100%; height: 150px; background: #1e293b; border-radius: 12px;
            display: flex; align-items: center; justify-content: center; font-size: 18px;
            border: 2px dashed #334155; margin: 10px 0; transition: all 0.3s; cursor: crosshair; }
    input { width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #334155;
            background: #1e293b; color: white; font-size: 16px; margin: 10px 0; outline: none; }
    input:focus { border-color: #3b82f6; }
    .log { background: #1e293b; padding: 15px; border-radius: 8px; font-family: monospace;
           font-size: 13px; max-height: 200px; overflow-y: auto; margin-top: 10px; }
    .log div { padding: 3px 0; border-bottom: 1px solid #334155; }
    h3 { color: #94a3b8; margin-top: 15px; }
  </style>
</head>
<body>
  <h2>🎯 Wakalar (Events)</h2>
  
  <h3>Syçan wakalary</h3>
  <div id="mouseArea" class="area">Syçany şu ýerde herekete getiriň</div>
  
  <h3>Klawiatura wakasy</h3>
  <input id="keyInput" placeholder="Bu ýere bir zat ýazyň..." />
  
  <h3>Waka ýazgysy:</h3>
  <div id="log" class="log"></div>
  
  <script>
    const area = document.getElementById('mouseArea');
    const keyInput = document.getElementById('keyInput');
    const log = document.getElementById('log');
    
    function addLog(msg) {
      const div = document.createElement('div');
      div.textContent = '› ' + msg;
      log.insertBefore(div, log.firstChild);
      if (log.children.length > 20) log.lastChild.remove();
    }
    
    // Syçan wakalary
    area.addEventListener('mousemove', (e) => {
      area.textContent = 'X: ' + e.offsetX + '  Y: ' + e.offsetY;
    });
    
    area.addEventListener('click', (e) => {
      addLog('Click! x=' + e.offsetX + ', y=' + e.offsetY);
      area.style.background = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    });
    
    area.addEventListener('mouseenter', () => {
      addLog('Syçan girdi');
      area.style.borderColor = '#3b82f6';
    });
    
    area.addEventListener('mouseleave', () => {
      addLog('Syçan çykdy');
      area.style.borderColor = '#334155';
      area.style.background = '#1e293b';
    });
    
    // Klawiatura
    keyInput.addEventListener('input', (e) => {
      addLog('Input: "' + e.target.value + '"');
    });
    
    keyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addLog('ENTER basyldy! Tekst: "' + e.target.value + '"');
        e.target.value = '';
      }
    });
  </script>
</body>
</html>`,
      },
      {
        id: "js-7",
        title: "Fetch API",
        description: "Daşarky maglumatlar bilen işlemek",
        language: "html",
        content: `# Fetch API

Fetch API — internetden maglumat almak we ibermek üçin ulanylýar.

## Esasy düşünjeler:
- \`fetch(url)\` — HTTP haýyş ibermek
- \`.then()\` — jogaba garaşmak
- \`.json()\` — JSON formatyna öwürmek
- \`async/await\` — okalýan usul

## HTTP Metodlary:
- \`GET\` — maglumat almak
- \`POST\` — maglumat ibermek
- \`PUT\` — maglumat üýtgetmek
- \`DELETE\` — maglumat pozmak

## JSON:
JavaScript Object Notation — maglumat alyş-çalyşmak üçin format.
\`{"ady": "Ali", "yasy": 20}\``,
        code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
    .card { background: white; border-radius: 12px; padding: 20px; margin: 10px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
    .user { display: flex; align-items: center; gap: 15px; padding: 12px;
            border-bottom: 1px solid #e2e8f0; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; background: #3b82f6;
              display: flex; align-items: center; justify-content: center;
              color: white; font-weight: bold; font-size: 16px; }
    button { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer;
             font-size: 14px; margin: 5px; color: white; }
    .btn-users { background: #3b82f6; }
    .btn-posts { background: #8b5cf6; }
    .btn-todos { background: #22c55e; }
    #status { color: #64748b; font-size: 14px; margin: 10px 0; }
    h3 { color: #334155; }
  </style>
</head>
<body>
  <h2>🌐 Fetch API</h2>
  <p id="status">Düwmä basyñ...</p>
  
  <button class="btn-users" onclick="loadUsers()">👥 Ulanyjylar</button>
  <button class="btn-posts" onclick="loadPosts()">📝 Postlar</button>
  <button class="btn-todos" onclick="loadTodos()">✅ Edimler</button>
  
  <div id="result" class="card">Netije şu ýerde görüner</div>
  
  <script>
    const result = document.getElementById('result');
    const status = document.getElementById('status');
    
    async function loadUsers() {
      status.textContent = 'Ýüklenýär...';
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
        const users = await res.json();
        
        result.innerHTML = '<h3>Ulanyjylar:</h3>' +
          users.map(u => 
            '<div class="user">' +
              '<div class="avatar">' + u.name[0] + '</div>' +
              '<div><strong>' + u.name + '</strong><br>' +
              '<small style="color:#64748b">' + u.email + ' • ' + u.company.name + '</small></div>' +
            '</div>'
          ).join('');
        status.textContent = users.length + ' ulanyjy ýüklendi';
      } catch (err) {
        result.innerHTML = '<p style="color:red">Ýalñyşlyk: ' + err.message + '</p>';
      }
    }
    
    async function loadPosts() {
      status.textContent = 'Ýüklenýär...';
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const posts = await res.json();
      
      result.innerHTML = '<h3>Postlar:</h3>' +
        posts.map(p => 
          '<div style="padding:10px 0;border-bottom:1px solid #e2e8f0">' +
            '<strong>' + p.title + '</strong>' +
            '<p style="color:#64748b;font-size:13px">' + p.body.slice(0, 80) + '...</p>' +
          '</div>'
        ).join('');
      status.textContent = posts.length + ' post ýüklendi';
    }
    
    async function loadTodos() {
      status.textContent = 'Ýüklenýär...';
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8');
      const todos = await res.json();
      
      result.innerHTML = '<h3>Edimler sanawy:</h3>' +
        todos.map(t => 
          '<div style="padding:8px 0;display:flex;gap:8px;align-items:center">' +
            (t.completed ? '✅' : '⬜') +
            '<span style="' + (t.completed ? 'text-decoration:line-through;color:#94a3b8' : '') + '">' +
            t.title + '</span></div>'
        ).join('');
      status.textContent = todos.length + ' edim ýüklendi';
    }
  </script>
</body>
</html>`,
      },
    ],
  },
];
