import { ArrowLeft, MoveLeft, PlusIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import api from '../lib/axios'

const CreatePage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent]= useState('')
    const [loading, setLoading]= useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
    if(!title.trim() || !content.trim()){
        toast.error("Both title and content are required",{duration:1500});
        return;
    }
    setLoading(true)
    try {
        await api.post("/notes",{
            title,
            content
        })
        toast.success("Note created successfully!")
        navigate('/')
    } catch (error) {
        if(error.response.status === 429){
            toast.error("Slow down! You're creating notes too fast",
                {
                    duration:4000,
                    icon:'💀'
                }
            )
        }
        else{
        toast.error("Failed to create note", error)}
    }
    finally{
        setLoading(false);
    }
    }

  return (
    <div className='min-h-screen bg-black flex py-4 justify-center'  >
        <div className='w-full max-w-2xl max-h-xl px-4 '>
            <div className='max-w-2xl flex-col'>
                <Link to={'/'} className='btn btn-sm bg-black text-amber-300 hover:bg-amber-300 border-amber-300 hover:border-black gap-2 hover:scale-105 transition-all duration-300 hover:text-black mb-4'>
                <ArrowLeft className='size-4 '/> Back to Notes</Link>

                <div className='card bg-zinc-800 border-b border-base-content/10 '>
                    <div className='card-body '>
                        <h2 className='card-title text-2xl mb-2 text-accent '> Create New Note</h2>
                        <form onSubmit={handleSubmit}>
                        <div className='form-control mb-4 '>
                            <label className='label'>
                                <span className='label-text text-accent'>Title</span>
                                
                            </label>
                            <input 
                                type='text' 
                                placeholder='Note title' 
                                className='input input-bordered bg-amber-50' 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                />
                        </div>
                        <div className='form-control mb-4'>
                            <label className='label'>
                                <span className='label-text text-accent'>Content</span>
                                
                            </label>
                            <textarea 
                                
                                placeholder='Write your note here...' 
                                className='textarea textarea-bordered min-h-32 bg-amber-50 overflow-hidden' 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)} 
                                />
                        </div>

                    <div className="card-actions justify-end mt-8">
                        <button 
                            type='submit' 
                            className='btn bg-zinc-800 text-amber-300 hover:bg-amber-300 border-amber-300 hover:border-black gap-2 hover:scale-105 transition-all duration-300 hover:text-black ' 
                            disabled={loading}
                            // onClick={()=> {
                            //     loading ? toast.loading('Saving note...') : toast.success('Note created successfully!')}}
                                ><PlusIcon className='size-5 hover:animate-spin transition-all duration-500'/>
                            {loading ? 'Saving...': 'Create Note'}
                            
                        </button>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default CreatePage
