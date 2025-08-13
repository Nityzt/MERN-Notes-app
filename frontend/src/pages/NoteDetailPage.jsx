import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import {ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";
import { Link } from "react-router";

const NoteDetailPage =  (onDeleteSucess) => {
    const [note,setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=> {
      const fetchNote = async()=>{
        try {
          const res = await api.get(`/notes/${id}`)
          setNote(res.data)
          
        } catch (error) {
          console.log("Error in fetching note",error)
          toast.error('Failed to fetch the note',
           {id: 'failed'} 
          )
        }
        finally{
          setLoading(false);
        }
      };
      fetchNote();

    }, [id]);

    
    console.log({note})

    const handleDelete= async (e)=>{
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        else{
            try {
            await api.delete(`/notes/${note._id}`)
            navigate('/')
            toast.success("Note deleted!")

            onDeleteSucess(note._id);
        } catch (error) {
          if(error.response)
            toast.error("Error deleting note",error)
        }
        }
        
    }
    
    const handleSave = async ()=>{
      if(!note.title.trim() || !note.content.trim()){
      if(!note.title.trim() && !note.content.trim()){
        toast.error("Title and Content Missing!",{
          duration:2000
        })
        
      }
      else if(!note.content.trim()){
        toast.error("Content Missing!",{
          duration:2000
        })
       
      }
      else{
        toast.error("Title Missing!",
          {
            duration:2000,
          }
        )
        
      }
      return;
    }

    setSaving(true)

      try {
        await api.put(`/notes/${note._id}`,note)
        toast.success("Note updated!");
        navigate("/")
      } catch (error) 
    {
      toast.error("Failed to update note",error)
    }
      finally{
        setSaving(false);
            }
    }

    if(loading){
      return( <div className="min-h-screen bg-black flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>)
    }

    return <div className="min-h-screen bg-black" >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
        <div className="flex items-center justify-between mb-6">
          <Link to={'/'} className='btn bg-black text-amber-300 hover:bg-amber-300 border-amber-300 hover:border-black gap-2 hover:scale-105 transition-all duration-300 hover:text-black '>
          <ArrowLeftIcon className="h-5 w-5"/>
          Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn bg-black text-red-500 hover:bg-red-500 border-red-500 hover:border-black gap-2 hover:scale-105 transition-all duration-300 hover:text-black">
            <Trash2Icon className="h-5 w-5"/>
            Delete Note
          </button>
        
        
        </div>
        <div className="card bg-amber-100  border-amber-300 border-t-4 ">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
              type="text"
              placeholder="Note title"
              className="input input-bordered"
              value = {note.title}
              onChange={(e) => setNote({ ...note, title:e.target.value})}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
              
              placeholder="Write your note here..."
              className="textarea textarea-bordered"
              value = {note.content}
              onChange={(e) => setNote({ ...note, content:e.target.value})}
              />
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-outline hover:scale-105" disabled={saving} onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
}

export default NoteDetailPage
