export class SymbolTable {
    constructor() {
        this.symbols = new Map();
    }

    addSymbol(name, type) {
        if (this.symbols.has(name)) {
            throw new Error(`La variable "${name}" ya está definida.`);
        }
        this.symbols.set(name, { type });
    }
}

export function semanticAnalysis(ast, symbolTable) {
    function traverse(node) {
        console.log("Procesando nodo:", node);

        if (node.type === 'VariableDeclaration') {
            symbolTable.addSymbol(node.name, node.variableType);
        }

        if (node.body) {
            node.body.forEach(traverse);
        }
    }

    ast.body.forEach(traverse);
}
