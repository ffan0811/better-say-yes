// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


Deno.serve(async (req) => {
  const { contentId, tableName } = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  
  const { data, error } = await supabase.rpc('list_objects', {
    bucketid: contentName,
    prefix: '',
    limit: 20,
    offset: 0,
  });

  if(error) {
    return new Response({message: "Failed to fetch images"}, {
      headers: { 'Content-Type': 'application/json' },
      status: 500, 
    })
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})