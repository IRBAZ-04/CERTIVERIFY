import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm" />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]">

      {/* subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] blur-3xl" />

      {/* Shapes (reduced) */}
      <ElegantShape
        delay={0.3}
        width={500}
        height={120}
        rotate={10}
        className="left-[-5%] top-[20%]"
      />

      <ElegantShape
        delay={0.5}
        width={400}
        height={100}
        rotate={-12}
        className="right-[0%] top-[70%]"
      />

      <ElegantShape
        delay={0.6}
        width={250}
        height={80}
        rotate={15}
        className="left-[20%] bottom-[10%]"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="text-sm text-white/60 tracking-wide">
            Secure Certificate Verification
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6"
        >
          <span className="text-white">
            Verify Certificates
          </span>
          <br />
          <span className="text-white/70">
            Instantly & Securely
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed"
        >
          Eliminate fraud and build trust with AI-powered certificate verification.
          Fast, reliable, and designed for modern institutions.
        </motion.p>

      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };