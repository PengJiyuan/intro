import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button, Card, Typography, Space, Input } from '@arco-design/web-react';
import { 
  IconUser, 
  IconRobot, 
  IconGithub, 
  IconTwitter, 
  IconCodepen
} from '@arco-design/web-react/icon';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import './index.css';

const { Text, Title } = Typography;
const { TextArea } = Input;

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: React.ReactNode;
  delay?: number;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>('intro');
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('');
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Introduction messages sequence
  const introMessages: Message[] = [
    {
      id: 1,
      type: 'ai',
      content: (
        <div>
          <Text className="text-lg font-medium text-gray-800">👋 Hello! I'm <span className="gradient-text font-bold">AI Assistant</span></Text>
          <Text className="block mt-2 text-gray-700">Welcome to John Doe's interactive portfolio. I'll be your guide today.</Text>
        </div>
      ),
      delay: 1000
    },
    {
      id: 2,
      type: 'ai',
      content: (
        <div>
          <Text className="block text-gray-700">What would you like to know about John?</Text>
          <div className="flex flex-wrap gap-2 mt-3">
            <Button type="outline" size="small" className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" onClick={() => handleSectionChange('profile')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg> Profile
            </Button>
            <Button type="outline" size="small" className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" onClick={() => handleSectionChange('skills')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg> Skills
            </Button>
            <Button type="outline" size="small" className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" onClick={() => handleSectionChange('projects')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg> Projects
            </Button>
            <Button type="outline" size="small" className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" onClick={() => handleSectionChange('contact')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg> Contact
            </Button>
          </div>
        </div>
      ),
      delay: 2000
    }
  ];

  // Handle mouse movement for glow effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (chatContainerRef.current) {
      const rect = chatContainerRef.current.getBoundingClientRect();
      setGlowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial messages load
  useEffect(() => {
    loadMessages(introMessages);
  }, []);

  // Load messages with typing animation
  const loadMessages = (messagesToLoad: Message[]) => {
    let delay = 0;
    
    messagesToLoad.forEach((message) => {
      delay += message.delay || 1000;
      
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, message]);
        }, 1500);
      }, delay);
    });
  };

  // Check if all sections have been viewed
  const allSectionsViewed = () => {
    return ['profile', 'skills', 'projects', 'contact'].every(section => 
      viewedSections.has(section)
    );
  };

  // Handle section change
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    
    // Add section to viewed sections
    const updatedViewedSections = new Set(viewedSections);
    updatedViewedSections.add(section);
    setViewedSections(updatedViewedSections);
    
    // Add user selection message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: `Show me your ${section}`
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // After delay, show the section content
    setTimeout(() => {
      setIsTyping(false);
      
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: getSectionContent(section)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Add the navigation options again after showing the section
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          
          // Check if all sections have been viewed
          if (updatedViewedSections.size === 4) {
            // Show conclusion message if all sections have been viewed
            const conclusionMessage: Message = {
              id: Date.now() + 2,
              type: 'ai',
              content: (
                <div>
                  <Text className="block text-gray-700 mb-3">
                    Great! You've explored all sections of John's portfolio. I hope you found the information helpful.
                  </Text>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <Title heading={6} className="text-indigo-600 mb-2">Would you like to:</Title>
                    <Space direction="vertical" className="w-full">
                      <Button 
                        type="outline" 
                        className="w-full text-left justify-start hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600"
                        onClick={() => handleContactAction('schedule')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg> Schedule a meeting with John
                      </Button>
                      <Button 
                        type="outline" 
                        className="w-full text-left justify-start hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600"
                        onClick={() => handleContactAction('download')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg> Download John's resume
                      </Button>
                      <Button 
                        type="outline" 
                        className="w-full text-left justify-start hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600"
                        onClick={() => handleContactAction('email')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg> Send an email to John
                      </Button>
                      <Button 
                        type="primary" 
                        className="w-full text-left justify-start hover-scale"
                        style={{
                          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                          border: 'none'
                        }}
                        onClick={() => handleRestart()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                          <path d="M3 3v5h5"></path>
                        </svg> Start over
                      </Button>
                    </Space>
                  </div>
                </div>
              )
            };
            
            setMessages(prev => [...prev, conclusionMessage]);
          } else {
            // Show remaining sections if not all have been viewed
            const remainingSections = ['profile', 'skills', 'projects', 'contact'].filter(
              s => !updatedViewedSections.has(s)
            );
            
            const navigationMessage: Message = {
              id: Date.now() + 2,
              type: 'ai',
              content: (
                <div>
                  <Text className="block text-gray-700">What else would you like to know?</Text>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {remainingSections.includes('profile') && (
                      <Button 
                        type="outline" 
                        size="small" 
                        className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                        onClick={() => handleSectionChange('profile')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg> Profile
                      </Button>
                    )}
                    {remainingSections.includes('skills') && (
                      <Button 
                        type="outline" 
                        size="small" 
                        className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                        onClick={() => handleSectionChange('skills')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                        </svg> Skills
                      </Button>
                    )}
                    {remainingSections.includes('projects') && (
                      <Button 
                        type="outline" 
                        size="small" 
                        className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                        onClick={() => handleSectionChange('projects')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg> Projects
                      </Button>
                    )}
                    {remainingSections.includes('contact') && (
                      <Button 
                        type="outline" 
                        size="small" 
                        className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                        onClick={() => handleSectionChange('contact')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg> Contact
                      </Button>
                    )}
                  </div>
                </div>
              )
            };
            
            setMessages(prev => [...prev, navigationMessage]);
          }
        }, 1500);
      }, 1000);
    }, 1500);
  };

  // Handle contact actions
  const handleContactAction = (action: string) => {
    let userMessage: Message;
    let aiResponse: Message;

    switch(action) {
      case 'schedule':
        userMessage = {
          id: Date.now(),
          type: 'user',
          content: "I'd like to schedule a meeting with John"
        };
        
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: (
            <div>
              <Text className="block text-gray-700 mb-3">
                Great! John would be happy to meet with you. Please use the calendar link below to find a time that works for you.
              </Text>
              <Button 
                type="primary" 
                className="hover-scale"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  border: 'none'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg> Open Scheduling Calendar
              </Button>
            </div>
          )
        };
        break;
        
      case 'download':
        userMessage = {
          id: Date.now(),
          type: 'user',
          content: "I'd like to download John's resume"
        };
        
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: (
            <div>
              <Text className="block text-gray-700 mb-3">
                Here's John's resume for download. It includes more details about his experience and qualifications.
              </Text>
              <Button 
                type="primary" 
                className="hover-scale"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  border: 'none'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg> Download Resume (PDF)
              </Button>
            </div>
          )
        };
        break;
        
      case 'email':
        userMessage = {
          id: Date.now(),
          type: 'user',
          content: "I'd like to send an email to John"
        };
        
        aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: (
            <div>
              <Text className="block text-gray-700 mb-3">
                You can reach John directly at john.doe@example.com or use the button below to compose an email.
              </Text>
              <Button 
                type="primary" 
                className="hover-scale"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  border: 'none'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg> Compose Email
              </Button>
            </div>
          )
        };
        break;
        
      default:
        return;
    }
    
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // After delay, show AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  // Handle restart
  const handleRestart = () => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: "Let's start over"
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // After delay, reset and show intro messages
    setTimeout(() => {
      setIsTyping(false);
      setMessages([]);
      setViewedSections(new Set());
      setCurrentSection('intro');
      
      // Load intro messages again
      loadMessages(introMessages);
    }, 1500);
  };

  // Handle input change
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // After delay, show AI response
    setTimeout(() => {
      setIsTyping(false);
      
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: (
          <div>
            <Text className="block text-gray-700">
              Thanks for your message! I'm an AI assistant showcasing John's portfolio. 
              Please use the buttons below to navigate through different sections.
            </Text>
            <div className="flex flex-wrap gap-2 mt-3">
              {!viewedSections.has('profile') && (
                <Button 
                  type="outline" 
                  size="small" 
                  className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                  onClick={() => handleSectionChange('profile')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg> Profile
                </Button>
              )}
              {!viewedSections.has('skills') && (
                <Button 
                  type="outline" 
                  size="small" 
                  className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                  onClick={() => handleSectionChange('skills')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                  </svg> Skills
                </Button>
              )}
              {!viewedSections.has('projects') && (
                <Button 
                  type="outline" 
                  size="small" 
                  className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                  onClick={() => handleSectionChange('projects')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg> Projects
                </Button>
              )}
              {!viewedSections.has('contact') && (
                <Button 
                  type="outline" 
                  size="small" 
                  className="hover-scale text-indigo-600 border-indigo-300 hover:border-indigo-600" 
                  onClick={() => handleSectionChange('contact')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg> Contact
                </Button>
              )}
              {allSectionsViewed() && (
                <Button 
                  type="primary" 
                  size="small" 
                  className="hover-scale"
                  style={{
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                    border: 'none'
                  }}
                  onClick={() => handleRestart()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg> Start over
                </Button>
              )}
            </div>
          </div>
        )
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  // Get content based on selected section
  const getSectionContent = (section: string) => {
    switch(section) {
      case 'profile':
        return <ProfileSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <Text className="text-gray-700">I'm not sure what you're looking for. Please select one of the options.</Text>;
    }
  };

  return (
    <Card
      className="chat-container w-full max-w-4xl rounded-xl overflow-hidden relative"
      bordered={false}
      ref={chatContainerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect that follows cursor */}
      <div 
        className="glow-effect" 
        style={{ 
          left: `${glowPosition.x - 75}px`, 
          top: `${glowPosition.y - 75}px` 
        }}
      />
      
      {/* Chat header */}
      <div className="chat-header flex items-center justify-between p-4 rounded-t-xl">
        <div className="flex items-center">
          <Avatar className="bg-gradient-to-r from-indigo-500 to-purple-500 pulse">
            <IconRobot />
          </Avatar>
          <div className="ml-3 text-left">
            <Title heading={5} className="m-0 text-gray-800">John Doe's Portfolio AI</Title>
            <Text className="text-xs text-gray-500">Interactive Experience</Text>
          </div>
        </div>
        <Space>
          <Button 
            type="secondary" 
            icon={<IconGithub />} 
            shape="circle" 
            className="social-icon text-gray-600"
          />
          <Button 
            type="secondary" 
            icon={<IconTwitter />} 
            shape="circle" 
            className="social-icon text-gray-600"
          />
          <Button 
            type="secondary" 
            icon={<IconCodepen />} 
            shape="circle" 
            className="social-icon text-gray-600"
          />
        </Space>
      </div>
      
      {/* Chat messages */}
      <div className="chat-messages p-4 h-[500px] overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            type={message.type} 
            content={message.content} 
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat footer */}
      <div className="chat-footer p-4 rounded-b-xl">
        <div className="flex items-center">
          <div className="flex-1 relative">
            <TextArea 
              className="chat-input pr-12 py-2 rounded-full resize-none"
              placeholder="Ask me anything about John..."
              style={{ height: '44px', paddingRight: '50px' }}
              value={inputValue}
              onChange={handleInputChange}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              type="primary" 
              shape="circle" 
              className="chat-send-button absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={handleSendMessage}
              style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;
  