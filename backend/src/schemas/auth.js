import z from 'zod'

const registerUserAppSchema = z.object({
    usunom: z.string({ required_error: 'The parameter usunom is required' }),
    usuemail: z.email({ required_error: 'The parameter usuemail is required' }),
    usupwd: z.string({ required_error: 'The parameter usupwd is required' })
})

const loginUserAppSchema = z.object({
    usuemail: z.email({ required_error: 'The parameter usuemail is required' }),
    usupwd: z.string({ required_error: 'The parameter usupwd is required' })
})

export function validateDataRegisterUserApp(data) {
    return registerUserAppSchema.safeParse(data)
}

export function validateDataLoginUserApp(data) {
    return loginUserAppSchema.safeParse(data)
}