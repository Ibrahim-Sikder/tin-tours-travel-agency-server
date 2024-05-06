import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export const validateRequest = (Schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await Schema.safeParseAsync(req.body)
    if (!result.success) {
      next(result.error)
    } else {
      req.body = result.data
      next()
    }
  }
}
