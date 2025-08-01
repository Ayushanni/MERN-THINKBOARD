import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import RateLimitedUI from '../components/RateLimitedUI'
import api from '../lib/axios.js'
import axios from 'axios'
import NotesNotFound from '../components/NotesNotFound.jsx'
import toast from 'react-hot-toast'


function HomePage() {
    const [isRateLimited,setIsRateLimited]=useState(false)
    const [notes, setNotes]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fetchNotes=async ()=>{
            try {
                // const res=await fetch("http://localhost:5001/api/notes")   //if using fetch
                // const data= await res.json()
                // console.log(data)

                const res = await api.get("/notes")
                console.log(res.data)
                setNotes(res.data);
                setIsRateLimited(false)
                
            } catch (error) {
                console.log("error fetching notes "+ error)
                if(error.res.status===429){
                    setIsRateLimited(true)
                }else{
                    toast.error("failed to load notes")
                }
                
            }finally{
                setLoading(false)
            }
        }
        fetchNotes();

    },[])

    return <div className='min-h-screen'>
        <Navbar/>
        {isRateLimited && <RateLimitedUI/>}
        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-center text-primary py-10'>Loading Notes.....</div>}
            {notes.length ===0 && !isRateLimited && !loading && <NotesNotFound/>}
            {notes.length >0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map(note=>(
                        <NoteCard key={note._id}  note={note}  setNotes={setNotes}/>
                    ))}
                </div>
            )}
        </div>
    </div>
        
    
}

export default HomePage
