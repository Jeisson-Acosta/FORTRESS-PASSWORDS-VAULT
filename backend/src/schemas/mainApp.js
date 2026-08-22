import z from 'zod'

const createAppSchema = z.object({
    connom: z.string({ required_error: 'The parameter connom is required' }),
    conusuario: z.string({ required_error: 'The parameter conusuario is required' }),
    conpwd: z.string({ required_error: 'The parameter conpwd is required' }),
    connom_icon: z.string({ required_error: 'The parameter connom_icon is required' }),
    usuid: z.int({ required_error: 'The parameter usuid is required' }),
    catid: z.int({ required_error: 'The parameter catid is required' }),
})

const updateAppSchema = z.object({
    conid: z.int({ required_error: 'The parameter conid is required' }),
    connom: z.string().optional(),
    conusuario: z.string().optional(),
    conpwd: z.string().optional(),
    connom_icon: z.string().optional(),
    usuid: z.int().optional(),
    catid: z.int().optional(),
})

const deleteAppSchema = z.object({
    conid: z.int({ required_error: 'The parameter conid is required' }),
})

const getInfoVaultOptionSchema = z.object({
    usuid: z.string({ required_error: 'The parameter usuid is required' }).transform(id => Number(id))
})

export function validateDataCreateApp(data) {
    return createAppSchema.safeParse(data)
}

export function validateDataUpdateApp(data) {
    return updateAppSchema.safeParse(data)
}

export function validateDataDeleteAp(data) {
    return deleteAppSchema.safeParse(data)
}

export function validateDataGetInfoVaultOption(data) {
    return getInfoVaultOptionSchema.safeParse(data)
}