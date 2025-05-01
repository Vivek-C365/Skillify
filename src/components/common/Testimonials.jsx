import React from 'react';
import { Carousel, Rate, Avatar } from 'antd';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Web Development Student",
    avatar: "SJ",
    rating: 5,
    text: "The courses here have transformed my career. The instructors are incredibly knowledgeable and supportive. I went from a complete beginner to landing my dream job in tech!",
    course: "Full Stack Development"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Data Science Professional",
    avatar: "MC",
    rating: 5,
    text: "The practical approach to learning and real-world projects helped me master complex concepts. The community support is amazing, and the course content is always up-to-date.",
    course: "Data Science & Analytics"
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "UX Designer",
    avatar: "ED",
    rating: 5,
    text: "I appreciate how the platform combines theoretical knowledge with practical exercises. The feedback from instructors has been invaluable in improving my design skills.",
    course: "UI/UX Design"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Software Engineer",
    avatar: "JW",
    rating: 5,
    text: "The quality of instruction and course materials is exceptional. I've taken several courses here, and each one has contributed significantly to my professional growth.",
    course: "Advanced JavaScript"
  }
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg mx-4 my-8 relative">
    <div className="absolute -top-4 left-6 bg-[var(--color-dark-lavender)] p-2 rounded-full">
      <Quote size={24} className="text-white" />
    </div>
    <div className="mt-4">
      <div className="flex items-center gap-4 mb-4">
        <Avatar 
          size={64} 
          className="bg-[var(--color-dark-lavender)]"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
          <p className="text-xs text-[var(--color-dark-lavender)]">{testimonial.course}</p>
        </div>
      </div>
      <Rate disabled defaultValue={testimonial.rating} className="text-[var(--color-dark-lavender)] mb-3" />
      <p className="text-gray-600 italic">{testimonial.text}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-[var(--color-primary-blue)]">Student </span>
            <span className="text-[var(--color-dark-lavender)]">Testimonials</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our students have to say about their learning journey with us
          </p>
        </div>
        
        <Carousel {...settings}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials; 