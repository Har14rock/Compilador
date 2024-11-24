export function codeGenerator(ast) {
    let jsCode = "";

    ast.body.forEach(node => {
        if (node.type === "class") {
            jsCode += `class ${node.value} {\n`;
        } else if (node.type === "main") {
            jsCode += `  main() {\n`;
        } else if (node.type === "System.out.println") {
            jsCode += `    console.log();\n`;
        } else if (node.type === "}") {
            jsCode += "}\n";
        }
    });

    return jsCode;
}
