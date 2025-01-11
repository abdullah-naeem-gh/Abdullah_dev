// components/Section.tsx
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-white mb-12 relative">
        <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {children}
      </div>
    </div>
  );
};