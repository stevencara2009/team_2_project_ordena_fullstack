import { useState, useEffect, useCallback } from "react"
import { getComments, createComment } from "../services/commentService"

export const useComments = () => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true)
      setComments(await getComments())
    } catch {
      setError("No se pudieron cargar los comentarios")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchComments() }, [fetchComments])

  const addComment = async (payload) => {
    await createComment(payload)
    await fetchComments() // recarga la lista
  }

  return { comments, loading, error, addComment }
}