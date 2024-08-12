import React, { useState } from 'react'
import { Button } from './ui/button'
import { executeCode } from "../api";
import { useToast } from "@/components/ui/use-toast"
import LoadingSpinner from './LoadingSpinner';

const Output = ({ editorRef, editorLanguage, outputMode, setOutputMode, exampleProblems, functionName, codingProblem }) => {
    const { toast } = useToast()
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [testOutput, setTestOutput] = useState([]);

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





    const runExampleProblems = () => {
        codingProblem.runExampleProblems(editorRef, editorLanguage, executeCode, setIsLoading, setTestOutput, toast);
    };




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
                        onClick={() =>
                            editorLanguage !== "javascript" ? toast({ variant: "destructive", title: "Only Javascript allowed for test mode", description: "Other languages test mode coming soon!" }) : setOutputMode("test")}
                    >Test Mode
                    </Button>
                </div>
                <Button
                    onClick={() => {
                        outputMode === "console" ? runCode() : runExampleProblems()
                    }
                    }
                    // onClick={runCode}
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
                (
                    <div className={`bg-slate-800 h-[60vh] overflow-y-auto p-[8px] rounded-md border-[1px] ${isError ? "border-red-500 text-red-500" : "border-slate-600 text-white"}`}>
                        {testOutput.length > 0 ? (
                            testOutput.map((result) => (
                                <div key={result.example} className={`border-b border-slate-600 p-2 ${result.passed ? "text-green-400" : "text-red-400"}`}>
                                    <p><strong>Example {result.example}:</strong></p>
                                    <p><strong>Expected:</strong> {JSON.stringify(result.expected)}</p>
                                    <p><strong>Received:</strong> {JSON.stringify(result.received)}</p>
                                    <p><strong>Status:</strong> {result.passed ? "Passed" : "Failed"}</p>
                                    {/* <p><strong>Explanation:</strong> {result.explanation}</p> */}
                                </div>
                            ))
                        ) : (
                            'Click "Run" to see test results here'
                        )}
                    </div>
                )
            )}

        </div>
    )
}

export default Output 