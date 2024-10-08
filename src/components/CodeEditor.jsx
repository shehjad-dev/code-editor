import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '@/contants';
import Output from './Output';
import { codingProblem } from '../data';

const CodeEditor = () => {
    const editorRef = useRef()
    const [value, setValue] = useState('')
    const [editorLanguage, setEditorLanguage] = useState('javascript')

    const [outputMode, setOutputMode] = useState('console');

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();

    }

    useEffect(() => {
        setOutputMode("console")
    }, [editorLanguage])

    return (
        <div className='flex items-start gap-[2rem]'>
            <div className='w-[25%]'>
                <p>Question</p>
                <div className='border-[1px] border-slate-600 rounded-md p-2'>
                    {codingProblem.question}
                </div>

                <div className='my-[10px] h-[40vh] overflow-y-auto '>
                    <p>Examples</p>

                    {codingProblem.exampleList.map((example) => (
                        <div key={example.example} className='border-[1px] relative flex flex-col gap-[0.8rem] border-slate-600 rounded-md p-2 mb-2'>
                            <p className=' bg-indigo-300 text-slate-800 p-2 rounded-md text-sm mb-[6px] font-[500]'>Example - {example.example}</p>
                            <div className='text-slate-100'>
                                <p className='text-sm text-slate-300'>Input </p>
                                <p>{JSON.stringify(example.input)}</p>
                            </div>
                            <div className='text-slate-100'>
                                <p className='text-sm text-slate-300'>Output </p>
                                <p>{JSON.stringify(example.output)}</p>
                            </div>
                            {/* <p className='text-white'>Output: {JSON.stringify(example.output)}</p> */}
                        </div>
                    ))}

                </div>
            </div>
            <div className='w-[45%]'>
                <LanguageSelector
                    editorLanguage={editorLanguage}
                    setEditorLanguage={setEditorLanguage}
                    setValue={setValue}
                />
                <Editor
                    theme='vs-dark'
                    height="60vh"
                    language={editorLanguage}
                    defaultValue={CODE_SNIPPETS[editorLanguage]}
                    onMount={onMount}
                    value={value}
                    onChange={(value) => setValue(value)}
                />
            </div>
            <div className='w-[25%]'>
                <Output
                    editorRef={editorRef}
                    editorLanguage={editorLanguage}
                    outputMode={outputMode}
                    setOutputMode={setOutputMode}
                    exampleProblems={codingProblem.exampleList}
                    functionName={codingProblem.functionName}
                    codingProblem={codingProblem}
                />
            </div>

        </div>
    )
}

export default CodeEditor