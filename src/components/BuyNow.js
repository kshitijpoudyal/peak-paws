import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './BuyNow.css';

const BuyNow = () => {
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

  const stores = [
    {
      name: "Amazon",
      logo: "🛒",
      url: "https://amazon.com",
      description: "Fast shipping worldwide",
      color: "#FF9900"
    },
    {
      name: "Chewy",
      logo: "🐾",
      url: "https://chewy.com",
      description: "Pet specialty retailer",
      color: "#00A8CC"
    },
    {
      name: "Petco",
      logo: "🏪",
      url: "https://petco.com",
      description: "Trusted pet care",
      color: "#001E60"
    },
    {
      name: "PetSmart",
      logo: "🏬",
      url: "https://petsmart.com",
      description: "For the love of pets",
      color: "#003DA6"
    },
    {
      name: "Walmart",
      logo: "🛍️",
      url: "https://walmart.com",
      description: "Everyday low prices",
      color: "#004c91"
    },
    {
      name: "Target",
      logo: "🎯",
      url: "https://target.com",
      description: "Expect more, pay less",
      color: "#cc0000"
    }
  ];

  return (
    <section id="buy-now" className="buy-now section" ref={ref}>
      <div className="container">
        <motion.div
          id="buy-now-header"
          className="buy-now-header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Get Your Dog Chews Today
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Available at your favorite pet retailers. Choose the store that's most convenient for you!
          </motion.p>
        </motion.div>

        <motion.div
          id='stores-grid'
          className="stores-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stores.map((store, index) => (
            <motion.a
              key={index}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="store-card card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 20px 40px ${store.color}20` 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="store-logo"
                style={{ backgroundColor: `${store.color}15` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span style={{ color: store.color }}>{store.logo}</span>
              </motion.div>
              <h3 className="store-name" style={{ color: store.color }}>
                {store.name}
              </h3>
              <p className="store-description">{store.description}</p>
              <motion.div
                className="store-arrow"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="buy-now-footer"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="guarantee-badge">
            <motion.div
              className="badge-icon"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⭐
            </motion.div>
            <div className="badge-text">
              <h4>100% Satisfaction Guarantee</h4>
              <p>Your dog will love our chews or your money back!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuyNow;
