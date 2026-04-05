const AuroraBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      
      {/* Orb 1 — soft neutral glow */}
      <div className="aurora-orb orb-1" />

      {/* Orb 2 — warm subtle contrast */}
      <div className="aurora-orb orb-2" />

      {/* Orb 3 — depth layer */}
      <div className="aurora-orb orb-3" />

      {/* Base gradient tint */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_50%,rgba(255,255,255,0.01))]" />
  </div>
);

export default AuroraBackground;