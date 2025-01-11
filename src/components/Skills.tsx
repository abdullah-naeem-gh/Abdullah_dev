import { Card } from "./Card";
import { Section } from "./Section";

// components/Skills.tsx
export const Skills: React.FC = () => {
    const skills = [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Tailwind CSS"]
      },
      // Add more skill categories
    ];
  
    return (
      <Section title="Skills">
        {skills.map((skillGroup, index) => (
          <Card
            key={index}
            title={skillGroup.category}
            description="Technologies I work with"
          >
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-white text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </Section>
    );
  };