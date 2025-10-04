# PixelPerfect Component Generator

A revolutionary multi-agent AI system that generates pixel-perfect React components from images, videos, and live URLs.

## 🎯 What Makes Us Different

Unlike existing tools that produce approximate copies, our system achieves **true pixel-perfect accuracy** through:

- **16 specialized AI agents** working in harmony
- **Iterative refinement loop** that improves until pixel-perfect
- **Multi-modal input support** (images, videos, URLs)
- **Advanced computer vision** for complex layouts and hierarchies
- **Animation extraction** from videos
- **Smart asset replacement** with licensing awareness

## 🚀 Features

### Image Mode
Drop any image of a UI component → Get pixel-perfect React component

### Video Mode  
Drop video of animated component → Get React component with Framer Motion animations

### URL Mode
Provide URL + highlight component → Get pixel-perfect copy of live website sections

## 🏗️ Architecture

This is a monorepo containing:

- `frontend/` - Next.js 14 application with Tailwind CSS
- `backend/` - Python FastAPI with multi-agent architecture
- `shared/` - Shared types and utilities
- `docs/` - Documentation and roadmaps

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- Tailwind CSS
- Shadcn/ui
- Framer Motion
- React Dropzone

### Backend
- Python FastAPI
- Multi-agent architecture
- Computer Vision (OpenCV, Detectron2)
- ML/AI (PyTorch, Transformers)
- Queue system (Celery)

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📋 Development Phases

- [x] **Phase 1**: Project setup and architecture
- [ ] **Phase 2**: MVP - Static image mode
- [ ] **Phase 3**: Quality assurance and refinement
- [ ] **Phase 4**: Asset and style enhancement
- [ ] **Phase 5**: Video mode
- [ ] **Phase 6**: URL mode
- [ ] **Phase 7**: Polish and distribution

## 🤖 Multi-Agent System

Our system uses 16 specialized AI agents:

1. **Orchestrator** - Central coordinator
2. **Vision** - Object detection
3. **Hierarchy** - DOM tree building
4. **AspectRatio** - Layout and sizing
5. **Asset** - Images, icons, logos
6. **Text** - Typography extraction
7. **Color** - Palette extraction
8. **Animation** - Motion detection
9. **Style** - Code generation
10. **CodeGen** - React component generation
11. **SandboxRenderer** - Visual testing
12. **Evaluator** - Quality assessment
13. **Refinement** - Iterative improvement
14. **FrameSelector** - Video processing
15. **Packaging** - Distribution
16. **Monitoring** - Telemetry

## 📊 Quality Metrics

- **Bounding Box IoU**: >0.8 (element positioning)
- **LPIPS**: <0.10 (perceptual similarity)
- **SSIM**: >0.9 (structural similarity)
- **Pixel Diff**: <5% (exact matching)

## 🎨 Use Cases

- Copy hero sections from Dribbble
- Recreate complex animations from videos
- Extract components from live websites
- Generate pixel-perfect cards, footers, navbars
- Create responsive components with exact spacing

## 📈 Roadmap

See [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for detailed development plan.

## 🤝 Contributing

This is a private project. Contact the maintainer for access.

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for pixel-perfect component generation**
