import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Products.css';

const Products = () => {
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

  const products = [
    {
      id: 1,
      title: "Small Dog Chews",
      image: "/dog_chew_for_small_dog.JPG",
      description: "Perfect size for small breeds. Made with natural ingredients for gentle chewing.",
      features: ["Natural ingredients", "Promotes dental health", "Long-lasting", "Safe for small dogs"]
    },
    {
      id: 2,
      title: "Large Dog Chews",
      image: "/dog_chew_for_big_dog.JPG",
      description: "Heavy-duty chews designed for larger breeds with stronger jaws.",
      features: ["Extra durable", "High protein", "Satisfies heavy chewers", "Supports jaw strength"]
    }
  ];

  return (
    <section id="products" className="products section" ref={ref}>
      <div className="container">
        <motion.div
          className="products-header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Our Premium Products
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Choose the perfect chew for your furry friend based on their size and chewing habits
          </motion.p>
        </motion.div>

        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card card"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="product-image">
                <motion.img
                  src={product.image}
                  alt={product.title}
                />
                <div className="product-badge">
                  Premium
                </div>
              </div>
              <div className="product-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <ul className="product-features">
                  {product.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + featureIndex * 0.1 }}
                    >
                      ✓ {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  className="btn product-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const element = document.getElementById('buy-now');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get This Product
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
