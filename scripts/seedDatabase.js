import 'dotenv/config';
import mongoose from 'mongoose';
import Question from '../models/Question.js';
import Recommendation from '../models/Recommendation.js';

mongoose.connect(process.env.MONGODB_URI);

const questions = [
  {
    questionId: 'Q1_CEO',
    role: 'C-Suite',
    text: 'How would you rate your bank\'s overall AI strategy on a scale of 1-5?',
    type: 'single-choice',
    options: ['1', '2', '3', '4', '5'],
    category: 'Strategy',
    weight: 1.0,
    scoreRange: '1-2: Behind, 3-4: On Track, 5: Ahead'
  },
  {
    questionId: 'Q2_CEO',
    role: 'C-Suite',
    text: 'Has your bank allocated a specific budget for AI initiatives?',
    type: 'single-choice',
    options: ['No', 'Yes, but limited', 'Yes, significant'],
    category: 'Budget',
    weight: 0.8,
    scoreRange: 'No: Behind, Yes, but limited: On Track, Yes, significant: Ahead',
  },
  {
    questionId: 'Q3_CEO',
    role: 'C-Suite',
    text: 'How often do you discuss AI initiatives in board meetings?',
    type: 'single-choice',
    options: ['Never', 'Rarely', 'Occasionally', 'Frequently', 'Always'],
    category: 'Strategy',
    weight: 0.7,
    scoreRange: 'Never-Rarely: Behind, Occasionally: On track, Frequently-Always: Ahead',
   },
  {
    questionId: 'Q4_CEO',
    role: 'C-Suite',
    text: 'Do you have a clear roadmap for AI implementation across different departments?',
    type: 'single-choice',
    options: ['No', 'In Progress', 'Yes, comprehensive'],
    category: 'Strategy',
    weight: 0.9,
    scoreRange: 'No: Behind, In Progress: On track, Yes, comprehensive: Ahead',
},
  {
    questionId: 'Q5_CEO',
    role: 'C-Suite',
    text: 'How would you rate your understanding of the potential risks and benefits of AI in banking?',
    type: 'single-choice',
    options: ['1', '2', '3', '4', '5'],
    category: 'Strategy',
    weight: 0.8,
    scoreRange: '1-2: Behind, 3-4: On Track, 5: Ahead',
},
  {
    questionId: 'Q6_CEO',
    role: 'C-Suite',
    text: 'Have you established an AI ethics committee or similar oversight body?',
    type: 'single-choice',
    options: ['No', 'In Development', 'Yes, active'],
    category: 'Ethics',
    weight: 0.8, 
    scoreRange: 'No: Behind, Planning to: On track, Yes, active: Ahead',
},
  {
    questionId: 'Q7_CEO',
    role: 'C-Suite',
    text: 'How do you ensure alignment between AI initiatives and overall bank strategy?',
    type: 'open-ended',
    category: 'Strategy',
    weight: 0.9,
    scoreRange: 'No clear process: Behind, Some alignment efforts: On track, Systematic alignment: Ahead',
},
  {
    questionId: 'Q1_IT',
    role: 'IT and Data Science',
    text: 'In which areas has your bank implemented AI solutions?',
    type: 'open-ended',
    category: 'Use-cases',
    weight: 0.8,
    scoreRange: '0-1 area: Behind, 2-3 areas: On Track, 4+ areas: Ahead'
  },
  {
    questionId: 'Q2_IT',
    role: 'IT and Data Science',
    text: 'How would you rate the quality and accessibility of your bank\'s data for AI training?',
    type: 'single-choice',
    options: ['1', '2', '3', '4', '5'],
    category: 'Data Quality',
    weight: 0.9,
    scoreRange: '1-2: Behind, 3-4: On Track, 5: Ahead'
  },
  {
    questionId: 'Q3_IT',
    role: 'IT and Data Science',
    text: 'How do you ensure the explainability of AI models, especially in critical areas like credit scoring?',
    type: 'open-ended',
    category: 'Ethics',
    weight: 0.8,
    scoreRange: 'No measures: Behind, Basic measures: On Track, Advanced measures: Ahead',
  },
  {
    questionId: 'Q4_IT',
    role: 'IT and Data Science',
    text: 'What measures do you have in place to protect personal identifiable information (PII) when training AI models?',
    type: 'open-ended',
    category: 'Ethics',
    weight: 0.9,
    scoreRange: 'Basic encryption: Behind, Encryption + anonymization: On Track, Advanced measures: Ahead',
  },
  {
    questionId: 'Q5_IT',
    role: 'IT and Data Science',
    text: 'How often do you conduct security audits on AI systems?',
    type: 'single-choice',
    options: ['Annually or less', 'Quarterly', 'Monthly or more'],
    category: 'Audit',
    weight: 0.8,
    scoreRange: 'Annually or less: Behind, Quarterly: On track, Monthly or more: Ahead',
  },
  {
    questionId: 'Q6_IT',
    role: 'IT and Data Science',
    text: 'Do you have processes in place to monitor and mitigate AI bias?',
    type: 'single-choice',
    options: ['No', 'In Development', 'Yes, active'],
    category: 'Ethics',
    weight: 0.8,
    scoreRange: 'No: Behind, In Development: On track, Yes, comprehensive: Ahead',
  },
  {
    questionId: 'Q1_Risk',
    role: 'Risk and Compliance',
    text: 'How confident are you in your bank\'s ability to comply with data protection regulations (e.g., GDPR) when using AI?',
    type: 'single-choice',
    options: ['1', '2', '3', '4', '5'],
    category: 'Compliance',
    weight: 0.9,
    scoreRange: '1-2: Behind, 3-4: On Track, 5: Ahead'
  },
  {
    questionId: 'Q2_Risk',
    role: 'Risk and Compliance',
    text: 'Do you have a documented process for conducting Privacy Impact Assessments (PIAs) for AI systems?',
    type: 'single-choice',
    options: ['No', 'In Development', 'Yes, active'],
    category: 'Compliance',
    weight: 0.8,
    scoreRange: 'No: Behind, In Development: On track, Yes, comprehensive: Ahead',
  },
  {
    questionId: 'Q3_Risk',
    role: 'Risk and Compliance',
    text: 'How do you ensure transparency in AI-driven decision-making processes, especially for customer-facing applications?',
    type: 'open-ended',
    category: 'Ethics',
    weight: 0.8,
    scoreRange: 'Limited transparency: Behind, Some measures: On track, Comprehensive approach: Ahead',
  },
  {
    questionId: 'Q4_Risk',
    role: 'Risk and Compliance',
    text: 'Have you established clear guidelines for the ethical use of AI in your bank?',
    type: 'single-choice',
    options: ['No', 'In Development', 'Yes, active'],
    category: 'Ethics',
    weight: 0.9,
    scoreRange: 'No: Behind, In Progress: On track, Yes, comprehensive: Ahead',
  },
  {
    questionId: 'Q5_Risk',
    role: 'Risk and Compliance',
    text: 'How do you monitor and ensure compliance with AI-related regulations?',
    type: 'open-ended',
    category: 'Ethics',
    weight: 0.9,
    scoreRange: 'Manual processes: Behind, Some automation: On track, Advanced monitoring: Ahead',
  },
  {
    questionId: 'Q1_HR',
    role: 'Human Resources Manager',
    text: 'What percentage of your staff has received training on AI technologies and their implications?',
    type: 'single-choice',
    options: ['Less than 20%', '20-60%', 'More than 60%'],
    category: 'Training',
    weight: 0.8,
    scoreRange: 'Less than 20%: Behind, 20-60%: On Track, More than 60%: Ahead'
  },
  {
    questionId: 'Q2_HR',
    role: 'Human Resources Manager',
    text: 'Do you have a strategy to attract and retain AI talent?',
    type: 'single-choice',
    options: ['No', 'Basic strategy', 'Comprehensive strategy'],
    category: 'Talent Management',
    weight: 0.9,
    scoreRange: 'No: Behind, Basic strategy: On track, Comprehensive strategy: Ahead',
  },
  {
    questionId: 'Q3_HR',
    role: 'Human Resources Manager',
    text: 'How do you assess the AI literacy of new hires, especially for technical positions?',
    type: 'open-ended',
    category: 'Recruitment',
    weight: 0.7,
    scoreRange: 'No assessment: Behind, Basic assessment: On track, Advanced assessment: Ahead',
  },
  {
    questionId: 'Q4_HR',
    role: 'Human Resource Manager',
    text: 'Have you developed training programs to help employees adapt to AI-driven changes in their roles?',
    type: 'single-choice',
    options: ['No', 'In Development', 'Yes, active'],
    category: 'Training',
    weight: 0.8,
    scoreRange: 'No: Behind, In development: On track, Yes, comprehensive: Ahead',
  },
  {
    questionId: 'Q5_HR',
    role: 'Human Resources Manager',
    text: 'How do you address employee concerns about job displacement due to AI?',
    type: 'open-ended',
    category: 'Change Management',
    weight: 0.7,
    scoreRange: 'No clear approach: Behind, Some measures: On track, Comprehensive strategy: Ahead',
  },
  {
    questionId: 'Q1_Customer',
    role: 'Customer Service Team',
    text: 'To what extent has AI been integrated into your customer service operations?',
    type: 'single-choice',
    options: ['1', '2', '3', '4', '5'],
    category: 'Customer Experience',
    weight: 0.8,
    scoreRange: '1: Behind, 2-3: On Track, 4-5: Ahead'
  },
  {
    questionId: 'Q2_Customer',
    role: 'Customer Service Team',
    text: 'What types of AI-powered customer service tools are you currently using?',
    type: 'open-ended',
    category: 'Customer Experience',
    weight: 0.7,
    scoreRange: '0-1 tool: Behind, 2-3 tools: On Track, 4+ tools: Ahead',
  },  
  {
    questionId: 'Q3_Customer',
    role: 'Customer Service Team',
    text: 'How do you measure the impact of AI on customer satisfaction?',
    type: 'open-ended',
    category: 'Customer Service',
    weight: 0.8,
    scoreRange: 'No clear metrics: Behind, Basic metrics: On track, Advanced analytics: Ahead',
  },
  {
    questionId: 'Q4_Customer',
    role: 'Customer Service Team',
    text: 'Do you have a process for handling customer complaints or concerns related to AI-driven decisions?',
    type: 'single-choice',
    options: ['No', 'Basic process', 'Comprehensive process'],
    category: 'Customer Experience',
    weight: 0.9,
    scoreRange: 'No: Behind, Basic process: On track, Comprehensive process: Ahead',
  },
  {
    questionId: 'Q5_Customer',
    role: 'Customer Service Team',
    text: 'How do you ensure that AI-powered customer interactions align with your bank\'s brand voice and values?',
    type: 'open-ended',
    category: 'Customer Service',
    weight: 0.7,
    scoreRange: 'No measures: Behind, Some measures: On track, Comprehensive approach: Ahead',
  },
  {
    questionId: 'Q1_Marketing',
    role: 'Marketing Manager',
    text: 'To what extent are you using AI for personalized marketing campaigns?',
    type: 'single-choice',
    options: ['1', '2', '3', '4', '5'],
    category: 'Personalization',
    weight: 0.8,
    scoreRange: '1: Behind, 2-3: On Track, 4-5: Ahead'
  },
  {
    questionId: 'Q2_Marketing',
    role: 'Marketing Manager',
    text: 'What types of customer data are you collecting and analyzing for AI-driven marketing?',
    type: 'open-ended',
    category: 'Data Usage',
    weight: 0.7,
    scoreRange: 'Basic demographic data: Behind, Behavioral data: On Track, Comprehensive data: Ahead',
  },
  {
    questionId: 'Q3_Marketing',
    role: 'Marketing Manager',
    text: 'To what extent are you using AI for personalized marketing campaigns?',
    type: 'single-choice',
    options: ['Basic metrics', 'Advanced metrics', 'AI-powered analytics'],
    category: 'Performance Measurement',
    weight: 0.8,
    scoreRange: 'Basic metrics: Behind, Advanced metrics: On Track, AI-powered analytics: Ahead',
  },
  {
    questionId: 'Q4_Marketing',
    role: 'Marketing Manager',
    text: 'Do you have a system in place for customers to opt-out of AI-driven marketing?',
    type: 'single-choice',
    options: ['No', 'Basic system', 'Advanced system'],
    category: 'Ethics',
    weight: 0.9,
    scoreRange: 'No system: Behind, Basic system: On Track, Advanced system: Ahead',
  },
  {
    questionId: 'Q5_Marketing',
    role: 'Marketing Manager',
    text: 'How do you ensure that AI-driven marketing campaigns comply with regulations like GDPR?',
    type: 'open-ended',
    category: 'Compliance',
    weight: 0.9,
    scoreRange: 'Manual checks: Behind, Some automated processes: On Track, Fully integrated compliance: Ahead',
  },
  {
    questionId: 'Q1_Cyber',
    role: 'Cybersecurity Manager',
    text: 'How would you rate your bank\'s current AI-powered cybersecurity measures?',
    type: 'single-choice',
    options: ['1', '2', '3', '4', '5'],
    category: 'Cybersecurity',
    weight: 0.9,
    scoreRange: '1-2: Behind, 3-4: On Track, 5: Ahead'
  },
  {
    questionId: 'Q2_Cyber',
    role: 'Cybersecurity Manager',
    text: 'What types of AI technologies are you using for fraud detection and prevention?',
    type: 'open-ended',
    category: 'Fraud Prevention',
    weight: 0.8,
    scoreRange: 'Basic rule-based systems: Behind, ML models: On Track, Advanced AI systems: Ahead',
  },
{
    questionId: 'Q3_Cyber',
    role: 'Cybersecurity Manager',
    text: 'How do you assess the potential risks and vulnerabilities of AI-powered cybersecurity systems?',
    type: 'open-ended',
    category: 'Risk Assessment',
    weight: 0.8,
    scoreRange: 'Manual assessment: Behind, Semi-automated: On Track, AI-driven assessment: Ahead',
},
{
    questionId: 'Q4_Cyber',
    role: 'Cybersecurity Manager',
    text: 'How often do you update and retrain your AI models for cybersecurity?',
    type: 'single-choice',
    options: ['Annually or less', 'Quarterly', 'Monthly or more'],
    category: 'Model Maintenance',
    weight: 0.7,
    scoreRange: 'Annually or less: Behind, Quarterly: On Track, Monthly or more: Ahead'
},
{
    questionId: 'Q5_Cyber',
    role: 'Cybersecurity Manager',
    text: 'Do you have protocols in place to detect and respond to potential AI system breaches?',
    type: 'single-choice',
    options: ['No specific protocols', 'Basic protocols', 'Advanced protocols'],
    category: 'Incident Response',
    weight: 0.9,
    scoreRange: 'No specific protocols: Behind, Basic protocols: On Track, Advanced protocols: Ahead',
},
{
    questionId: 'Q6_Cyber',
    role: 'Cybersecurity Manager',
    text: 'How do you ensure the security of AI models and the data they use?',
    type: 'open-ended',
    category: 'Cybersecurity',
    weight: 0.9,
    scoreRange: 'Basic measures: Behind, Advanced measures: On Track, State-of-the-art: Ahead',
},
];

const recommendations = [
  {
    questionId: 'Q1_CEO',
    role: 'C-Suite',
    recommendations: {
        behind: "Develop a comprehensive AI strategy immediately. Form an AI taskforce to create an implementation roadmap. Prioritize cybersecurity and fraud detection for initial AI projects to form customer trust, and then proceed to other areas for AI implementation. Educate board members on AI's potential in banking.",
        onTrack: "Refine your AI strategy to align with bank goals. Establish an AI ethics committee. Stay informed about AI advancements and adjust your strategy accordingly.",
        ahead: "Explore advanced AI applications in predictive analytics and personalized financial advice. Continuously improve AI governance and invest in cutting-edge research to maintain your competitive edge."
      }
  },
  {
    questionId: 'Q2_CEO',
    role: 'C-Suite',
    recommendations: {
        behind: "Conduct a cost-benefit analysis of potential AI projects. Reallocate funds from less critical areas. Present a clear use case to the board, highlighting AI's ROI and competitive advantages.",
        onTrack: "Prioritize high-impact AI projects. Gradually increase the budget as you demonstrate successful implementations. Explore cloud-based AI services to maximize budget impact.",
        ahead: "Invest in both short-term implementations and long-term research. You could establish an AI innovation lab. Allocate resources for continuous staff training. Regularly showcase tangible benefits to justify the high investment."
      }
  },
  {
    questionId: 'Q3_CEO',
    role: 'C-Suite',
    recommendations: {
        behind: "Make AI a regular board meeting agenda item. Organize AI awareness workshops for board members. Form a dedicated AI oversight committee at the board level.",
        onTrack: "Provide detailed updates on ongoing AI projects and their impact. Encourage board members to actively shape the AI strategy. Arrange AI application demos for the board.",
        ahead: "Invite external AI experts for fresh perspectives. Ensure discussions cover ethical considerations and potential regulatory changes."
      }
  },
  {
    questionId: 'Q4_CEO',
    role: 'C-Suite',
    recommendations: {
        behind: "Assess each department's AI potential. Create a phased implementation plan, starting with pilot projects. Involve department heads to ensure alignment with departmental goals.",
        onTrack: "Set clear milestones and KPIs for each implementation phase. Create cross-functional AI teams to facilitate knowledge sharing. Regularly review and adjust the roadmap based on project outcomes.",
        ahead: "Establish a governance structure to oversee roadmap execution. Develop a communication strategy for all stakeholders. Create an AI Center of Excellence to drive innovation and ensure consistent practices."
    }
  },
  {
    questionId: 'Q5_CEO',
    role: 'C-Suite',
    recommendations: {
        behind: "Attend executive education programs on AI in banking. Join AI-focused banking consortiums. Schedule regular briefings with your AI and risk management teams.",
        onTrack: "Deepen knowledge in AI ethics and regulatory implications. Engage with AI vendors to understand latest developments. Implement mentoring programs to share AI knowledge across the bank.",
        ahead: "Leverage your knowledge to drive innovation and strategic decisions. Participate in regulatory discussions shaping AI governance in finance. Author thought leadership pieces to establish your bank as an AI leader."
      }
  },
  {
    questionId: 'Q6_CEO',
    role: 'C-Suite',
    recommendations: {
        behind: "Form a diverse AI ethics working group. Develop a committee charter outlining its mandate and authority. Engage external ethics experts for guidance.",
        onTrack: "Finalize the committee structure with diverse expertise. Develop clear guidelines for ethical AI development. Establish processes for the committee to review AI projects.",
        ahead: "Empower the committee to drive ethical considerations across all AI initiatives. Publish your AI ethics principles. Explore advanced topics like AI fairness metrics and algorithmic auditing."
    }
  },
  {
    questionId: 'Q7_CEO',
    role: 'C-Suite',
    recommendations: {
        behind: "Map current AI projects to specific bank's objectives. Develop an evaluation framework for new AI initiatives based on strategic fit. Appoint an AI strategy officer to oversee alignment.",
        onTrack: "Develop KPIs linking AI project outcomes to strategic goals. Implement regular review sessions with AI teams. Create cross-functional teams for major AI initiatives.",
        ahead: "Implement advanced portfolio management for AI projects. Conduct AI-focused scenario planning exercises. Establish an external AI advisory board for fresh strategic perspectives."
     }
  },
  {
    questionId: 'Q1_IT',
    role: 'IT and Data Science',
    recommendations: {
        behind: "Prioritize AI implementation in fraud detection. Develop a roadmap for expanding AI use cases.",
        onTrack: "Expand AI use to credit scoring and AML. Evaluate the performance of existing AI solutions. Identify opportunities for AI in risk management and operational efficiency.",
        ahead: "Explore advanced AI applications in predictive analytics and personalized financial advice. Implement AI for process automation across departments. Share success stories and best practices within the industry."
      }
  },
  {
    questionId: 'Q2_IT',
    role: 'IT and Data Science',
    recommendations: {
        behind: "Implement a data quality management system. Centralize data from disparate sources. Invest in data cleaning and standardization tools.",
        onTrack: "Enhance data governance practices. Implement advanced data validation checks. Develop a data catalog for easy discovery and access.",
        ahead: "Implement real-time data quality monitoring. Explore synthetic data generation for enhanced AI training. Establish a data science team dedicated to maintaining high-quality datasets."
      }
  },
  {
    questionId: 'Q3_IT',
    role: 'IT and Data Science',
    recommendations: {
        behind: "Implement SHAP (SHapley Additive exPlanations) values for model interpretation. Use simple, interpretable models for critical decisions. Develop a process for human review of AI decisions.",
        onTrack: "Implement LIME (Local Interpretable Model-agnostic Explanations) alongside SHAP. Create detailed documentation of model logic and decision processes. Establish an AI explainability review board.",
        ahead: "Develop custom explainability tools tailored to your AI models. Implement counterfactual explanations for customer-facing decisions. Contribute to industry standards for AI explainability in banking."
      }
  },
  {
    questionId: 'Q4_IT',
    role: 'IT and Data Science',
    recommendations: {
        behind: "Implement robust data encryption at rest and in transit. Use data masking techniques for sensitive information. Establish strict access controls for AI training data.",
        onTrack: "Implement advanced data anonymization techniques. Use differential privacy in AI model training. Regularly audit data access and usage in AI systems.",
        ahead: "Implement homomorphic encryption for AI training on encrypted data. Use federated learning to keep sensitive data decentralized. Develop AI models that can work with minimal personal data."
    }
  },
  {
    questionId: 'Q5_IT',
    role: 'IT and Data Science',
    recommendations: {
        behind: "Implement quarterly security audits for AI systems. Develop an AI-specific security framework. Train IT staff on AI security best practices.",
        onTrack: "Increase audit frequency for critical AI systems. Implement continuous monitoring tools for AI security. Conduct regular penetration testing on AI models.",
        ahead: "Implement real-time security monitoring for AI systems. Develop AI models for anomaly detection in system security. Contribute to industry standards for AI security in banking."
    }
},
{
    questionId: 'Q6_IT',
    role: 'IT and Data Science',
    recommendations: {
        behind: "Implement basic bias detection tools in AI model development. Train developers on recognizing and mitigating AI bias. Establish guidelines for diverse and representative training data.",
        onTrack: "Implement advanced bias detection and mitigation tools. Establish a diverse AI ethics review board. Regularly test AI models for various types of bias.",
        ahead: "Develop custom AI bias mitigation techniques. Implement continuous bias monitoring in production AI systems. Contribute to research and industry standards on fair AI in finance."
    }
    },
{
    questionId: 'Q1_Risk',
    role: 'Risk and Compliance',
    recommendations: {
        behind: "Conduct a thorough AI compliance audit. Implement a data protection impact assessment (DPIA) process for AI projects. Train staff on data protection regulations relevant to AI.",
        onTrack: "Enhance documentation of AI data processing activities. Implement privacy-by-design principles in AI development. Regularly update AI compliance policies to reflect regulatory changes.",
        ahead: "Implement advanced consent management for AI data processing. Develop AI-powered compliance monitoring tools. Engage with regulators to shape AI governance in banking."
      }
},
{
    questionId: 'Q2_Risk',
    role: 'Risk and Compliance',
    recommendations: {
        behind: "Develop a PIA template specific to AI systems. Train risk and compliance staff on conducting PIAs for AI. Implement a process to integrate PIA results into AI development.",
        onTrack: "Enhance PIA processes with AI-specific risk factors. Automate parts of the PIA process using AI tools. Regularly review and update PIA methodologies.",
        ahead: "Implement continuous privacy risk monitoring for AI systems. Develop AI models to assist in privacy risk assessment. Share PIA best practices with the industry."
      }
},
{
    questionId: 'Q3_Risk',
    role: 'Risk and Compliance',
    recommendations: {
        behind: "Implement basic explainable AI techniques. Develop clear communication protocols for AI-driven decisions. Train customer service staff on explaining AI decisions.",
        onTrack: "Enhance model interpretability using advanced techniques like SHAP and LIME. Implement a customer-facing portal for AI decision explanations. Regularly audit AI decision processes for transparency.",
        ahead: "Develop custom transparency tools for complex AI models. Implement real-time explanation generation for AI decisions. Contribute to industry standards for AI transparency in banking."
      }
},
{
    questionId: 'Q4_Risk',
    role: 'Risk and Compliance',
    recommendations: {
        behind: "Develop a basic AI ethics framework. Establish an AI ethics committee. Train staff on ethical considerations in AI use.",
        onTrack: "Enhance AI ethics guidelines with industry-specific considerations. Implement an AI ethics review process for all AI projects. Regularly update ethics guidelines based on emerging issues.",
        ahead: "Develop advanced AI ethics assessment tools. Implement continuous ethical monitoring of AI systems. Engage in shaping global AI ethics standards for banking."
      }
},
{
    questionId: 'Q5_Risk',
    role: 'Risk and Compliance',
    recommendations: {
        behind: "Implement a systematic process for tracking AI-related regulations. Develop an AI compliance checklist. Assign dedicated staff to monitor AI regulatory developments.",
        onTrack: "Implement semi-automated compliance monitoring tools. Develop AI-specific compliance KPIs. Regularly conduct AI compliance audits.",
        ahead: "Implement AI-powered regulatory monitoring and compliance tools. Develop predictive models for upcoming AI regulations. Engage proactively with regulators on AI governance."
      }
},
{
    questionId: 'Q1_HR',
    role: 'Human Resources Manager',
    recommendations: {
        behind: "Develop a basic AI awareness program for all staff. Prioritize training for teams directly involved with AI projects. Partner with online learning platforms for scalable AI education.",
        onTrack: "Expand AI training to cover more advanced topics. Implement role-specific AI training modules. Encourage staff to obtain AI certifications.",
        ahead: "Develop a comprehensive AI curriculum for different job roles. Implement an AI mentorship program. Collaborate with universities on AI education programs for employees."
      }
},
{
    questionId: 'Q2_HR',
    role: 'Human Resources Manager',
    recommendations: {
        behind: "Develop partnerships with universities for AI talent recruitment. Create AI-focused job descriptions and career paths. Offer competitive compensation packages for AI roles.",
        onTrack: "Implement an AI talent development program. Offer ongoing learning opportunities in AI. Create cross-functional AI project teams to enhance job satisfaction.",
        ahead: "Establish an AI innovation lab to attract top talent. Offer sabbaticals or research opportunities in AI. Develop industry-leading benefits specifically for AI professionals."
      }
},
{
    questionId: 'Q3_HR',
    role: 'Human Resources Manager',
    recommendations: {
        behind: "Develop a basic AI skills assessment for technical roles. Include AI-related questions in interviews. Require AI project portfolios for senior technical positions.",
        onTrack: "Implement standardized AI proficiency tests. Use AI-based tools to assess candidates' technical skills. Conduct case study interviews focused on AI problem-solving.",
        ahead: "Develop role-specific AI competency models. Use AI-powered assessment tools for holistic evaluation. Implement AI hackathons or challenges as part of the hiring process."
      }
},
{
    questionId: 'Q4_HR',
    role: 'Human Resources Manager',
    recommendations: {
        behind: "Identify roles most impacted by AI implementation. Develop basic AI adaptation training modules. Partner with department heads to address specific AI-related skill gaps.",
        onTrack: "Implement personalized AI upskilling plans for employees. Offer hands-on workshops on working alongside AI systems. Develop change management programs for AI transitions.",
        ahead: "Create an AI transformation academy within the bank. Implement AI-assisted career path planning for employees. Develop programs to transition employees into new AI-related roles."
      }
},
{
    questionId: 'Q5_HR',
    role: 'Human Resources',
    recommendations: {
        behind: "Develop clear communication about the bank's AI strategy and its impact on jobs. Offer basic reskilling programs for at-risk roles. Implement a feedback mechanism for AI-related concerns.",
        onTrack: "Create a dedicated AI change management team. Offer comprehensive retraining programs for impacted employees. Implement policies to prioritize internal hiring for new AI-related roles.",
        ahead: "Develop an AI-human collaboration framework to showcase value of both. Implement 'AI assistant' programs to augment rather than replace roles. Create innovation initiatives for employees to propose AI use cases."
      }
},
{
    questionId: 'Q1_Customer',
    role: 'Customer Service Team',
    recommendations: {
        behind: "Implement basic AI chatbots for frequently asked questions. Pilot AI-powered call routing systems. Train staff on working alongside AI in customer service.",
        onTrack: "Enhance AI chatbots with natural language processing. Implement AI for customer sentiment analysis. Use AI for personalized customer communication.",
        ahead: "Implement advanced AI for predictive customer service. Use AI for real-time language translation in customer interactions. Develop AI systems for proactive customer issue resolution."
      }
},
{
    questionId: 'Q2_Customer',
    role: 'Customer Service Team',
    recommendations: {
        behind: "Implement AI chatbots for basic customer queries. Use AI for automated email responses. Pilot AI-powered voice assistants.",
        onTrack: "Enhance chatbots with sentiment analysis capabilities. Implement AI for customer behavior prediction. Use AI for personalized product recommendations.",
        ahead: "Implement AI for omnichannel customer experience optimization. Use advanced NLP for context-aware customer interactions. Develop AI-powered visual assistance tools for customers."
      }
},
{
    questionId: 'Q3_Customer',
    role: 'Customer Service Team',
    recommendations: {
        behind: "Implement basic customer satisfaction surveys for AI interactions. Track resolution times for AI-handled queries. Monitor customer feedback on AI-powered services.",
        onTrack: "Implement AI-specific Net Promoter Score (NPS) tracking. Use sentiment analysis on customer interactions with AI. Conduct regular A/B testing of AI vs. human customer service.",
        ahead: "Implement real-time AI performance dashboards. Use predictive analytics to forecast AI impact on customer satisfaction. Develop AI models to optimize customer satisfaction across all touchpoints."
      }
},
{
    questionId: 'Q4_Customer',
    role: 'Customer Service Team',
    recommendations: {
        behind: "Develop a basic escalation process for AI-related complaints. Train customer service staff on explaining AI decisions. Implement a feedback loop to improve AI systems based on complaints.",
        onTrack: "Create a dedicated team for handling AI-related customer concerns. Implement a system for easy human override of AI decisions. Develop clear communication templates for explaining AI decisions to customers.",
        ahead: "Implement an AI-powered system for predictive complaint resolution. Develop a customer-facing AI decision explanation portal. Create an AI ethics hotline for customers to report concerns."
      }
},
{
    questionId: 'Q5_Customer',
    role: 'Customer Service Team',
    recommendations: {
        behind: "Develop basic brand guidelines for AI communications. Regularly review AI-generated content for brand alignment. Train AI models on brand-specific language and tone.",
        onTrack: "Implement AI content generation tools trained on brand voice. Use sentiment analysis to ensure AI interactions reflect brand values. Conduct regular brand alignment audits of AI systems.",
        ahead: "Develop advanced AI models that adapt to individual customer preferences while maintaining brand consistency. Implement real-time brand alignment monitoring for AI interactions. Use AI to evolve brand voice based on customer feedback and interactions."
      }
},
{
    questionId: 'Q1_Marketing',
    role: 'Marketing Manager',
    recommendations: {
      behind: "Implement basic customer segmentation using AI. Start using AI for email subject line optimization. Pilot AI-powered content recommendations on your website.",
      onTrack: "Use AI for dynamic content personalization across channels. Implement predictive analytics for customer behavior. Develop AI-driven customer journey mapping.",
      ahead: "Deploy real-time personalization engines using advanced AI. Implement AI for cross-channel campaign optimization. Use AI for automated creation of personalized marketing content."
    }
  },
  {
    questionId: 'Q2_Marketing',
    role: 'Marketing Manager',
    recommendations: {
      behind: "Expand data collection to include behavioral data. Implement a customer data platform (CDP) for unified data storage. Develop clear data collection policies aligned with regulations.",
      onTrack: "Integrate external data sources for richer customer profiles. Implement real-time data collection across all touchpoints. Use AI for advanced customer segmentation based on behavior patterns.",
      ahead: "Implement AI-powered data quality management. Use federated learning techniques to enhance data privacy. Develop predictive models for customer lifetime value based on comprehensive data."
    }
  },
  {
    questionId: 'Q3_Marketing',
    role: 'Marketing',
    recommendations: {
      behind: "Implement attribution modeling for AI campaigns. Set up A/B testing frameworks to compare AI vs. traditional campaigns. Develop KPIs specific to AI-driven marketing initiatives.",
      onTrack: "Use multi-touch attribution models for complex customer journeys. Implement real-time ROI tracking dashboards. Develop predictive ROI models for AI campaigns.",
      ahead: "Implement AI-powered marketing mix modeling. Use causal AI models to understand true campaign impact. Develop automated systems for continuous campaign optimization based on ROI."
    }
  },
  {
    questionId: 'Q4_Marketing',
    role: 'Marketing Manager',
    recommendations: {
      behind: "Implement a basic opt-out mechanism for AI-driven marketing. Clearly communicate how customer data is used in AI marketing. Train staff on handling opt-out requests.",
      onTrack: "Develop a user-friendly preference center for granular control over AI marketing. Implement automated systems to honor opt-out requests across all channels. Regularly audit opt-out effectiveness.",
      ahead: "Use AI to predict and respect customer preferences proactively. Develop explainable AI models to build customer trust in AI marketing."
    }
  },
  {
    questionId: 'Q5_Marketing',
    role: 'Marketing Manager',
    recommendations: {
      behind: "Implement a compliance checklist for AI marketing campaigns. Conduct regular training on relevant regulations. Establish a review process involving legal and compliance teams.",
      onTrack: "Develop automated compliance checks for AI campaigns. Implement data protection impact assessments (DPIAs) for high-risk AI initiatives. Use AI for real-time compliance monitoring of marketing activities.",
      ahead: "Implement AI-powered compliance management systems. Develop predictive models for emerging regulatory risks. Contribute to industry standards for ethical AI use in marketing."
    }
  },
  {
    questionId: 'Q1_Cyber',
    role: 'Cybersecurity Manager',
    recommendations: {
      behind: "Implement basic AI-powered threat detection systems. Start using AI for log analysis and anomaly detection. Conduct a comprehensive cybersecurity assessment to identify AI integration points.",
      onTrack: "Enhance AI capabilities for real-time threat intelligence. Implement AI-driven incident response systems. Use machine learning for predictive threat modeling.",
      ahead: "Deploy advanced AI for zero-day threat detection. Implement AI-powered autonomous defense systems."
    }
  },
  {
    questionId: 'Q2_Cyber',
    role: 'Cybersecurity Manager',
    recommendations: {
      behind: "Implement machine learning models for anomaly detection in transactions. Use AI for pattern recognition in customer behavior. Start using AI-powered identity verification systems.",
      onTrack: "Deploy deep learning models for complex fraud pattern detection. Implement AI for real-time transaction risk scoring. Use natural language processing for detecting fraudulent communication.",
      ahead: "Implement federated learning for privacy-preserving fraud detection. Use reinforcement learning for adaptive fraud prevention strategies. Deploy AI for cross-channel fraud detection and prevention."
    }
  },
  {
    questionId: 'Q3_Cyber',
    role: 'Cybersecurity Manager',
    recommendations: {
      behind: "Implement regular vulnerability scans of AI systems. Conduct penetration testing on AI-powered security tools. Develop an AI-specific risk assessment framework.",
      onTrack: "Use AI for automated vulnerability detection in AI systems. Implement continuous monitoring of AI model performance and security. Conduct regular adversarial testing of AI models.",
      ahead: "Deploy AI-powered autonomous red teams for continuous security testing. Develop AI models for predicting and mitigating future cybersecurity risks."
    }
  },
  {
    questionId: 'Q4_Cyber',
    role: 'Cybersecurity Manager',
    recommendations: {
      behind: "Implement a quarterly model retraining schedule. Develop processes for rapid model updates in response to new threats. Start collecting and curating data for continuous model improvement.",
      onTrack: "Implement automated model performance monitoring. Use transfer learning for quick adaptation to new threats. Develop a system for automated feature engineering based on emerging threats.",
      ahead: "Deploy online learning systems for real-time model updates. Implement AI-driven automated machine learning (AutoML) for continuous model optimization. Develop meta-learning capabilities for rapid adaptation to novel attack vectors."
    }
  },
  {
    questionId: 'Q5_Cyber',
    role: 'Cybersecurity Manager',
    recommendations: {
      behind: "Develop AI-specific incident response plans. Implement monitoring systems for AI model behavior. Train security teams on AI-specific vulnerabilities and attack vectors.",
      onTrack: "Implement AI-powered anomaly detection for AI system behavior. Develop automated response protocols for common AI system issues. Conduct regular drills for AI-related security incidents.",
      ahead: "Deploy AI-driven autonomous incident response systems. Implement real-time explainable AI for rapid incident analysis. Develop predictive models for potential AI system vulnerabilities and proactively address them."
    }
  },
  {
    questionId: 'Q6_Cyber',
    role: 'Cybersecurity Manager',
    recommendations: {
      behind: "Implement encryption for AI model parameters and training data. Develop access control protocols for AI systems. Start using secure enclaves for sensitive AI computations.",
      onTrack: "Implement differential privacy techniques for training data protection. Use federated learning to keep sensitive data decentralized. Deploy homomorphic encryption for secure AI computations.",
      ahead: "Develop AI-powered autonomous security systems for continuous protection of AI assets."
    }
  }
];

async function seedDatabase() {
  await Question.deleteMany({});
  await Recommendation.deleteMany({});
  
  await Question.insertMany(questions);
  await Recommendation.insertMany(recommendations);
  
  console.log('Database seeded!');
  mongoose.disconnect();
}

seedDatabase();

export { Question, Recommendation };