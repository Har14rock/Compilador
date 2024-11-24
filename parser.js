export function parseTokens(tokens) {
    const ast = {
        type: 'Program',
        body: [],
    };

    let currentIndex = 0;

    function walk() {
        const token = tokens[currentIndex];

        if (!token) return null;

        if (token.type === 'class') {
            currentIndex++;
            const name = tokens[currentIndex].value;
            currentIndex++;
            const body = [];

            while (tokens[currentIndex] && tokens[currentIndex].type !== '}') {
                const child = walk();
                if (child) body.push(child);
            }

            currentIndex++; // Salta '}'

            return {
                type: 'ClassDeclaration',
                name,
                body,
            };
        }

        if (token.type === 'int' || token.type === 'String') {
            const variableType = token.type;
            currentIndex++;
            const name = tokens[currentIndex].value;
            currentIndex++;

            if (tokens[currentIndex] && tokens[currentIndex].type === ';') {
                currentIndex++; // Salta ';'
            }

            return {
                type: 'VariableDeclaration',
                variableType,
                name,
            };
        }

        if (token.type === '=') {
            const name = tokens[currentIndex - 1].value;
            currentIndex++;
            const value = tokens[currentIndex].value;
            currentIndex++;

            if (tokens[currentIndex] && tokens[currentIndex].type === ';') {
                currentIndex++; // Salta ';'
            }

            return {
                type: 'Assignment',
                name,
                value,
            };
        }

        if (token.type === 'System.out.println') {
            currentIndex++;
            const value = tokens[currentIndex].value;
            currentIndex++;

            if (tokens[currentIndex] && tokens[currentIndex].type === ';') {
                currentIndex++; // Salta ';'
            }

            return {
                type: 'PrintStatement',
                value,
            };
        }

        currentIndex++;
        return null;
    }

    while (currentIndex < tokens.length) {
        const node = walk();
        if (node) ast.body.push(node);
    }

    return ast;
}
