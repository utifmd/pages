import React, { useState, useRef } from 'react'
import { toBase64, toLowerImage } from '../../../../features/module'
import { BtnPrimary } from '../../particular/button'
import { PlaceholderImg } from '../../../../assets'
// import {} from '../../../../'

const App = ({ data, setDetailImage }) => { 
    const inputRef = useRef(null),
        [ scholars, setScholars ] = useState({ title: '', desc: 'Scholarship entry', body: '', author: 'utifmd@gmail.com', file: null, tags: ['scholarship']}),
        
    handleSubmit = () => {
        console.log(scholars);
    },
    
    handleOpenedFile = async (e) => {
        let file = e.target.files[0]
        
        await toLowerImage(file).then( async (lower) => { // console.log(`out size ${lower.size / 1024 / 1024} MB`)
            await toBase64(lower).then(base64 => 
                setScholars({ ...scholars, file: base64})
            ).catch((err) => console.log(err.message))
        }).catch(err => console.log(err.message))
    },

    handleTagsEvent = (e) => {
        if(e.keyCode === 13) {
            setScholars({ ...scholars,  tags: [
                ...scholars.tags, e.target.value.replace(/\s+/g, '')
            ]})
            e.target.value = ''
        }
    },

    deleteTagsItem = (key) => setScholars({ ...scholars, tags: 
        scholars.tags.filter((v, i) => i !== key)
    })

return( 
    <div className="py-6">
        <div className="h-px bg-gray-200" />
        <div className="p-6 text-center space-y-7 py-28">
            <p className="font-bold text-3xl uppercase">Scholarsip Entry</p>
            <div className="flex justify-center"><div className=" h-0.5 w-24 bg-black"/></div>
            {/* <form autoComplete="off" noValidate onSubmit={handleSubmit}> */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2"><input type="text" placeholder="Enter title" className="appearance-none block w-full bg-gray-200 text-gray-700 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"/></div>
                    <div className="relative bg-white overflow-hidden appearance-none block w-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600">
                    { scholars.file ?
                        <img className="object-contain h-full w-full cursor-pointer" src={scholars.file} alt="add new scholars" onClick={() => inputRef.current.click()} /> : <PlaceholderImg onClick={() => inputRef.current.click()} /> }
                        <input className="hidden" type="file" id="file" multiple={false} ref={inputRef} onChange={handleOpenedFile} />
                    </div>
                    <div className="h-full w-full space-y-4 text-left">
                        <textarea type="text" placeholder="Enter message" className="appearance-none block w-full bg-gray-200 text-gray-700 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"/>
                        <input type="text" placeholder="Enter some tags" onKeyDown={handleTagsEvent} className="appearance-none block w-full bg-gray-200 text-gray-700 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"/>
                            <div className="hidden">
                                <div className="absolute z-40 left-0 mt-2 w-full">
                                    <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                                        <div className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white" />
                                    </div>
                                </div>
                            </div>
                        { scholars.tags && scholars.tags.length && scholars.tags.map((tag, i) =>
                            <div key={i} className="bg-green-100 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden">
                                <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1" x-text="tag">{tag}</span>
                                <button className="w-6 h-8 inline-block align-middle text-gray-500 bg-green-200 focus:outline-none" onClick={() => deleteTagsItem(i)}>
                                    <svg className="w-6 h-6 fill-current mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fillRule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            {/* </form> */}
            <BtnPrimary label="Post" onClick={handleSubmit} />
        </div>
    </div>)}
    
export default App