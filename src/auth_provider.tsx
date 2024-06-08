import { createContext, useEffect, useState } from "react"
import { supabase } from "./supabase"
import { Session } from "@supabase/supabase-js"

const initialState = { session: null, user: null}
export const AuthContext = createContext(initialState)

export default function AuthProvider({children}) {
  const [session, setSession] = useState<Session|null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
    return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
}
    
