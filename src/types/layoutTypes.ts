export interface LayoutProps {
  canSearch?: boolean;
  onSearch?: (query: string) => void;
  children: React.ReactNode;
}
