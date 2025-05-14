import React from 'react';
import { Typography, Grid, Button, Space } from '@arco-design/web-react';

const { Title, Text, Paragraph } = Typography;
const { Row, Col } = Grid;

const ContactSection: React.FC = () => {
  return (
    <div className="contact-section">
      <Title heading={4} className="gradient-text mb-6">Get In Touch</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="bg-white shadow-sm p-6 rounded-lg h-full">
            <Title heading={5} className="text-indigo-600 mb-4">Contact Information</Title>
            
            <div className="mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-3">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <div>
                <Text className="text-gray-500 block text-sm">Email</Text>
                <Text className="text-gray-800">john.doe@example.com</Text>
              </div>
            </div>
            
            <div className="mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-3">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <Text className="text-gray-500 block text-sm">Location</Text>
                <Text className="text-gray-800">San Francisco, California</Text>
              </div>
            </div>
            
            <div className="mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 mr-3">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <div>
                <Text className="text-gray-500 block text-sm">Website</Text>
                <Text className="text-gray-800">www.johndoe.dev</Text>
              </div>
            </div>
            
            <Title heading={6} className="text-gray-800 mb-3">Connect With Me</Title>
            <Space size="large">
              <Button 
                type="secondary" 
                shape="circle" 
                size="large"
                className="social-icon text-gray-600"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                }
              />
              <Button 
                type="secondary" 
                shape="circle" 
                size="large"
                className="social-icon text-gray-600"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                }
              />
              <Button 
                type="secondary" 
                shape="circle" 
                size="large"
                className="social-icon text-gray-600"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                }
              />
            </Space>
          </div>
        </Col>
        
        <Col xs={24} md={12}>
          <div className="bg-white shadow-sm p-6 rounded-lg h-full">
            <Title heading={5} className="text-indigo-600 mb-4">Send Me a Message</Title>
            <Paragraph className="text-gray-600 mb-4">
              I'm currently open to freelance opportunities and interesting projects. 
              Feel free to reach out if you'd like to collaborate!
            </Paragraph>
            
            <Button 
              type="primary" 
              size="large" 
              className="w-full contact-button"
              style={{
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                border: 'none'
              }}
            >
              Schedule a Call
            </Button>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Title heading={6} className="text-gray-800 mb-3">Availability</Title>
              <div className="flex items-center justify-between mb-2">
                <Text className="text-gray-600">Response Time:</Text>
                <Text className="text-indigo-600">Within 24 hours</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-gray-600">Available for:</Text>
                <Text className="text-indigo-600">Freelance, Full-time</Text>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      
      <div className="mt-8 bg-white shadow-sm p-6 rounded-lg text-center">
        <Title heading={5} className="text-gray-800 mb-3">Looking for a skilled frontend developer?</Title>
        <Paragraph className="text-gray-600 mb-4">
          I'm passionate about creating beautiful, responsive, and user-friendly web applications.
          Let's build something amazing together!
        </Paragraph>
        <Button 
          type="primary" 
          size="large"
          className="hover-scale"
          style={{
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            border: 'none'
          }}
        >
          Download Resume
        </Button>
      </div>
    </div>
  );
};

export default ContactSection;
  