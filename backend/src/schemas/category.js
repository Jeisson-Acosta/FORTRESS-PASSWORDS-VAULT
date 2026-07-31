import z from 'zod'

const createCategorySchema = z.object({
    catcod: z.string({ required_error: 'The parameter catcod is required' }),
    catnom: z.string({ required_error: 'The parameter catnom is required' }),
    usuid: z.number({ required_error: 'The parameter usuid is required' })
})

const updateCategorySchema = z.object({
    catid:  z.number({ required_error: 'The parameter catid is required' }),
    catcod: z.string().optional(),
    catnom: z.string().optional()
})

const deleleteCategorySchema = z.object({
    catid: z.string({ required_error: 'The parameter catid is required' }).transform(arg => Number(arg))
})

export function validateDataCreateCategory(data) {
    return createCategorySchema.safeParse(data)
}

export function validateDataUpdateCategory(data) {
    return updateCategorySchema.safeParse(data)
}

export function validateDataDeleteCategory(data) {
    return deleleteCategorySchema.safeParse(data)
}