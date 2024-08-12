export const codingProblem = {
    question: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
  
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  
  You can return the answer in any order.`,
    functionName: "twoSum",

    exampleList: [
        {
            example: 1,
            input: { nums: [2, 7, 11, 15], target: 9 },
            output: [0, 1],
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
            example: 2,
            input: { nums: [3, 2, 4], target: 6 },
            output: [1, 2],
            explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        },
        {
            example: 3,
            input: { nums: [3, 2, 4], target: 2 },
            output: "undefined",
            explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        },
        /* {
            example: 3,
            input: { nums: [3, 3], target: 6 },
            output: [0, 1],
            explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
        } */
    ],

    testCases: [
        {
            array: [3, 5, -4, 8, 11, 1, -1, 6],
            targetSum: 10,
            expectedOutput: [1, 6]
        },
        {
            array: [4, 6],
            targetSum: 10,
            expectedOutput: [0, 1]
        },
        {
            array: [4, 6, 1],
            targetSum: 5,
            expectedOutput: [1, 2]
        },
        {
            array: [4, 6, 1, -3],
            targetSum: 3,
            expectedOutput: [2, 3]
        },
        {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            targetSum: 17,
            expectedOutput: [7, 8]
        },
        {
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 15],
            targetSum: 18,
            expectedOutput: [8, 9]
        },
        {
            array: [-7, -5, -3, -1, 0, 1, 3, 5, 7],
            targetSum: -5,
            expectedOutput: [2, 3]
        },
        {
            array: [-21, 301, 12, 4, 65, 56, 210, 356, 9, -47],
            targetSum: 163,
            expectedOutput: [3, 7]
        },
        {
            array: [-21, 301, 12, 4, 65, 56, 210, 356, 9, -47],
            targetSum: 164,
            expectedOutput: [4, 7]
        },
        {
            array: [3, 5, -4, 8, 11, 1, -1, 6],
            targetSum: 15,
            expectedOutput: [4, 5]
        },
        {
            array: [14],
            targetSum: 15,
            expectedOutput: null
        },
        {
            array: [15],
            targetSum: 15,
            expectedOutput: null
        }
    ],
};