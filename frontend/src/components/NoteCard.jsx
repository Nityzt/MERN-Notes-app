import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { toast } from 'react-hot-toast'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import '../Pages/HomePage.css'


const NoteCard = ({note, onDeleteSucess,className=""}) => {

    const handleDelete= async (e)=>{
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        else{
            try {
            await api.delete(`/notes/${note._id}`)
            toast.success("Note deleted!")

            onDeleteSucess(note._id);
        } catch (error) {
            toast.error("Error deleting note",error)
        }
        }
        
    }
  return (
    <Link to={`/note/${note._id}`} className={`card bg-amber-100 hover:shadow-lg transition-all duration-300 border-t-4 border-solid border-accent hover:scale-105 hover:bg-amber-200 max-w-80 sm:max-w-none md:max-w-none lg:max-w-none ${className} `}>
        <div className="card-body">
            <h2 className="card-title text-2xl font-bold">{note.title}</h2>
            <p className="text-gray-600 line-clamp-3 flex-wrap">{note.content.substring(0, 100)}...</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <button className='btn btn-ghost btn-sm hover:scale-105 transition-all '><PenSquareIcon className='size-5 text-accent' /></button>
                    <button className='btn btn-ghost btn-sm hover:scale-105 transition-all ' onClick={handleDelete}>
                        <Trash2Icon className='size-5 text-red-500 hover:text-red-700 transition-all duration-300' />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
