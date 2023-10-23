
import { db } from "@/lib/db"
import { Typography, Button } from "@mui/material" 

export default async function Home() {
  await db.set('hello', 'hello')
  return (
    <Button >
        hellouu
    </Button>
  )
}
