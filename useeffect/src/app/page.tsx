"use client"
import { useEffect, useState } from "react"

function Page() {
  const [likes, setLikes] = useState(0)
  const [input, setInput] = useState("Nada")

  function Like() {
    setLikes((prevLikes) => prevLikes + 1)
  }

  useEffect(() => {
    console.log("Algo mudou.")
  })

  /*
    useEffect

    É chamado quando:
    - Qualquer estado for alterado;
    - Quando UM estado determinado for alterado;
    - Quando a tela carregar.
  */

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Interação com React</h1>
          <p className="text-gray-600 text-sm">Exemplo de useEffect</p>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-gray-800">{likes}</span>
          </div>
          <p className="text-gray-600 mb-4">
            Quantidade de likes: <span className="font-semibold">{likes}</span>
          </p>
          <button
            onClick={Like}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center mx-auto"
          >
            LIKE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
