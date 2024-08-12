import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../contants"

const languages = Object.entries(LANGUAGE_VERSIONS)

const LanguageSelector = ({ editorLanguage, setEditorLanguage, setValue }) => {

    const handleMenuChange = (val) => {
        setEditorLanguage(val);
        setValue(CODE_SNIPPETS[val]);
    }
    return (
        <div className='mb-[10px]'>
            <p className='text-[15px] text-slate-300 mb-[5px]'>Language</p>
            {/* <p>{currentLanguage}</p> */}
            <Select onValueChange={(val) => {
                handleMenuChange(val)
            }}
                className=""
            >
                <SelectTrigger className="w-[180px] text-white  bg-slate-800">
                    <SelectValue placeholder={editorLanguage} className='' />
                </SelectTrigger>
                <SelectContent>
                    {languages.map(([language, version], idx) => (
                        <SelectItem
                            key={`${language}-${idx}`}
                            value={language}
                            className={` bg-slate-800 ${editorLanguage === language ? 'text-indigo-400' : 'text-slate-300'}`}
                        >
                            {language}
                        </SelectItem>
                    ))}
                    {/* <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem> */}
                </SelectContent>
            </Select>
        </div>
    )
}

export default LanguageSelector