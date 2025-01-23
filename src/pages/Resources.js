import React, { useState } from 'react';
import './Resources.css';

const ResourceCard = ({
  title,
  description,
  links,
  onCardClick,
  isExpanded,
}) => (
  <div
    className={`resource-card ${isExpanded ? 'expanded' : ''}`}
    onClick={onCardClick}
  >
    <div className="card-header">
      <h2>{title}</h2>
      <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
    </div>
    <div className="card-content">
      <p>{description}</p>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                if (link.action) {
                  e.preventDefault();
                  link.action();
                }
              }}
              className={link.type || 'default'}
            >
              {link.icon && <span className="icon">{link.icon}</span>}
              <span className="link-text">{link.text}</span>
              {link.badge && <span className="badge">{link.badge}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Resources = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const resourceSections = [
    {
      id: 1,
      title: 'AWS Learning Resources',
      description:
        'Comprehensive learning resources for Amazon Web Services (AWS)',
      category: 'aws',
      links: [
        {
          text: 'AWS Skill Builder',
          url: 'https://explore.skillbuilder.aws',
          icon: '🎓',
          type: 'primary',
          badge: 'Free',
        },
        {
          text: 'AWS Documentation',
          url: 'https://docs.aws.amazon.com',
          icon: '📚',
          type: 'technical',
        },
        {
          text: 'AWS Training and Certification',
          url: 'https://aws.amazon.com/training',
          icon: '📜',
          type: 'certification',
          badge: 'Official',
        },
        {
          text: 'AWS Workshops',
          url: 'https://workshops.aws',
          icon: '🛠️',
          type: 'interactive',
        },
        {
          text: 'AWS Well-Architected',
          url: 'https://aws.amazon.com/architecture/well-architected',
          icon: '🏗️',
          type: 'technical',
        },
      ],
    },
    {
      id: 2,
      title: 'Google Cloud Platform',
      description:
        'Learning resources and documentation for Google Cloud Platform (GCP)',
      category: 'google',
      links: [
        {
          text: 'Google Cloud Skills Boost',
          url: 'https://www.cloudskillsboost.google',
          icon: '🎯',
          type: 'primary',
          badge: 'Interactive',
        },
        {
          text: 'Google Cloud Documentation',
          url: 'https://cloud.google.com/docs',
          icon: '📚',
          type: 'technical',
        },
        {
          text: 'Google Cloud Certification',
          url: 'https://cloud.google.com/certification',
          icon: '📜',
          type: 'certification',
        },
        {
          text: 'Google Cloud Codelabs',
          url: 'https://codelabs.developers.google.com',
          icon: '💻',
          type: 'interactive',
          badge: 'Hands-on',
        },
      ],
    },
    {
      id: 3,
      title: 'Microsoft Azure',
      description: 'Resources for learning Microsoft Azure cloud platform',
      category: 'azure',
      links: [
        {
          text: 'Microsoft Learn',
          url: 'https://learn.microsoft.com/azure',
          icon: '📚',
          type: 'primary',
          badge: 'Free',
        },
        {
          text: 'Azure Documentation',
          url: 'https://docs.microsoft.com/azure',
          icon: '📖',
          type: 'technical',
        },
        {
          text: 'Azure Certifications',
          url: 'https://learn.microsoft.com/certifications',
          icon: '📜',
          type: 'certification',
        },
        {
          text: 'Azure Architecture Center',
          url: 'https://learn.microsoft.com/azure/architecture',
          icon: '🏗️',
          type: 'technical',
        },
      ],
    },
    {
      id: 4,
      title: 'Cloud Architecture & Best Practices',
      description: 'Learn cloud architecture patterns and best practices',
      category: 'architecture',
      links: [
        {
          text: 'Cloud Design Patterns',
          url: 'https://learn.microsoft.com/azure/architecture/patterns',
          icon: '🎨',
          type: 'technical',
        },
        {
          text: 'AWS Architecture Center',
          url: 'https://aws.amazon.com/architecture',
          icon: '🏗️',
          type: 'technical',
        },
        {
          text: 'Google Cloud Architecture Framework',
          url: 'https://cloud.google.com/architecture/framework',
          icon: '📐',
          type: 'technical',
        },
      ],
    },
    {
      id: 5,
      title: 'DevOps & Cloud Native',
      description:
        'Resources for DevOps practices and cloud-native development',
      category: 'devops',
      links: [
        {
          text: 'CNCF Landscape',
          url: 'https://landscape.cncf.io',
          icon: '🌐',
          type: 'technical',
          badge: 'Essential',
        },
        {
          text: 'Kubernetes Documentation',
          url: 'https://kubernetes.io/docs',
          icon: '⚓',
          type: 'technical',
        },
        {
          text: 'DevOps Roadmap',
          url: 'https://roadmap.sh/devops',
          icon: '🗺️',
          type: 'learning',
        },
      ],
    },
    {
      id: 6,
      title: 'Cloud Security',
      description:
        'Security best practices and learning resources for cloud computing',
      category: 'security',
      links: [
        {
          text: 'AWS Security Best Practices',
          url: 'https://aws.amazon.com/security/security-learning',
          icon: '🔒',
          type: 'technical',
        },
        {
          text: 'Google Cloud Security',
          url: 'https://cloud.google.com/security',
          icon: '🛡️',
          type: 'technical',
        },
        {
          text: 'Azure Security Center',
          url: 'https://azure.microsoft.com/services/security-center',
          icon: '🔐',
          type: 'technical',
        },
      ],
    },
    {
      id: 7,
      title: 'Cloud Cost Optimization',
      description: 'Learn how to optimize cloud costs and manage budgets',
      category: 'cost',
      links: [
        {
          text: 'AWS Cost Management',
          url: 'https://aws.amazon.com/aws-cost-management',
          icon: '💰',
          type: 'technical',
        },
        {
          text: 'GCP Cost Optimization',
          url: 'https://cloud.google.com/cost-management',
          icon: '💵',
          type: 'technical',
        },
        {
          text: 'Azure Cost Management',
          url: 'https://azure.microsoft.com/services/cost-management',
          icon: '📊',
          type: 'technical',
        },
      ],
    },
    {
      id: 8,
      title: 'Community Resources',
      description: 'Community-driven resources and learning platforms',
      category: 'community',
      links: [
        {
          text: 'freeCodeCamp Cloud Courses',
          url: 'https://www.freecodecamp.org/news/tag/cloud',
          icon: '🎓',
          type: 'learning',
          badge: 'Free',
        },
        {
          text: 'Cloud Native Computing Foundation',
          url: 'https://www.cncf.io',
          icon: '☁️',
          type: 'community',
        },
        {
          text: 'Dev.to Cloud Articles',
          url: 'https://dev.to/t/cloud',
          icon: '📝',
          type: 'article',
        },
      ],
    },
  ];

  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'aws', label: 'AWS' },
    { id: 'google', label: 'Google Cloud' },
    { id: 'azure', label: 'Azure' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'devops', label: 'DevOps' },
    { id: 'security', label: 'Security' },
    { id: 'cost', label: 'Cost Management' },
    { id: 'community', label: 'Community' },
  ];

  const filteredResources = resourceSections.filter((section) => {
    const matchesSearch =
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.links.some((link) =>
        link.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesFilter =
      activeFilter === 'all' || section.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1>Cloud Learning Resources</h1>
        {/*<p className="subtitle">
          Comprehensive guides, tutorials, and documentation for cloud platforms
        </p>*/}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-tab ${
                activeFilter === filter.id ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map((section) => (
          <ResourceCard
            key={section.id}
            {...section}
            isExpanded={expandedCard === section.id}
            onCardClick={() =>
              setExpandedCard(expandedCard === section.id ? null : section.id)
            }
          />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="no-results">
          <p>No resources found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
