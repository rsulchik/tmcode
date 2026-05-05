export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  moduleId: string;
  title: string;
  icon: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    moduleId: "html",
    title: "HTML Esaslary — Test",
    icon: "🌐",
    questions: [
      {
        id: "html-q1",
        question: "HTML näme?",
        options: [
          "Programmirleme dili",
          "Belgileme dili",
          "Stil dili",
          "Maglumat bazasy",
        ],
        correctIndex: 1,
        explanation:
          "HTML (HyperText Markup Language) belgileme dilidir, programmirleme dili däl.",
      },
      {
        id: "html-q2",
        question: "Sahypanyň görünýän mazmuny haýsy tegde ýerleşýär?",
        options: ["<head>", "<html>", "<body>", "<meta>"],
        correctIndex: 2,
        explanation:
          "<body> tegi sahypada görünýän ähli mazmuny öz içine alýar.",
      },
      {
        id: "html-q3",
        question: "Iň uly sözbaşy tegi haýsy?",
        options: ["<h6>", "<h1>", "<header>", "<title>"],
        correctIndex: 1,
        explanation: "<h1> iň uly, <h6> iň kiçi sözbaşy tegidir.",
      },
      {
        id: "html-q4",
        question: "Tertipsiz sanaw üçin haýsy teg ulanylýar?",
        options: ["<ol>", "<li>", "<ul>", "<list>"],
        correctIndex: 2,
        explanation:
          "<ul> (unordered list) tertipsiz sanaw döredýär, <ol> bolsa tertipli.",
      },
      {
        id: "html-q5",
        question: "Surat goşmak üçin haýsy teg ulanylýar?",
        options: ["<picture>", "<src>", "<img>", "<image>"],
        correctIndex: 2,
        explanation:
          '<img src="..." alt="..."> tegi bilen suratlar goşulýar.',
      },
      {
        id: "html-q6",
        question: "Baglanyşyk döretmek üçin haýsy teg ulanylýar?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctIndex: 1,
        explanation:
          '<a href="..."> tegi bilen baglanyşyk döredilýär. <link> bolsa CSS birikdirmek üçin.',
      },
      {
        id: "html-q7",
        question:
          "Formdaky tekst giriş meýdany üçin haýsy teg ulanylýar?",
        options: ["<text>", "<field>", "<input>", "<form>"],
        correctIndex: 2,
        explanation:
          '<input type="text"> tekst giriş meýdanyny döredýär.',
      },
      {
        id: "html-q8",
        question: "HTML5 resminamanyň başynda näme ýazylmaly?",
        options: [
          "<html5>",
          "<!DOCTYPE html>",
          "<head>",
          "<start>",
        ],
        correctIndex: 1,
        explanation:
          "<!DOCTYPE html> resminamanyň HTML5 görnüşidigini aňladýar.",
      },
    ],
  },
  {
    moduleId: "css",
    title: "CSS Esaslary — Test",
    icon: "🎨",
    questions: [
      {
        id: "css-q1",
        question: "CSS näme üçin ulanylýar?",
        options: [
          "Sahypanyň gurluşy üçin",
          "Maglumat saklamak üçin",
          "Sahypanyň daşky görnüşi üçin",
          "Programmirleme üçin",
        ],
        correctIndex: 2,
        explanation:
          "CSS HTML elementleriniň reňkini, ölçegini, ýerleşişini sazlaýar.",
      },
      {
        id: "css-q2",
        question: "Tekst reňkini üýtgetmek üçin haýsy häsiýet ulanylýar?",
        options: ["text-color", "font-color", "color", "foreground"],
        correctIndex: 2,
        explanation:
          "color häsiýeti tekst reňkini kesgitleýär.",
      },
      {
        id: "css-q3",
        question: "Box Model-de margin näme?",
        options: [
          "Mazmunyň içi",
          "Çarçuwa",
          "Elementiň daşky boşlugy",
          "Tekst ölçegi",
        ],
        correctIndex: 2,
        explanation:
          "Margin elementiň daşyndaky boşlukdyr. Padding bolsa içki boşluk.",
      },
      {
        id: "css-q4",
        question: "Flexbox-y işletmek üçin haýsy häsiýet gerek?",
        options: [
          "position: flex",
          "display: flexbox",
          "display: flex",
          "flex: true",
        ],
        correctIndex: 2,
        explanation:
          "display: flex konteýneri flex konteýnerine öwürýär.",
      },
      {
        id: "css-q5",
        question:
          "CSS-de ýuwaş üýtgeşme (smooth transition) haýsy häsiýet bilen döredilýär?",
        options: ["animation", "transform", "transition", "keyframes"],
        correctIndex: 2,
        explanation:
          "transition häsiýeti ýuwaş üýtgeşme effektini berýär.",
      },
      {
        id: "css-q6",
        question:
          "Grid-de sütünleri kesgitlemek üçin haýsy häsiýet ulanylýar?",
        options: [
          "grid-columns",
          "grid-template-columns",
          "columns",
          "grid-layout",
        ],
        correctIndex: 1,
        explanation:
          "grid-template-columns sütünleriň sanyny we ölçegini kesgitleýär.",
      },
      {
        id: "css-q7",
        question: "Burçlary tegeleklemek üçin haýsy häsiýet?",
        options: [
          "corner-radius",
          "border-round",
          "border-radius",
          "radius",
        ],
        correctIndex: 2,
        explanation:
          "border-radius häsiýeti burçlary tegelekleýär.",
      },
      {
        id: "css-q8",
        question: "#ff0000 haýsy reňk?",
        options: ["Gök", "Ýaşyl", "Gyzyl", "Ak"],
        correctIndex: 2,
        explanation:
          "#ff0000 — gyzyl reňk. ff gyzyl kanalda, 00 ýaşyl we gök kanallarda.",
      },
    ],
  },
  {
    moduleId: "javascript",
    title: "JavaScript Esaslary — Test",
    icon: "🟨",
    questions: [
      {
        id: "js-q1",
        question:
          "Üýtgedilmeýän değişgen yglan etmek üçin haýsy açar söz ulanylýar?",
        options: ["var", "let", "const", "final"],
        correctIndex: 2,
        explanation:
          "const üýtgedilmeýän değişgen döredýär. let üýtgedilip bilýär.",
      },
      {
        id: "js-q2",
        question: "console.log() näme edýär?",
        options: [
          "Ýalňyşlyk görkezýär",
          "Konsola maglumat çykarýar",
          "Değişgen döredýär",
          "Funksiýa çagyrýar",
        ],
        correctIndex: 1,
        explanation:
          "console.log() konsola maglumat çykarmak üçin ulanylýar.",
      },
      {
        id: "js-q3",
        question: "=== operatory näme edýär?",
        options: [
          "Baha berýär",
          "Görnüşi barlaýar",
          "Bahany we görnüşi deňeşdirýär",
          "Değişgen yglan edýär",
        ],
        correctIndex: 2,
        explanation:
          "=== bahany hem görnüşi hem deňeşdirýär (strict equality).",
      },
      {
        id: "js-q4",
        question: "Massiwiň ilkinji elementiniň indeksi näçe?",
        options: ["1", "0", "-1", "first"],
        correctIndex: 1,
        explanation:
          "JavaScript-de massiw indeksleri 0-dan başlaýar.",
      },
      {
        id: "js-q5",
        question:
          "Arrow funksiýasynyň dogry ýazylyşy haýsy?",
        options: [
          "function => (a) {}",
          "const fn = (a) => {}",
          "=> function(a) {}",
          "arrow fn(a) {}",
        ],
        correctIndex: 1,
        explanation:
          "Arrow funksiýa: const fn = (parametr) => { ... }",
      },
      {
        id: "js-q6",
        question:
          "for sikli haýsy 3 bölekden durýar?",
        options: [
          "başlangyç, şert, ädim",
          "at, baha, görnüş",
          "giriş, çykyş, gaýtalama",
          "aç, ýap, gaýtala",
        ],
        correctIndex: 0,
        explanation:
          "for (başlangyç; şert; ädim) — for sikliniň 3 bölegi.",
      },
      {
        id: "js-q7",
        question: "typeof 42 netijesi näme?",
        options: ['"integer"', '"number"', '"string"', '"42"'],
        correctIndex: 1,
        explanation:
          'JavaScript-de ähli sanlar "number" görnüşindedir.',
      },
      {
        id: "js-q8",
        question:
          "if/else şertinde && (we) operatory nähili işleýär?",
        options: [
          "Biri dogry bolsa ýeterlik",
          "Ikisi hem dogry bolmaly",
          "Ikisi hem ýalňyş bolmaly",
          "Biri ýalňyş bolmaly",
        ],
        correctIndex: 1,
        explanation:
          "&& (we) operatory diňe iki tarapy hem dogry bolanda true gaýtarýar.",
      },
    ],
  },
];
