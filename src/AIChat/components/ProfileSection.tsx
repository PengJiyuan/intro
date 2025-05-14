import React, { useEffect, useState } from 'react';
import { Typography, Space, Avatar, Grid } from '@arco-design/web-react';

const { Text, Title, Paragraph } = Typography;
const { Row, Col } = Grid;

const ProfileSection: React.FC = () => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className={`profile-section transition-all duration-500 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      <Row className="mb-6">
        <Col span={24}>
          <div className="flex items-center">
            <Avatar size={80} className="mr-4 border-2 border-indigo-400">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="PengJiyuan" />
            </Avatar>
            <div>
              <Title heading={3} className="gradient-text m-0">PengJiyuan</Title>
              <Text className="text-gray-600 block">Senior Frontend Developer</Text>
              <Space className="mt-2">
                <div className="flex items-center text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-indigo-500">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg> San Francisco, CA
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-indigo-500">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg> pengjiyuan@example.com
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-indigo-500">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg> Available for hire
                </div>
              </Space>
            </div>
          </div>
        </Col>
      </Row>

      <div className="mb-6">
        <Title heading={5} className="mb-2 text-indigo-600">About Me</Title>
        <Paragraph className="text-gray-600">
          I'm a passionate frontend developer with 7+ years of experience creating 
          beautiful, responsive, and user-friendly web applications. I specialize in 
          React, TypeScript, and modern CSS frameworks. I love solving complex UI challenges 
          and creating delightful user experiences.
        </Paragraph>
      </div>

      <div className="mb-6">
        <Title heading={5} className="mb-3 text-indigo-600">Experience</Title>
        <div className="timeline">
          <div className="timeline-item">
            <Title heading={6} className="m-0 text-gray-800">Senior Frontend Developer</Title>
            <Text className="text-indigo-600 block">TechCorp Inc. • 2020 - Present</Text>
            <Text className="text-gray-600 text-sm">
              Led the development of the company's flagship SaaS product, improving performance by 40%.
              Mentored junior developers and implemented modern CI/CD practices.
            </Text>
          </div>
          
          <div className="timeline-item">
            <Title heading={6} className="m-0 text-gray-800">Frontend Developer</Title>
            <Text className="text-indigo-600 block">WebSolutions • 2017 - 2020</Text>
            <Text className="text-gray-600 text-sm">
              Developed responsive web applications for various clients using React and Redux.
              Collaborated with designers to implement pixel-perfect UIs.
            </Text>
          </div>
          
          <div className="timeline-item">
            <Title heading={6} className="m-0 text-gray-800">Junior Developer</Title>
            <Text className="text-indigo-600 block">StartupXYZ • 2015 - 2017</Text>
            <Text className="text-gray-600 text-sm">
              Built and maintained company website and internal tools.
              Learned modern JavaScript frameworks and best practices.
            </Text>
          </div>
        </div>
      </div>

      <div>
        <Title heading={5} className="mb-3 text-indigo-600">Education</Title>
        <div className="timeline">
          <div className="timeline-item">
            <Title heading={6} className="m-0 text-gray-800">M.S. Computer Science</Title>
            <Text className="text-indigo-600 block">Stanford University • 2013 - 2015</Text>
            <Text className="text-gray-600 text-sm">
              Specialized in Human-Computer Interaction and Web Technologies.
            </Text>
          </div>
          
          <div className="timeline-item">
            <Title heading={6} className="m-0 text-gray-800">B.S. Computer Science</Title>
            <Text className="text-indigo-600 block">MIT • 2009 - 2013</Text>
            <Text className="text-gray-600 text-sm">
              Graduated with honors. Minor in Digital Design.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
  