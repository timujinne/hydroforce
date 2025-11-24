export interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  stats?: { label: string; value: string }[];
  bgImage: string;
  overlayType?: 'dark' | 'light' | 'gradient' | 'normal';
  buttons?: { label: string; link: string; type: 'primary' | 'secondary' }[];
}

export interface FeatureItem {
  title: string;
  description: string;
  listItems?: string[];
}
