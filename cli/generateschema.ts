export {}

const tsj = require('ts-json-schema-generator');
const fs = require('fs');

const directory = fs.readdirSync('./converters/types/').filter((f: string) => f.endsWith('.ts'));

directory.forEach((f: string) => {
    const file = fs.readFileSync(`./converters/types/${f}`, 'utf8');

    const regex = /\/\/ @ToolBox - ([a-zA-Z]{1,30})/;
    const match = file.match(regex);

    if (!match || match.length < 2) return;

    const schema = tsj.createGenerator({
        path: `./converters/types/${f}`,
        tsconfig: './tsconfig.json',
        type: match[1],
        additionalProperties: true,
    }).createSchema(match[1])

    const schemaString = JSON.stringify(schema, null, 2);
    fs.writeFileSync(`./converters/types/${f.replace('.ts', '.json')}`, schemaString);
})
