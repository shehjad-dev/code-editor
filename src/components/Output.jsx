import React, { useState } from 'react'
import { Button } from './ui/button'
import { executeCode } from "../api";
import { useToast } from "@/components/ui/use-toast"
import LoadingSpinner from './LoadingSpinner';

const Output = ({ editorRef, editorLanguage, outputMode, setOutputMode, exampleProblems, functionName }) => {
    const { toast } = useToast()
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // points.sort(function(a, b){return a - b});

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(editorLanguage, sourceCode);
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Unable to run code",
                // description: error.message || "Unable to run code",
            })
        } finally {
            setIsLoading(false);
        }
    };



    const checkIfCorrect = (arr1, arr2) => {
        if (arr1 === "undefined" && arr2 === "undefined") {
            return true;
        }
        const newArr1 = arr1.sort((a, b) => a - b);
        const newArr2 = arr2.sort((a, b) => a - b);

        let identical = true;
        newArr1.forEach((it, idx) => {
            if (it !== newArr2[idx]) identical = false;
        })
        return identical;
    }

    /* function parseStringToSortedArrays(input) {
        // Split the input string into lines
        const lines = input.trim().split('\n');

        // Parse each line into an array and sort it
        return lines.map(line => {
            if (line === "undefined") {
                return "undefined"
            }

            // Remove brackets and split by comma
            const numbers = line.replace(/[\[\]]/g, '').split(',');
            // Convert string numbers to integers and sort the array
            return numbers.map(num => parseInt(num.trim(), 10)).sort((a, b) => a - b);
        });
    }

    const runExampleProblems = async () => {
        const sourceCode = editorRef.current.getValue();

        // console.log(sourceCode, "sourceCode")
        const removedPrintStatement = sourceCode.replace(/\s*console\.log\(.*\)\);?\s*$/, '').trim();
        // console.log(removeConsoleLog, "removeConsoleLog");
        // console.log(removeConsoleLog, "removeConsoleLog");
        // return;
        if (!sourceCode) return;
        let modifiedFunctionSourceCode;
        let consoleLogStatement = "";
        exampleProblems.forEach(async (problem) => {

            const inputData = problem.input;
            consoleLogStatement = consoleLogStatement + `console.log(${functionName}(${JSON.stringify(inputData.nums)}, ${JSON.stringify(inputData.target)}));\n`;
            // .concat("\n\n").concat(consoleLogStatement)
        })

        modifiedFunctionSourceCode = removedPrintStatement.concat("\n\n").concat(consoleLogStatement);
        // console.log(modifiedFunctionSourceCode, "modifiedFunctionSourceCode")
        // console.log(removedPrintStatement, "removedPrintStatement")

        // return;
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(editorLanguage, modifiedFunctionSourceCode);
            console.log(result, "ress22323")
            const result2 = parseStringToSortedArrays(result.output);
            console.log(result2, "result2");
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Unable to run code",
                // description: error.message || "Unable to run code",
            })
        } finally {
            setIsLoading(false);
        }
    } */


    return (
        <div className=''>
            <p className='text-[15px] text-slate-300 mb-[5px]'>Output</p>
            <div className='flex justify-between'>
                <div className='flex gap-[5px]'>
                    <Button
                        className={`border-[1px] bg-transparent rounded-md p-2 w-fit ${outputMode === "console" ? "border-indigo-400" : "border-slate-600"}`}
                        onClick={() => setOutputMode("console")}
                    >Console
                    </Button>
                    <Button
                        className={`border-[1px] bg-transparent rounded-md p-2 w-fit ${outputMode === "test" ? "border-indigo-400" : "border-slate-600"}`}
                        onClick={() => setOutputMode("test")}
                    >Test Mode
                    </Button>
                </div>
                <Button
                    // onClick={runExampleProblems}
                    onClick={runCode}
                    className="bg-indigo-500 w-[140px] mb-[10px] gap-[0.5rem] hover:bg-indigo-400 text-white font-[500]"
                >
                    {isLoading ? (
                        <>
                            <span>Running</span>
                            <LoadingSpinner />
                        </>
                    ) : (
                        <>
                            <span>Run</span>
                        </>
                    )}

                </Button>
            </div>

            {outputMode === "console" ? (
                <div className={`bg-slate-800 h-[60vh] overflow-y-auto p-[8px] rounded-md border-[1px]  ${isError ? "border-red-500 text-red-500" : "border-slate-600 text-white"}`}>
                    {output
                        ? output.map((line, i) => <p key={i}>{line}</p>)
                        : 'Click "Run Code" to see the output here'
                    }
                </div>
            ) : (
                <div className={`bg-slate-800 h-[60vh] overflow-y-auto p-[8px] rounded-md border-[1px]  ${isError ? "border-red-500 text-red-500" : "border-slate-600 text-white"}`}>
                    Test cases
                </div>
            )}

        </div>
    )
}

export default Output 