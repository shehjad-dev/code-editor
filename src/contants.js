export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
};

export const CODE_SNIPPETS = {
    javascript: `const twoSum = (nums, target) => {\n\tconst pairIdx = {};\n\n\tfor (let i = 0; i < nums.length; i++) {\n\t\tconst num = nums[i];\n\t\tif (target - num in pairIdx) {\n\t\t\treturn [i, pairIdx[target - num]];\n\t\t}\n\t\tpairIdx[num] = i;\n\t}\n\n\treturn undefined;\n};\n\n//note - 1: dont change the function name\n//note - 2: in global scope, you can only print the output of the returned statement\n\nconsole.log(twoSum([3, 2, 4], 6))`,
    // javascript: `const twoSum = (nums, target) => { \n\n\n};\n\nconsole.log(twoSum([3, 2, 4], 6))\n`,
    // javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
        'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};