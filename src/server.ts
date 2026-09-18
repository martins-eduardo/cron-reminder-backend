import express from "express"
import cors from "cors"
import "dotenv/config"
import { reminderRouter } from "./routes/reminder"
import { startReminderCron } from "./jobs/check-reminders"

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({status: 'ok'})
})

app.use('/reminder', reminderRouter)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    startReminderCron()
})