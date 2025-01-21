// components/Section.tsx
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-white mb-12">
          <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <div className={`${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};