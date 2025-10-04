
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DetectedElement {
  id: string;
  type: 'card' | 'button' | 'text' | 'image' | 'icon' | 'container' | 'input' | 'other';
  bbox: BoundingBox;
  confidence: number;
  nesting?: {
    parent?: string;
    children: string[];
    zIndex: number;
  };
  attributes?: {
    text?: string;
    color?: string;
    backgroundColor?: string;
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
  };
}

export interface ComponentNode {
  id: string;
  type: string;
  props: Record<string, any>;
  bbox: BoundingBox;
  children: string[];
  parent?: string;
  zIndex: number;
  isRepeatable: boolean;
  aspectRatio?: number;
  relativeWidth?: number;
  relativeHeight?: number;
  responsiveRules?: ResponsiveRule[];
}

export interface ResponsiveRule {
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  properties: Record<string, any>;
}

export interface AssetObject {
  id: string;
  type: 'image' | 'icon' | 'logo' | 'svg';
  source: 'detected' | 'suggested' | 'replaced';
  url: string;
  originalUrl?: string;
  license?: string;
  confidence: number;
  replacement?: {
    name: string;
    library: string;
    url: string;
  };
}

export interface TextNode {
  id: string;
  content: string;
  bbox: BoundingBox;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
  gradients?: {
    type: 'linear' | 'radial';
    direction?: string;
    colors: string[];
    stops: number[];
  }[];
}

export interface AnimationSpec {
  nodeId: string;
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'custom';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration: number;
  delay: number;
  easing: string;
  keyframes?: {
    time: number;
    properties: Record<string, any>;
  }[];
  loop?: boolean;
  trigger?: 'hover' | 'click' | 'scroll' | 'load';
}

export interface StyleTokens {
  colors: ColorPalette;
  typography: {
    fontFamilies: Record<string, string>;
    fontSizes: Record<string, number>;
    fontWeights: Record<string, string>;
    lineHeights: Record<string, number>;
  };
  spacing: {
    padding: Record<string, number>;
    margin: Record<string, number>;
    gap: Record<string, number>;
  };
  borderRadius: Record<string, number>;
  shadows: Record<string, string>;
  breakpoints: Record<string, number>;
}

export interface GeneratedComponent {
  id: string;
  name: string;
  files: {
    component: string; // React component code
    styles?: string; // CSS/Tailwind styles
    types?: string; // TypeScript types
    package?: string; // package.json snippet
  };
  dependencies: string[];
  assets: AssetObject[];
  animations: AnimationSpec[];
  responsive: boolean;
  accessibility: {
    score: number;
    warnings: string[];
    recommendations: string[];
  };
}

export interface QualityMetrics {
  boundingBoxIoU: number;
  lpips: number;
  ssim: number;
  pixelDiff: number;
  animationTiming?: number;
  overallScore: number;
  passed: boolean;
}

export interface AgentResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metrics?: QualityMetrics;
  iteration: number;
  timestamp: Date;
}

export interface AgentConfig {
  name: string;
  enabled: boolean;
  priority: number;
  timeout: number;
  retries: number;
  dependencies: string[];
}

export interface TaskContext {
  taskId: string;
  userId?: string;
  input: {
    type: 'image' | 'video' | 'url';
    data: string | Buffer;
    metadata?: Record<string, any>;
  };
  output?: GeneratedComponent;
  metrics: QualityMetrics;
  iteration: number;
  maxIterations: number;
  agents: Record<string, AgentResult>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  type: 'image' | 'video' | 'url';
  data: string | Buffer;
  options?: {
    mode: 'pixel-perfect' | 'fast-approximate';
    includeAnimations?: boolean;
    responsive?: boolean;
    theme?: 'light' | 'dark' | 'auto';
    framework?: 'react' | 'vue' | 'angular';
  };
  metadata?: {
    originalUrl?: string;
    filename?: string;
    mimeType?: string;
    size?: number;
    componentSelector?: string;
  };
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  taskId?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
}
