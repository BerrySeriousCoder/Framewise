import { Router } from 'express';
import multer from 'multer';
import { componentController } from '../controllers/componentController';
import { validateInput } from '../middleware/validation';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,video/mp4,video/webm').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  }
});

router.post('/generate/image', upload.single('image'), validateInput, componentController.generateFromImage);
router.post('/generate/video', upload.single('video'), validateInput, componentController.generateFromVideo);
router.post('/generate/url', validateInput, componentController.generateFromUrl);

router.get('/task/:taskId', componentController.getTaskStatus);
router.get('/task/:taskId/result', componentController.getTaskResult);
router.delete('/task/:taskId', componentController.cancelTask);

router.get('/components', componentController.listComponents);
router.get('/components/:id', componentController.getComponent);
router.delete('/components/:id', componentController.deleteComponent);

router.get('/preview/:taskId', componentController.previewComponent);
router.get('/preview/:taskId/screenshot', componentController.getScreenshot);

router.get('/metrics/:taskId', componentController.getQualityMetrics);
router.post('/feedback/:taskId', componentController.submitFeedback);

export default router;
