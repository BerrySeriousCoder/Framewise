import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { APIResponse } from '../types';

const imageUploadSchema = Joi.object({
  mode: Joi.string().valid('pixel-perfect', 'fast-approximate').default('pixel-perfect'),
  includeAnimations: Joi.boolean().default(false),
  responsive: Joi.boolean().default(true),
  theme: Joi.string().valid('light', 'dark', 'auto').default('auto'),
  framework: Joi.string().valid('react', 'vue', 'angular').default('react')
});

const videoUploadSchema = Joi.object({
  mode: Joi.string().valid('pixel-perfect', 'fast-approximate').default('pixel-perfect'),
  includeAnimations: Joi.boolean().default(true),
  responsive: Joi.boolean().default(true),
  theme: Joi.string().valid('light', 'dark', 'auto').default('auto'),
  framework: Joi.string().valid('react', 'vue', 'angular').default('react')
});

const urlProcessingSchema = Joi.object({
  url: Joi.string().uri().required(),
  componentSelector: Joi.string().optional(),
  options: Joi.object({
    mode: Joi.string().valid('pixel-perfect', 'fast-approximate').default('pixel-perfect'),
    includeAnimations: Joi.boolean().default(false),
    responsive: Joi.boolean().default(true),
    theme: Joi.string().valid('light', 'dark', 'auto').default('auto'),
    framework: Joi.string().valid('react', 'vue', 'angular').default('react')
  }).optional()
});

const feedbackSchema = Joi.object({
  feedback: Joi.string().min(10).max(1000).required(),
  rating: Joi.number().min(1).max(5).optional(),
  improvements: Joi.array().items(Joi.string()).optional()
});

export const validateInput = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      const response: APIResponse = {
        success: false,
        error: 'ValidationError',
        message: error.details[0].message
      };
      res.status(400).json(response);
      return;
    }
    
    req.body = value;
    next();
  };
};

export const validateImageUpload = validateInput(imageUploadSchema);
export const validateVideoUpload = validateInput(videoUploadSchema);
export const validateUrlProcessing = validateInput(urlProcessingSchema);
export const validateFeedback = validateInput(feedbackSchema);


export const validate = (schema: Joi.ObjectSchema) => validateInput(schema);
