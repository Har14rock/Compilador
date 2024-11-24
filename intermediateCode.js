export function generateIntermediateCode(ast) {
    const code = [];

    function traverse(node) {
        console.log("Nodo para código intermedio:", node);

        if (node.type === 'VariableDeclaration') {
            code.push(`DECLARE ${node.variableType} ${node.name};`);
        }

        if (node.type === 'Assignment') {
            code.push(`ASSIGN ${node.name}, ${node.value};`);
        }

        if (node.type === 'PrintStatement') {
            code.push(`PRINT ${node.value};`);
        }

        if (node.body) {
            node.body.forEach(traverse);
        }
    }

    ast.body.forEach(traverse);

    return code;
}
