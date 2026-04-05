import { motion } from 'framer-motion';

const createVariants = (speed = 'normal') => {
  const configs = {
    fast: { duration: 0.4, stagger: 0.035 },
    normal: { duration: 0.5, stagger: 0.045 },
    slow: { duration: 0.7, stagger: 0.06 },
  };

  const { duration, stagger } = configs[speed];

  return {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration,
        delay: i * stagger,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
};

const TextReveal = ({
  text,
  className = '',
  wordClassName = '',
  as: Tag = 'div',
  once = true,
  threshold = 0.1,
  speed = 'normal', // NEW
}) => {
  const words = text.split(' ');
  const variants = createVariants(speed);

  return (
    <Tag className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline"
          style={{ marginRight: '0.25em' }}
        >
          <motion.span
            className={`inline-block will-change-transform ${wordClassName}`}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: threshold }}
            custom={i}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;