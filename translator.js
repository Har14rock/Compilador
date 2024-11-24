import { lexJavaCode } from './lexer.js';
import { parseTokens } from './parser.js';
import { semanticAnalysis, SymbolTable } from './semantic.js';
import { generateIntermediateCode } from './intermediateCode.js';

const javaInput = document.getElementById('javaInput');
const jsOutput = document.getElementById('jsOutput');
const lexicalOutput = document.getElementById('lexicalOutput');
const astOutput = document.getElementById('astOutput');
const symbolTableOutput = document.getElementById('symbolTableOutput');
const intermediateCodeOutput = document.getElementById('intermediateCodeOutput');
const analyzeButton = document.getElementById('analyzeButton');
const translateButton = document.getElementById('translateButton');

analyzeButton.addEventListener('click', () => {
    const javaCode = javaInput.value;

    if (!javaCode.trim()) {
        alert('Por favor, ingresa código Java antes de analizar.');
        return;
    }

    try {
        const tokens = lexJavaCode(javaCode);
        lexicalOutput.textContent = JSON.stringify(tokens, null, 2);

        const ast = parseTokens(tokens);
        astOutput.textContent = JSON.stringify(ast, null, 2);

        const symbolTable = new SymbolTable();
        semanticAnalysis(ast, symbolTable);
        symbolTableOutput.textContent = JSON.stringify([...symbolTable.symbols.entries()], null, 2);

        const intermediateCode = generateIntermediateCode(ast);
        intermediateCodeOutput.textContent = intermediateCode.join('\n');
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

translateButton.addEventListener('click', () => {
    const javaCode = javaInput.value;

    if (!javaCode.trim()) {
        alert('Por favor, ingresa código Java antes de traducir.');
        return;
    }

    try {
        const jsCode = translateJavaToJS(javaCode);
        jsOutput.value = jsCode;
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

function translateJavaToJS(javaCode) {
    const rules = [
        { regex: /\bint\b/g, replacement: 'let' },
        { regex: /\bString\b/g, replacement: 'let' },
        { regex: /System\.out\.println/g, replacement: 'console.log' },
    ];

    let jsCode = javaCode;
    rules.forEach(rule => {
        jsCode = jsCode.replace(rule.regex, rule.replacement);
    });

    return jsCode;
}
