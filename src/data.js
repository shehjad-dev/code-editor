// code template according to language
// test template according to language

export const codingProblem = {
    question: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    You can return the answer in any order.`,
    functionName: "twoSum",
    exampleList: [
        {
            example: 1,
            input: { nums: [2, 7, 11, 15], target: 9 },
            // output: [2, 1],
            output: [0, 1],
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
            example: 2,
            input: { nums: [3, 2, 4], target: 6 },
            output: [1, 2],
            // output: [1, 2],
            explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        },
        {
            example: 3,
            input: { nums: [3, 2, 4], target: 2 },
            output: "undefined",
            explanation: "Because no item is equal to 2, we return undefined."
        },
        /* {
            example: 3,
            input: { nums: [3, 3], target: 6 },
            output: [0, 1],
            explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
        } */
        {
            example: 4,
            input: {nums: [3, 5, -4, 8, 11, 1, -1, 6], target: 10},
            output: [4, 6]
        },
        {
            example: 5,
            input: {nums: [4, 6, 1, -3], target: 3},
            output: [1, 3]
        },
        {
            example: 6,
            input: {nums: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 17},
            output: [7, 8]
        },
        {
            example: 7,
            input: {nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 15], target: 18},
            output: [2, 9]
        },
        {
            example: 8,
            input: {nums: [14], target: 15},
            output: "undefined"
        },
        {
            example: 9,
            input: {nums: [15], target: 15},
            output: "undefined"
        }
    ],
    testCases: [
        // ... (your existing test cases)
    ],
    convertStringInArrayToArray: function(arr) {
        try {
            if (arr.length !== 1 || typeof arr[0] !== 'string') {
                throw new Error("Input should be an array with a single string element");
            }
            let string = arr[0];
            let resultArray = string
                .replace(/[\[\]]/g, '')
                .split(',')
                .map(Number);
            return resultArray;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    },
    checkIfCorrect: function(arr1, arr2) {
        if (arr1[0] === "undefined" && arr2[0] === "undefined") {
            return true;
        } else if (arr1[0] === "undefined" && arr2[0] !== "undefined") {
            return false;
        } else if (arr1[0] !== "undefined" && arr2[0] === "undefined") {
            return false;
        }

        const arr1Array = this.convertStringInArrayToArray(arr1);
        const arr2Array = arr2;

        const newArr1 = Array.isArray(arr1Array) ? arr1Array.sort((a, b) => a - b) : [];
        const newArr2 = Array.isArray(arr2Array) ? arr2Array.sort((a, b) => a - b) : [];

        let identical = true;
        newArr1.forEach((item, idx) => {
            if (item !== newArr2[idx]) identical = false;
        });

        return identical;
    },
    runExampleProblems: async function(editorRef, editorLanguage, executeCode, setIsLoading, setTestOutput, toast) {
        console.log("dasdasd")
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;


        const cleanedSourceCode = sourceCode.replace(/console\.log\(.*\);?/g, '').trim();
        let testCaseResults = [];
        console.log(this.exampleList, "this.exampleList")

        for (const problem of this.exampleList) {

            const inputData = problem.input;
            const testCase = `${this.functionName}(${JSON.stringify(inputData.nums)}, ${JSON.stringify(inputData.target)})`;
            const consoleLogStatement = `console.log(${testCase});\n`;
            const modifiedFunctionSourceCode = cleanedSourceCode + '\n' + consoleLogStatement;

            try {
                setIsLoading(true);
                const { run: result } = await executeCode(editorLanguage, modifiedFunctionSourceCode);
                const outputLines = result.output.split("\n").filter(line => line);
                testCaseResults.push({
                    example: problem.example,
                    expected: problem.output,
                    received: outputLines[0] === "undefined" ? "undefined" : this.convertStringInArrayToArray(outputLines),
                    passed: this.checkIfCorrect(outputLines, Array.isArray(problem.output) ? problem.output : [problem.output]),
                    // explanation: problem.explanation,
                });
                setTestOutput([...testCaseResults]);
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Unable to run test cases",
                });
            } finally {
                setIsLoading(false);
            }
        }
    }
};


// export const codingProblem = {
//     question: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
  
//   You may assume that each input would have exactly one solution, and you may not use the same element twice.
  
//   You can return the answer in any order.`,
//     functionName: "twoSum",

//     exampleList: [
//         {
//             example: 1,
//             input: { nums: [2, 7, 11, 15], target: 9 },
//             output: [2, 1],
//             // output: [0, 1],
//             explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
//         },
//         {
//             example: 2,
//             input: { nums: [3, 2, 4], target: 6 },
//             output: [1, 2],
//             // output: [1, 2],
//             explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
//         },
//         {
//             example: 3,
//             input: { nums: [3, 2, 4], target: 2 },
//             output: "undefined",
//             explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
//         },
//         /* {
//             example: 3,
//             input: { nums: [3, 3], target: 6 },
//             output: [0, 1],
//             explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
//         } */
//     ],

//     testCases: [
//         {
//             array: [3, 5, -4, 8, 11, 1, -1, 6],
//             targetSum: 10,
//             expectedOutput: [1, 6]
//         },
//         {
//             array: [4, 6],
//             targetSum: 10,
//             expectedOutput: [0, 1]
//         },
//         {
//             array: [4, 6, 1],
//             targetSum: 5,
//             expectedOutput: [1, 2]
//         },
//         {
//             array: [4, 6, 1, -3],
//             targetSum: 3,
//             expectedOutput: [2, 3]
//         },
//         {
//             array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//             targetSum: 17,
//             expectedOutput: [7, 8]
//         },
//         {
//             array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 15],
//             targetSum: 18,
//             expectedOutput: [8, 9]
//         },
//         {
//             array: [-7, -5, -3, -1, 0, 1, 3, 5, 7],
//             targetSum: -5,
//             expectedOutput: [2, 3]
//         },
//         {
//             array: [-21, 301, 12, 4, 65, 56, 210, 356, 9, -47],
//             targetSum: 163,
//             expectedOutput: [3, 7]
//         },
//         {
//             array: [-21, 301, 12, 4, 65, 56, 210, 356, 9, -47],
//             targetSum: 164,
//             expectedOutput: [4, 7]
//         },
//         {
//             array: [3, 5, -4, 8, 11, 1, -1, 6],
//             targetSum: 15,
//             expectedOutput: [4, 5]
//         },
//         {
//             array: [14],
//             targetSum: 15,
//             expectedOutput: null
//         },
//         {
//             array: [15],
//             targetSum: 15,
//             expectedOutput: null
//         }
//     ],
// };