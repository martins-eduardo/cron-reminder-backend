import cron from "node-cron"
import { prisma } from "../prisma"

export function startReminderCron() {
    cron.schedule('* * * * *', async () => {
        const now = new Date()

        const pending = await prisma.reminder.findMany({
            where: {
                sent: false,
                scheduledAt: {
                    lte: now
                }
            }
        })

        if (pending.length === 0) {
            console.log(`[CRON] ${now.toISOString()} - nenhum reminder pendente`)
            return
        }

        for (const reminder of pending) {
            console.log(`[CRON] Disparando reminder: ${reminder.title}`)

            await prisma.reminder.update({
                where: {
                    id: reminder.id
                },
                data: {
                    sent: true
                }
            })

            console.log("Cron job de reminders iniciado (roda a cada minuto)")
        }
    })
}