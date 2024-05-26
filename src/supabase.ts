import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dugucugnitwyfcshjvdk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Z3VjdWduaXR3eWZjc2hqdmRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1MTIyOTcsImV4cCI6MjAyNjA4ODI5N30.EPMY5V8s-5P4DzKlHU6daQPNv1LtH0HLlT_EemuhnzM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
