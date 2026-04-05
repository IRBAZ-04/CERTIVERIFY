import Tilt from 'react-parallax-tilt';
import { cn } from '@/lib/utils';

const TiltCard = ({
  children,
  className = '',
  tiltMaxAngle = 4, // reduced
  glareOpacity = 0.04, // softer
  scale = 1.01,
  disabled = false,
  style = {},
}) => {
  if (disabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngle}
      tiltMaxAngleY={tiltMaxAngle}
      glareEnable={true}
      glareMaxOpacity={glareOpacity}
      glareColor="rgba(255,255,255,0.25)" // neutral
      glarePosition="all"
      glareBorderRadius="16px"
      scale={scale}
      transitionSpeed={600} // smoother
      className={cn(
        'tilt-card-wrapper will-change-transform',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </Tilt>
  );
};

export default TiltCard;