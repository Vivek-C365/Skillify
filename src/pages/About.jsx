import React from 'react';
import Navbar from '../components/navbar/index';
import Footer from '../components/footer/Footer';
import { Users, Award, BookOpen, Globe, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    {
      icon: <Users size={32} className="text-[var(--color-dark-lavender)]" />,
      number: '10K+',
      label: 'Active Students',
      description: 'Join our growing community of learners'
    },
    {
      icon: <Award size={32} className="text-[var(--color-dark-lavender)]" />,
      number: '500+',
      label: 'Certified Courses',
      description: 'Industry-recognized certifications'
    },
    {
      icon: <BookOpen size={32} className="text-[var(--color-dark-lavender)]" />,
      number: '100+',
      label: 'Expert Instructors',
      description: 'Learn from industry professionals'
    },
    {
      icon: <Globe size={32} className="text-[var(--color-dark-lavender)]" />,
      number: '50+',
      label: 'Countries Reached',
      description: 'Global learning community'
    },
  ];

  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Passionate about making education accessible to everyone.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'john@skillify.com'
      }
    },
    {
      name: 'Jane Smith',
      role: 'Head of Education',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Dedicated to creating innovative learning experiences.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'jane@skillify.com'
      }
    },
    {
      name: 'Mike Johnson',
      role: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      bio: 'Expert in educational technology and digital learning.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mike@skillify.com'
      }
    },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly evolve our teaching methods and technology to provide the best learning experience.',
      icon: '🚀'
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in our courses and teaching methodologies.',
      icon: '⭐'
    },
    {
      title: 'Accessibility',
      description: 'We believe education should be accessible to everyone, anywhere in the world.',
      icon: '🌍'
    },
    {
      title: 'Community',
      description: 'We foster a supportive learning environment where students can grow together.',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen bg-white ">
      <div className= "bg-[var(--color-lavender)]">
        <Navbar />
    

      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transforming Education Through Technology
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
              We're on a mission to make quality education accessible to everyone, everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center px-8 py-4 bg-white text-[var(--color-dark-lavender)] rounded-full font-semibold hover:bg-gray-100 transition-all group"
              >
                Explore Courses
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary-blue)]">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  At Skillify, we're dedicated to making quality education accessible to everyone. 
                  Our platform offers comprehensive courses designed to help learners achieve their 
                  personal and professional goals through innovative learning experiences.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary-blue)]">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  We envision a world where anyone, anywhere can transform their life through 
                  accessible education. By providing cutting-edge courses and expert instruction, 
                  we're building the future of learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[var(--color-dark-lavender)]">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-[var(--color-dark-lavender)] mb-2 text-center">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-center mb-2">{stat.label}</div>
                <p className="text-gray-600 text-center text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex gap-4 justify-center">
                        <a href={member.social.linkedin} className="hover:text-[var(--color-dark-lavender)] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a href={member.social.twitter} className="hover:text-[var(--color-dark-lavender)] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        </a>
                        <a href={`mailto:${member.social.email}`} className="hover:text-[var(--color-dark-lavender)] transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-[var(--color-dark-lavender)] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-lavender)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already transforming their lives with Skillify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 bg-white text-[var(--color-dark-lavender)] rounded-full font-semibold hover:bg-gray-100 transition-all group"
            >
              Explore Courses
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Join for Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 