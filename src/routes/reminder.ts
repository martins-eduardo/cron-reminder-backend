import { Router } from "express"
import { prisma } from "../prisma"

export const reminderRouter = Router()

//Listar todos os lembretes
reminderRouter.get('/', async (req, res) => {
    const reminders = await prisma.reminder.findMany({
        orderBy: { scheduledAt: "asc"}
    })
    res.json(reminders)
})

reminderRouter.post('/create', async (req, res) => {
    const { title, scheduledAt } = req.body

    if ( !title || !scheduledAt) {
        return res.status(400).json({ error: "Title and scheduleAt are required!" })
    }

    const reminder = await prisma.reminder.create({
        data: {
            title, 
            scheduledAt: new Date(scheduledAt)
        }
    })

    res.status(200).json(reminder)
})

reminderRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)

    await prisma.reminder.delete({
        where: {
            id
        }
    })

    res.status(204).send()
})