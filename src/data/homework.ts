export interface HomeworkTask {
  id: string;
  lessonId: string;
  moduleId: string;
  title: string;
  description: string;
  instruction: string;
  starterCode: string;
  expectedOutput: string[];
  language: "html" | "css" | "javascript";
  hints: string[];
}

export const homeworkTasks: HomeworkTask[] = [
  // HTML module
  {
    id: "hw-html-1",
    lessonId: "html-1",
    moduleId: "html",
    title: "Ilkinji sahypaňy döret",
    description: "Öz sahypaňyzy döretmegiňizi barlaýarys",
    instruction: "Aşakdaky kody üýtgediň: h1 teginde öz adyňyzy, p teginde öz şäheriňizi ýazyň. Soňra kody ýerine ýetiriň.",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Meniň sahypam</title>
</head>
<body>
  <h1>Adyňyzy ýazyň</h1>
  <p>Şäheriňizi ýazyň</p>
</body>
</html>`,
    expectedOutput: ["<h1>", "<p>"],
    language: "html",
    hints: ["h1 teginiň içine adyňyzy ýazyň", "p teginiň içine şäheriňizi ýazyň"],
  },
  {
    id: "hw-html-2",
    lessonId: "html-2",
    moduleId: "html",
    title: "Sözbaşylar bilen işle",
    description: "h1-h3 sözbaşylaryny dogry ulanyň",
    instruction: "3 dürli derejeli sözbaşy (h1, h2, h3) we her biriniň aşagynda abzas (p) dörediň.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <!-- Şu ýere h1, h2, h3 we p teglerini goşuň -->
  
</body>
</html>`,
    expectedOutput: ["<h1>", "<h2>", "<h3>", "<p>"],
    language: "html",
    hints: ["Her sözbaşydan soň p tegi goşuň", "h1 iň uly, h3 iň kiçi"],
  },
  {
    id: "hw-html-3",
    lessonId: "html-3",
    moduleId: "html",
    title: "Sanaw döret",
    description: "Tertipli we tertipsiz sanaw dörediň",
    instruction: "Bir tertipsiz sanaw (ul) we bir tertipli sanaw (ol) dörediň. Her birinde azyndan 3 element bolmaly.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h2>Söýgüli zatlarym:</h2>
  <!-- Tertipsiz sanaw (ul) goşuň -->
  
  <h2>Günüň tertibi:</h2>
  <!-- Tertipli sanaw (ol) goşuň -->
  
</body>
</html>`,
    expectedOutput: ["<ul>", "<ol>", "<li>"],
    language: "html",
    hints: ["ul we ol tegleriniň içine li tegleri goşuň"],
  },
  {
    id: "hw-html-4",
    lessonId: "html-4",
    moduleId: "html",
    title: "Baglanyşyk we surat goş",
    description: "a we img teglerini ulanyň",
    instruction: "Bir baglanyşyk (a tegi) we bir surat (img tegi) goşuň.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h2>Meniň sahypam</h2>
  <!-- Baglanyşyk goşuň -->
  
  <!-- Surat goşuň -->
  
</body>
</html>`,
    expectedOutput: ["<a ", "<img "],
    language: "html",
    hints: ["a tegine href atributy, img tegine src we alt atributlary goşuň"],
  },
  {
    id: "hw-html-5",
    lessonId: "html-5",
    moduleId: "html",
    title: "Tablisa döret",
    description: "Maglumatly tablisa dörediň",
    instruction: "3 sütünli we 3 setirli tablisa dörediň. Sözbaşy setirini (th) goşuň.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h2>Meniň tablisam</h2>
  <!-- table, tr, th, td teglerini ulanyp tablisa dörediň -->
  
</body>
</html>`,
    expectedOutput: ["<table", "<tr>", "<th>", "<td>"],
    language: "html",
    hints: ["thead we tbody bölümlerini ulanyň"],
  },
  {
    id: "hw-html-6",
    lessonId: "html-6",
    moduleId: "html",
    title: "Forma döret",
    description: "Hasaba alyş formasy dörediň",
    instruction: "Ady, emaili we paroly soraýan forma dörediň. Her meýdanda label bolmaly.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h2>Hasaba alyş</h2>
  <!-- form, label, input teglerini ulanyp forma dörediň -->
  
</body>
</html>`,
    expectedOutput: ["<form", "<input", "<label"],
    language: "html",
    hints: ["input-yň type atributyny üýtgediň: text, email, password"],
  },

  // CSS module
  {
    id: "hw-css-1",
    lessonId: "css-1",
    moduleId: "css",
    title: "CSS bilen stillendiriň",
    description: "Style tegini ulanyp dizaýn ediň",
    instruction: "Sahypanyň fonuny üýtgediň, h1-e reňk beriň we p-niň şrift ölçegini ulaldyň.",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Şu ýere CSS ýazyň */
    body {
      
    }
    h1 {
      
    }
    p {
      
    }
  </style>
</head>
<body>
  <h1>Stillendirildi!</h1>
  <p>CSS bilen owadan sahypa.</p>
</body>
</html>`,
    expectedOutput: ["background", "color", "font-size"],
    language: "html",
    hints: ["background-color, color, font-size häsiýetlerini ulanyň"],
  },
  {
    id: "hw-css-2",
    lessonId: "css-2",
    moduleId: "css",
    title: "Reňkler we şriftler",
    description: "Dürli reňk görnüşlerini ulanyň",
    instruction: "3 dürli elementde 3 dürli reňk görnüşi (at boýunça, HEX, RGB) ulanyň.",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .first { /* At boýunça reňk */ }
    .second { /* HEX reňk */ }
    .third { /* RGB reňk */ }
  </style>
</head>
<body>
  <p class="first">Birinji tekst</p>
  <p class="second">Ikinji tekst</p>
  <p class="third">Üçünji tekst</p>
</body>
</html>`,
    expectedOutput: ["color"],
    language: "html",
    hints: ["Mysal: red, #3b82f6, rgb(255, 100, 0)"],
  },
  {
    id: "hw-css-3",
    lessonId: "css-3",
    moduleId: "css",
    title: "Box Model ulanyň",
    description: "Padding, margin, border goşuň",
    instruction: "Bir guty dörediň: padding 20px, margin 15px, border 2px solid, border-radius 10px.",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      /* Padding, margin, border, border-radius goşuň */
      
      background-color: #3b82f6;
      color: white;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="box">Meniň gutym</div>
</body>
</html>`,
    expectedOutput: ["padding", "margin", "border"],
    language: "html",
    hints: ["padding: 20px; margin: 15px; border: 2px solid; border-radius: 10px;"],
  },
  {
    id: "hw-css-4",
    lessonId: "css-4",
    moduleId: "css",
    title: "Flexbox bilen ýerleşdir",
    description: "Elementleri flex bilen ýerleşdiriň",
    instruction: "3 sany guty döredip, flexbox bilen merkezleşdiriň we aralarynda boşluk goýuň.",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      /* display: flex we beýleki häsiýetleri goşuň */
      
    }
    .item {
      padding: 20px 30px;
      background: #8b5cf6;
      color: white;
      border-radius: 8px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
  </div>
</body>
</html>`,
    expectedOutput: ["display: flex", "justify-content", "gap"],
    language: "html",
    hints: ["display: flex; justify-content: center; gap: 10px;"],
  },
  {
    id: "hw-css-5",
    lessonId: "css-5",
    moduleId: "css",
    title: "Animasiýa döret",
    description: "Transition ýa-da keyframe animasiýa goşuň",
    instruction: "Hover effekti bilen reňki we ölçegi üýtgeýän düwme dörediň (transition ulanyň).",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .btn {
      padding: 15px 30px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      /* transition goşuň */
      
    }
    .btn:hover {
      /* Hover effektlerini goşuň */
      
    }
  </style>
</head>
<body>
  <button class="btn">Üstüme gel!</button>
</body>
</html>`,
    expectedOutput: ["transition", ":hover"],
    language: "html",
    hints: ["transition: all 0.3s ease; :hover-da transform: scale(1.1) ulanyň"],
  },
  {
    id: "hw-css-6",
    lessonId: "css-6",
    moduleId: "css",
    title: "Grid layout döret",
    description: "CSS Grid bilen sahypa düzüň",
    instruction: "3 sütünli grid layout dörediň. Bir elementi 2 sütün eýeledip görüň.",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    .grid {
      /* display: grid we grid-template-columns goşuň */
      
      max-width: 500px;
    }
    .cell {
      padding: 20px;
      text-align: center;
      color: white;
      font-weight: bold;
      border-radius: 8px;
    }
    .wide {
      /* grid-column: span 2 goşuň */
      
    }
  </style>
</head>
<body>
  <div class="grid">
    <div class="cell" style="background:#3b82f6">1</div>
    <div class="cell" style="background:#8b5cf6">2</div>
    <div class="cell" style="background:#ec4899">3</div>
    <div class="cell wide" style="background:#14b8a6">4 (giň)</div>
    <div class="cell" style="background:#f59e0b">5</div>
  </div>
</body>
</html>`,
    expectedOutput: ["display: grid", "grid-template-columns"],
    language: "html",
    hints: ["display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;"],
  },

  // JavaScript module
  {
    id: "hw-js-1",
    lessonId: "js-1",
    moduleId: "javascript",
    title: "Değişgenler bilen işle",
    description: "Dürli görnüşli değişgenler dörediň",
    instruction: "Adyňyzy, ýaşyňyzy we talypdygyňyzy (boolean) değişgenlerde saklap, console.log bilen çykaryň.",
    starterCode: `// const ulanyp 3 değişgen dörediň:
// 1. ady - öz adyňyz (string)
// 2. yasy - ýaşyňyz (number)
// 3. talypmy - talyp bolsaňyz true (boolean)

// Soňra her birini console.log bilen çykaryň
`,
    expectedOutput: [],
    language: "javascript",
    hints: ["const ady = 'Adyňyz'; console.log(ady);"],
  },
  {
    id: "hw-js-2",
    lessonId: "js-2",
    moduleId: "javascript",
    title: "Şertli logika ýaz",
    description: "if/else bilen baha beriş ulgamyny dörediň",
    instruction: "Bir san değişgeni dörediň (0-100). if/else bilen: 90+ = 'A', 80+ = 'B', 70+ = 'C', başga = 'D'. Netijäni console.log bilen çykaryň.",
    starterCode: `// baha değişgenini dörediň (0-100 arasy san)
const baha = 85;

// if/else bilen baha harpyny kesgitläň we console.log bilen çykaryň
`,
    expectedOutput: [],
    language: "javascript",
    hints: ["if (baha >= 90) ... else if (baha >= 80) ..."],
  },
  {
    id: "hw-js-3",
    lessonId: "js-3",
    moduleId: "javascript",
    title: "Sikl ýaz",
    description: "for sikli bilen köpeltme tablisasy",
    instruction: "Ulanyjynyň saýlan sanynyň köpeltme tablisasyny (1-den 10-a çenli) for sikli bilen çykaryň.",
    starterCode: `// san değişgenini dörediň
const san = 7;

// for sikli bilen köpeltme tablisasyny çykaryň
// Netije: "7 x 1 = 7", "7 x 2 = 14", ...
`,
    expectedOutput: [],
    language: "javascript",
    hints: ["for (let i = 1; i <= 10; i++) { console.log(san + ' x ' + i + ' = ' + san * i); }"],
  },
  {
    id: "hw-js-4",
    lessonId: "js-4",
    moduleId: "javascript",
    title: "Funksiýa döret",
    description: "Gaýtadan ulanylýan funksiýalar ýazyň",
    instruction: "Iki san alyp, uly bolany gaýtarýan funksiýa dörediň. 3 dürli jübüt san bilen synap görüň.",
    starterCode: `// ulysy(a, b) funksiýasyny dörediň
// Iki sandan uly bolany gaýtarmaly


// 3 gezek synap görüň
// console.log(ulysy(5, 3));
// console.log(ulysy(10, 20));
// console.log(ulysy(7, 7));
`,
    expectedOutput: [],
    language: "javascript",
    hints: ["function ulysy(a, b) { return a > b ? a : b; }"],
  },

  // CSS Responsive Design
  {
    id: "hw-css-7",
    lessonId: "css-7",
    moduleId: "css",
    title: "Responsive sahypa döret",
    description: "Media queries bilen uýgunlaşýan dizaýn",
    instruction: "3 sany kartly sahypa dörediň. Kompýuterde 3 sütün, planşetde 2 sütün, telefonda 1 sütün bolmaly. @media query ulanyň.",
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .cards {
      display: grid;
      /* grid-template-columns goşuň */
      gap: 15px;
      padding: 20px;
    }
    .card {
      background: #3b82f6;
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    /* @media query-leri goşuň */
  </style>
</head>
<body>
  <div class="cards">
    <div class="card">Kart 1</div>
    <div class="card">Kart 2</div>
    <div class="card">Kart 3</div>
  </div>
</body>
</html>`,
    expectedOutput: ["grid-template-columns", "@media"],
    language: "html",
    hints: ["grid-template-columns: repeat(3, 1fr); we @media (max-width: 768px) ulanyň"],
  },

  // JavaScript DOM
  {
    id: "hw-js-5",
    lessonId: "js-5",
    moduleId: "javascript",
    title: "DOM bilen işle",
    description: "Elementi tapyp, üýtgediň we täze element goşuň",
    instruction: "getElementById ulanyp elementi tapyň, textContent üýtgediň we createElement bilen täze p element goşuň.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1 id="title">Salam</h1>
  <div id="container"></div>
  
  <script>
    // 1. getElementById bilen h1 elementi tapyň we textContent üýtgediň
    
    // 2. createElement bilen täze p element dörediň
    
    // 3. appendChild bilen container-a goşuň
    
  </script>
</body>
</html>`,
    expectedOutput: ["getElementById", "createElement", "appendChild"],
    language: "html",
    hints: ["document.getElementById('title').textContent = 'Üýtgedildi'; const p = document.createElement('p');"],
  },

  // JavaScript Events
  {
    id: "hw-js-6",
    lessonId: "js-6",
    moduleId: "javascript",
    title: "Waka (event) goş",
    description: "addEventListener bilen düwmä click wakasy goşuň",
    instruction: "Düwmä addEventListener bilen click wakasy goşuň. Basylda sanaw elementine täze item goşulsyn.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <button id="btn">Goş</button>
  <ul id="list"></ul>
  
  <script>
    // addEventListener ulanyp düwmä click wakasy goşuň
    // Her basylda ul-a täze li element goşulsyn
    
  </script>
</body>
</html>`,
    expectedOutput: ["addEventListener", "click"],
    language: "html",
    hints: ["document.getElementById('btn').addEventListener('click', function() { ... })"],
  },

  // JavaScript Fetch API
  {
    id: "hw-js-7",
    lessonId: "js-7",
    moduleId: "javascript",
    title: "Fetch bilen maglumat al",
    description: "API-den maglumat alyp görkeziň",
    instruction: "fetch() ulanyp jsonplaceholder.typicode.com/users API-den ulanyjylary alyň we sahypada görkeziň.",
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h2>Ulanyjylar</h2>
  <button id="loadBtn">Ýükle</button>
  <div id="result"></div>
  
  <script>
    // düwmä click wakasy goşuň
    // fetch bilen https://jsonplaceholder.typicode.com/users?_limit=3 adresinden maglumat alyň
    // netijeleri #result div-e görkeziň
    
  </script>
</body>
</html>`,
    expectedOutput: ["fetch", "json"],
    language: "html",
    hints: ["fetch('https://jsonplaceholder.typicode.com/users?_limit=3').then(r => r.json()).then(data => ...)"],
  },
];

export function getHomeworkForLesson(lessonId: string): HomeworkTask | undefined {
  return homeworkTasks.find((hw) => hw.lessonId === lessonId);
}

export function getHomeworksForModule(moduleId: string): HomeworkTask[] {
  return homeworkTasks.filter((hw) => hw.moduleId === moduleId);
}
