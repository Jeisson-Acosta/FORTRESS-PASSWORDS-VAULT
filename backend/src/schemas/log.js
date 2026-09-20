import z from 'zod'

const getLogsSchema = z.object({
    usuid: z.string({ required_error: 'The parameter usuid is required' }).transform(val => Number(val))
})

export function validateDataGetLogs(data) {
    return getLogsSchema.safeParse(data)
}
