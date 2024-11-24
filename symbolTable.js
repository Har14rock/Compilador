// symbolTable.js
class SymbolTable {
    constructor() {
        this.symbols = new Map();
    }

    addSymbol(name, type, value = null) {
        if (this.symbols.has(name)) {
            throw new Error(`El símbolo ${name} ya existe.`);
        }
        this.symbols.set(name, { type, value });
    }

    getSymbol(name) {
        if (!this.symbols.has(name)) {
            throw new Error(`El símbolo ${name} no está definido.`);
        }
        return this.symbols.get(name);
    }
}

export { SymbolTable };
