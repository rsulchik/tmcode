// TürkmenCode - JavaScript Interpreter

// Default code
const defaultCode = `// Salam TürkmenCode!

function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

console.log(hasDuplicates([1, 2, 3])); // false
console.log(hasDuplicates([1, 2, 2])); // true

// Başga mysallar:
console.log("Salam, Dünýä!");

const sanlar = [1, 2, 3, 4, 5];
const jemi = sanlar.reduce((a, b) => a + b, 0);
console.log("Sanlaryň jemi:", jemi);

// Obýekt bilen işlemek
const ulanyjy = {
  ady: "Merdan",
  ýaşy: 25,
  şäheri: "Aşgabat"
};
console.log("Ulanyjy:", ulanyjy);

// Sikl
for (let i = 1; i <= 3; i++) {
  console.log("Nomer:", i);
}`;

// DOM Elements
const codeEditor = document.getElementById('codeEditor');
const lineNumbers = document.getElementById('lineNumbers');
const highlightCode = document.getElementById('highlightCode');
const syntaxHighlight = document.getElementById('syntaxHighlight');
const output = document.getElementById('output');
const runBtn = document.getElementById('runBtn');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');
const clearOutputBtn = document.getElementById('clearOutput');
const themeToggle = document.getElementById('themeToggle');
const toastContainer = document.getElementById('toastContainer');

// Initialize
function init() {
    // Load saved code or use default
    const savedCode = localStorage.getItem('turkmencode-code');
    codeEditor.value = savedCode || defaultCode;
    
    // Load theme preference
    const savedTheme = localStorage.getItem('turkmencode-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    updateLineNumbers();
    highlightSyntax();
    // Event listeners
    codeEditor.addEventListener('input', handleInput);
    codeEditor.addEventListener('scroll', syncScroll);
    codeEditor.addEventListener('keydown', handleKeyDown);
    runBtn.addEventListener('click', runCode);
    resetBtn.addEventListener('click', resetCode);
    copyBtn.addEventListener('click', copyCode);
    clearOutputBtn.addEventListener('click', clearOutput);
    themeToggle.addEventListener('click', toggleTheme);
}

// Update line numbers
function updateLineNumbers() {
    const lines = codeEditor.value.split('\n');
    const numbers = lines.map((_, i) => i + 1).join('\n');
    lineNumbers.textContent = numbers;
}

// Handle input
function handleInput() {
    updateLineNumbers();
    highlightSyntax();
    // Auto-save
    localStorage.setItem('turkmencode-code', codeEditor.value);
}

// Sync scroll between editor, line numbers, and highlight
function syncScroll() {
    lineNumbers.scrollTop = codeEditor.scrollTop;
    syntaxHighlight.scrollTop = codeEditor.scrollTop;
    syntaxHighlight.scrollLeft = codeEditor.scrollLeft;
}

// Syntax highlighting
function highlightSyntax() {
    const code = codeEditor.value;
    highlightCode.innerHTML = tokenize(code);
}

function tokenize(code) {
    // Escape HTML first
    let result = '';
    const tokens = [];
    
    // Regex patterns for JS tokens
    const patterns = [
        { type: 'comment', regex: /\/\/.*$/gm },
        { type: 'comment', regex: /\/\*[\s\S]*?\*\//g },
        { type: 'string', regex: /(["'`])(?:(?!\1|\\).|\\.)*\1/g },
        { type: 'regex', regex: /\/(?!\/)(?:[^\/\\]|\\.)+\/[gimsuy]*/g },
        { type: 'keyword', regex: /\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|typeof|instanceof|in|of|class|extends|super|import|export|default|from|try|catch|finally|throw|async|await|yield|this|void|delete|with|debugger)\b/g },
        { type: 'boolean', regex: /\b(?:true|false|null|undefined|NaN|Infinity)\b/g },
        { type: 'builtin', regex: /\b(?:console|Math|JSON|Array|Object|String|Number|Boolean|Date|RegExp|Error|Map|Set|Promise|Symbol|parseInt|parseFloat|isNaN|isFinite|setTimeout|setInterval|document|window)\b/g },
        { type: 'number', regex: /\b(?:0x[\da-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/g },
        { type: 'function', regex: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g },
        { type: 'operator', regex: /[+\-*/%=<>!&|^~?:]+|\.{3}/g },
        { type: 'punctuation', regex: /[{}()\[\];,.]/g },
    ];
    
    // Simple approach: build a list of all token positions
    const allTokens = [];
    
    for (const pattern of patterns) {
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
        let match;
        while ((match = regex.exec(code)) !== null) {
            allTokens.push({
                type: pattern.type,
                start: match.index,
                end: match.index + match[0].length,
                text: match[0]
            });
        }
    }
    
    // Sort by position, longer matches first for same position
    allTokens.sort((a, b) => a.start - b.start || b.end - a.end);
    
    // Remove overlapping tokens (keep first/longest)
    const filtered = [];
    let lastEnd = 0;
    for (const token of allTokens) {
        if (token.start >= lastEnd) {
            filtered.push(token);
            lastEnd = token.end;
        }
    }
    
    // Build highlighted HTML
    let pos = 0;
    for (const token of filtered) {
        if (token.start > pos) {
            result += escapeHtml(code.slice(pos, token.start));
        }
        result += `<span class="token-${token.type}">${escapeHtml(token.text)}</span>`;
        pos = token.end;
    }
    if (pos < code.length) {
        result += escapeHtml(code.slice(pos));
    }
    
    // Add trailing newline so heights match
    return result + '\n';
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Handle keyboard shortcuts
function handleKeyDown(e) {
    // Tab key - insert spaces
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;
        codeEditor.value = codeEditor.value.substring(0, start) + '  ' + codeEditor.value.substring(end);
        codeEditor.selectionStart = codeEditor.selectionEnd = start + 2;
        handleInput();
    }
    
    // Ctrl/Cmd + Enter - run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
    
    // Ctrl/Cmd + S - save (prevent default)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showToast('Kod awtomatiki saklanýar', 'info');
    }
}

// Run code
function runCode() {
    const code = codeEditor.value;
    output.innerHTML = '';
    
    // Store original console methods
    const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
        clear: console.clear
    };
    
    const logs = [];
    
    // Override console methods
    console.log = (...args) => {
        logs.push({ type: 'log', args });
    };
    
    console.error = (...args) => {
        logs.push({ type: 'error', args });
    };
    
    console.warn = (...args) => {
        logs.push({ type: 'warn', args });
    };
    
    console.info = (...args) => {
        logs.push({ type: 'info', args });
    };
    
    console.clear = () => {
        logs.length = 0;
    };
    
    try {
        // Execute code
        eval(code);
        
        // Display logs
        if (logs.length === 0) {
            output.innerHTML = '<p class="placeholder">Kod üstünlikli ýerine ýetirildi (netije ýok)</p>';
        } else {
            logs.forEach(log => {
                const line = document.createElement('div');
                line.className = `output-line ${log.type}`;
                
                const prefix = document.createElement('span');
                prefix.className = 'prefix';
                
                switch (log.type) {
                    case 'error':
                        prefix.textContent = '❌';
                        break;
                    case 'warn':
                        prefix.textContent = '⚠️';
                        break;
                    case 'info':
                        prefix.textContent = 'ℹ️';
                        break;
                    default:
                        prefix.textContent = '›';
                }
                
                line.appendChild(prefix);
                line.appendChild(document.createTextNode(formatArgs(log.args)));
                output.appendChild(line);
            });
        }
        
        showToast('Kod üstünlikli ýerine ýetirildi', 'success');
        
    } catch (error) {
        const errorLine = document.createElement('div');
        errorLine.className = 'output-line error';
        
        const prefix = document.createElement('span');
        prefix.className = 'prefix';
        prefix.textContent = '❌';
        
        errorLine.appendChild(prefix);
        errorLine.appendChild(document.createTextNode(`Ýalňyşlyk: ${error.message}`));
        output.appendChild(errorLine);
        
        showToast('Kod ýerine ýetirilende ýalňyşlyk ýüze çykdy', 'error');
        
    } finally {
        // Restore original console methods
        Object.assign(console, originalConsole);
    }
}

// Format arguments for display
function formatArgs(args) {
    return args.map(arg => {
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';
        if (typeof arg === 'object') {
            try {
                return JSON.stringify(arg, null, 2);
            } catch {
                return String(arg);
            }
        }
        return String(arg);
    }).join(' ');
}

// Reset code
function resetCode() {
    codeEditor.value = defaultCode;
    localStorage.setItem('turkmencode-code', defaultCode);
    updateLineNumbers();
    clearOutput();
    showToast('Kod täzeden başladyldy', 'info');
}

// Copy code
function copyCode() {
    navigator.clipboard.writeText(codeEditor.value).then(() => {
        showToast('Kod göçürildi', 'success');
    }).catch(() => {
        showToast('Göçürip bolmady', 'error');
    });
}

// Clear output
function clearOutput() {
    output.innerHTML = '<p class="placeholder">Netije şu ýerde görkeziler...</p>';
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('turkmencode-theme', isDark ? 'dark' : 'light');
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = document.createElement('span');
    switch (type) {
        case 'success':
            icon.textContent = '✓';
            break;
        case 'error':
            icon.textContent = '✕';
            break;
        default:
            icon.textContent = 'ℹ';
    }
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'toast-message';
    messageSpan.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(messageSpan);
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
