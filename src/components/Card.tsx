// components/Card.tsx
interface CardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
  }
  
  export const Card: React.FC<CardProps> = ({ title, description, children }) => {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 m-4 w-80 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        {children}
      </div>
    );
  };