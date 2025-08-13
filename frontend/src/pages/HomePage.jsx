import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import { toast } from 'react-hot-toast'
import { LoaderCircle }  from 'lucide-react';
import NoteCard from '../components/NoteCard';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './HomePage.css'

gsap.registerPlugin(useGSAP);


const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const gridRef= useRef();

    const handleDelete =  (id)=>{
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    }
    useEffect(()=>{
        const fetchNotes= async()=>{
            try {
                const res = await api.get("/notes");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error fetching notes:", error);
            
                if (error.response.status === 429) {
                    setIsRateLimited(true);
                    toast.error("Slow down!",{
                        duration: 3000,
                        position: 'top-center',
                        id: 'slow'
                    })
                } else {
                    toast.error("Failed to fetch notes. Please try again later.");
                }
                
            }
            finally{
                setLoading(false);
                
                
            }
        }
        fetchNotes();
    },[]
)

// useEffect(() => {
//   if (!loading && notes.length > 0) {
//     const ctx = gsap.context(() => {
//       gsap.to(
//         ".note-card-hidden",
//          // initial state
//         {
//           opacity: 1,
//           y:0,
//           transform:"translateY(0px)",
//           stagger: 0.1,
//           duration: 0.2,
//           ease: "power2.in"
//         }
//       );
//     }, gridRef,"<+0.1");
//     return () => ctx.revert();
//   }
// }, [loading,notes]);


      return (

    <div className="min-h-screen bg-black">
        
      <Navbar/>

      {isRateLimited && <RateLimitedUI/>}
      <div className='max-w-7xl mx-auto p-4 overflow-x-hidden'>
              {loading && <div className='text-center text-accent py-10'></div>}

              {notes.length === 0 && !isRateLimited && !loading && <div className='text-center text-accent py-10'>No Notes Yet
                </div>}

              {notes.length >0 && !isRateLimited && !loading && (
                <div ref={gridRef}
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center p-4'>

                    {notes.map((note) => (
                    <NoteCard key={note._id} note={note} onDeleteSucess={handleDelete} className="note-card-hidden"/>  
                    ))}
                </div> 
              )}
      </div>
      
    </div>
  )
}

export default HomePage
