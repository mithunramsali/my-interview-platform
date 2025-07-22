// src/components/FeaturesSection.tsx
import { BookOpenIcon, CodeBracketSquareIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

type Feature = {
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>;
};

const features: Feature[] = [
  {
    name: 'Structured Learning Paths',
    description: 'Follow expert-designed roadmaps for roles like Backend, Frontend, and Full-Stack. No more guessing what to learn next.',
    icon: BookOpenIcon,
  },
  {
    name: 'Hands-On Practice',
    description: 'Solve over 150+ curated coding problems asked by top companies, right in your browser with our integrated code editor.',
    icon: CodeBracketSquareIcon,
  },
  {
    name: 'Community & Mock Interviews',
    description: 'Connect with peers, solve doubts in the community forum, and practice with our AI-powered mock interview simulator.',
    icon: ChatBubbleLeftRightIcon,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Everything You Need to Succeed</h2>
            <p className="mt-4 text-lg text-gray-600">All in one platform, all for free.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-gray-50 p-8 rounded-lg">
              <feature.icon className="h-10 w-10 text-blue-600" aria-hidden="true" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;