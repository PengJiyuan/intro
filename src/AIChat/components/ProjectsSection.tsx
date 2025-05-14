import React, { useState } from 'react';
import { Typography, Grid, Button, Space } from '@arco-design/web-react';

const { Title, Text, Paragraph } = Typography;
const { Row, Col } = Grid;

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

const ProjectsSection: React.FC = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "AI-Powered Dashboard",
      description: "A responsive dashboard with real-time data visualization, AI-powered insights, and customizable widgets. Built with React, TypeScript, and D3.js.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "TypeScript", "D3.js", "AI", "Redux"],
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product catalog, shopping cart, payment processing, and admin dashboard. Built with Next.js and GraphQL.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "GraphQL", "Stripe", "Tailwind CSS"],
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      id: 3,
      title: "Social Media App",
      description: "A social media application with real-time chat, post sharing, and user profiles. Built with React, Firebase, and WebSockets.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Firebase", "WebSockets", "Redux"],
      links: {
        demo: "#",
        github: "#"
      }
    }
  ]);

  return (
    <div className="projects-section">
      <Title heading={4} className="gradient-text mb-6">Featured Projects</Title>
      
      <Row gutter={[24, 24]}>
        {projects.map((project) => (
          <Col key={project.id} xs={24} md={24}>
            <div className="project-card rounded-lg overflow-hidden p-4 shadow-sm">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <div className="project-image h-full">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover rounded-lg"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                </Col>
                <Col xs={24} md={16}>
                  <Title heading={5} className="text-gray-800 mb-2">{project.title}</Title>
                  <Paragraph className="text-gray-600 mb-3">
                    {project.description}
                  </Paragraph>
                  
                  <Space wrap className="mb-4">
                    {project.tags.map((tag, index) => (
                      <Text 
                        key={index} 
                        className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </Text>
                    ))}
                  </Space>
                  
                  <Space>
                    {project.links.demo && (
                      <Button 
                        type="outline" 
                        className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" x2="21" y1="14" y2="3"></line>
                        </svg> Live Demo
                      </Button>
                    )}
                    {project.links.github && (
                      <Button 
                        type="outline" 
                        className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg> Source Code
                      </Button>
                    )}
                    <Button 
                      type="outline" 
                      className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg> Case Study
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
      
      <div className="mt-8 text-center">
        <Title heading={5} className="text-indigo-600 mb-4">Other Notable Projects</Title>
        <Row gutter={[16, 16]}>
          {[
            "Weather App with Geolocation",
            "Task Management System",
            "Portfolio Website Generator",
            "Browser-based Code Editor",
            "Real-time Collaborative Whiteboard",
            "Cryptocurrency Price Tracker"
          ].map((project, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <div className="bg-white shadow-sm p-4 rounded-lg h-full hover:bg-indigo-50 transition-colors">
                <Text className="text-gray-800 block">{project}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProjectsSection;
  