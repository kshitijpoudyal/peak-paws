import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Features.css';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      icon: "🦷",
      title: "Dental Health",
      description: "Helps clean teeth and reduce tartar buildup while your dog enjoys chewing"
    },
    {
      icon: "🌿",
      title: "All Natural",
      description: "Made from 100% natural ingredients with no artificial preservatives or chemicals"
    },
    {
      icon: "💪",
      title: "Long Lasting",
      description: "Durable construction provides hours of satisfying chewing entertainment"
    },
    {
      icon: "🐕",
      title: "Safe & Digestible",
      description: "Completely safe for dogs with easy digestibility and no choking hazards"
    },
    {
      icon: "❤️",
      title: "Stress Relief",
      description: "Helps reduce anxiety and boredom by providing a healthy outlet for natural chewing instincts"
    },
    {
      icon: "🏆",
      title: "Vet Recommended",
      description: "Trusted by veterinarians worldwide for promoting oral health and overall wellbeing"
    }
  ];

  return (
    <section id="features" className="features section" ref={ref}>
      <div className="container">
        <motion.div
          id="features-header"
          className="features-header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Why Choose Our Dog Chews?
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Discover the benefits that make our dog chews the perfect choice for your furry companion
          </motion.p>
        </motion.div>

        <motion.div
          id="features-items"
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="feature-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="peak-promise"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3>🏔️ Our Peak Promise</h3>
          <p>
            Crafted from an ancient recipe, our Himalayan Yak Chews are made using traditional 
            methods in the pristine foothills of the Himalayas. We use 100% natural ingredients, 
            primarily yak and cow milk, with a dash of lime juice and a pinch of salt to coagulate the 
            milk. These chews are sun dried and smoke cured for weeks, resulting in a hard, flavorful, 
            and long-lasting satisfying treat that connects your cherished companion to the spirit of the world's highest peaks.
          </p>
        </motion.div>

        <motion.div
          className="features-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3>Ready to Give Your Dog the Best?</h3>
          <motion.button
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('buy-now');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Shop Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
