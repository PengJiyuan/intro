import React, { useEffect, useState } from 'react';
import { Typography, Grid, Space } from '@arco-design/web-react';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillsSection: React.FC = () => {
  const [animateIn, setAnimateIn] = useState(false);
  const [skills] = useState<Skill[]>([
    { name: 'React', level: 95, category: 'frontend' },
    { name: 'TypeScript', level: 90, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'HTML5/CSS3', level: 90, category: 'frontend' },
    { name: 'Redux', level: 85, category: 'frontend' },
    { name: 'Next.js', level: 80, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
    { name: 'SCSS/SASS', level: 80, category: 'frontend' },
    { name: 'Node.js', level: 75, category: 'backend' },
    { name: 'Express', level: 70, category: 'backend' },
    { name: 'GraphQL', level: 75, category: 'backend' },
    { name: 'MongoDB', level: 65, category: 'backend' },
    { name: 'Jest', level: 80, category: 'testing' },
    { name: 'Cypress', level: 75, category: 'testing' },
    { name: 'Git', level: 90, category: 'tools' },
    { name: 'Webpack', level: 75, category: 'tools' },
    { name: 'Docker', level: 65, category: 'tools' },
    { name: 'CI/CD', level: 70, category: 'tools' },
  ]);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const testingSkills = skills.filter(skill => skill.category === 'testing');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');

  const renderSkills = (skillsToRender: Skill[]) => {
    return skillsToRender.map((skill, index) => (
      <div key={index} className="mb-3">
        <div className="flex justify-between mb-1">
          <Text className="text-gray-700">{skill.name}</Text>
          <Text className="text-indigo-600">{skill.level}%</Text>
        </div>
        <div className="skill-progress">
          <div 
            className="skill-progress-bar" 
            style={{ 
              width: animateIn ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 100}ms`
            }}
          ></div>
        </div>
      </div>
    ));
  };

  return (
    <div className={`skills-section transition-all duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      <Title heading={4} className="gradient-text mb-6">Technical Skills</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="mb-6">
            <Title heading={5} className="mb-4 text-indigo-600">Frontend Development</Title>
            {renderSkills(frontendSkills)}
          </div>
          
          <div>
            <Title heading={5} className="mb-4 text-indigo-600">Testing</Title>
            {renderSkills(testingSkills)}
          </div>
        </Col>
        
        <Col xs={24} md={12}>
          <div className="mb-6">
            <Title heading={5} className="mb-4 text-indigo-600">Backend Development</Title>
            {renderSkills(backendSkills)}
          </div>
          
          <div>
            <Title heading={5} className="mb-4 text-indigo-600">Tools & DevOps</Title>
            {renderSkills(toolsSkills)}
          </div>
        </Col>
      </Row>
      
      <div className="mt-8">
        <Title heading={5} className="mb-4 text-indigo-600">Other Skills</Title>
        <Space wrap size="large">
          {['UI/UX Design', 'Responsive Design', 'Performance Optimization', 'Accessibility', 'SEO', 'Agile/Scrum', 'Technical Writing', 'Mentoring'].map((skill, index) => (
            <div 
              key={index} 
              className="skill-tag px-3 py-1 rounded-full text-sm text-indigo-600"
            >
              {skill}
            </div>
          ))}
        </Space>
      </div>
      
      <div className="mt-8">
        <Title heading={5} className="mb-4 text-indigo-600">Languages</Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div className="bg-white shadow-sm p-3 rounded-lg text-center">
              <Text className="text-gray-800 block">English</Text>
              <Text className="text-indigo-600">Native</Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="bg-white shadow-sm p-3 rounded-lg text-center">
              <Text className="text-gray-800 block">Spanish</Text>
              <Text className="text-indigo-600">Fluent</Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="bg-white shadow-sm p-3 rounded-lg text-center">
              <Text className="text-gray-800 block">French</Text>
              <Text className="text-indigo-600">Basic</Text>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SkillsSection;
  