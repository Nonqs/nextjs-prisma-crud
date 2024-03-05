"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NewPage({ params }) {

    console.log(params.id)

    const router = useRouter()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {

        if(params.id){

        fetch(`/api/tasks/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setDescription(data.description)
            })
        }
    }, [])

    const onSubmit = async (e) => {

        e.preventDefault()

        if (!params.id) {

            const res = await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)

        }else {
            
            
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)

        }

        router.push("/")
        router.refresh()

    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={onSubmit} className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2">
                <label htmlFor="title" className="font-bold text-sm">Titulo de la tarea</label>
                <input type="text" onChange={(e) => { setTitle(e.target.value) }} id="title" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Titulo" value={title} />

                <label htmlFor="description" className="font-bold text-sm">Descripcion de la tarea</label>
                <textarea id="description" onChange={(e) => { setDescription(e.target.value) }} rows="3" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Describe tu tarea..." value={description}></textarea>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">Crear</button>
                {params.id &&(
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded ms-4" type="button" onClick={async()=>{
                        const res = await fetch(`/api/tasks/${params.id}`, {
                            method: "DELETE"
                        })
                        router.push("/")
                        router.refresh()
                    }}>Borrar</button>
                )}
            </form>
        </div>
    )
}