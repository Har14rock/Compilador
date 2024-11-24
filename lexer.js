export function lexJavaCode(code) {
    const tokens = [];
    const regex = /\b(int|double|String|boolean|class|public|static|void|for|if|else|return|System|out|println)\b|[{}();,=+\-*/<>]|\d+|".*?"/g;
    let match;

    while ((match = regex.exec(code)) !== null) {
        tokens.push({ type: match[1] || match[0], value: match[0] });
    }

    return tokens;
}
