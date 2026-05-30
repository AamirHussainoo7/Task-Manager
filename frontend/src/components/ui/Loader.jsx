export function Spinner({ size = 'md' }) {
  const sizes = { sm: 16, md: 24, lg: 32 };
  const s = sizes[size] || sizes.md;

  return (
    <div style={{
      width: `${s}px`, height: `${s}px`,
      borderRadius: '50%',
      border: '2px solid #e2e8f0',
      borderTopColor: '#2563eb',
      animation: 'spin 0.8s linear infinite',
    }} />
  );
}

export function SkeletonCard({ isDark }) {
  const t = {
    cardBg: isDark ? '#1e293b' : '#fff',
    cardBorder: isDark ? '#334155' : 'rgba(226,232,240,0.8)',
    footerBorder: isDark ? '#334155' : '#f1f5f9',
  };
  return (
    <div style={{ borderRadius: '12px', border: `1px solid ${t.cardBorder}`, backgroundColor: t.cardBg, padding: '16px' }}>
      <div className="skeleton" style={{ height: '12px', width: '64px', marginBottom: '12px', borderRadius: '6px' }} />
      <div className="skeleton" style={{ height: '16px', width: '75%', marginBottom: '8px', borderRadius: '6px' }} />
      <div className="skeleton" style={{ height: '12px', width: '100%', marginBottom: '8px', borderRadius: '6px' }} />
      <div className="skeleton" style={{ height: '12px', width: '50%', marginBottom: '12px', borderRadius: '6px' }} />
      <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: `1px solid ${t.footerBorder}` }}>
        <div className="skeleton" style={{ height: '12px', width: '56px', borderRadius: '6px' }} />
        <div className="skeleton" style={{ height: '12px', width: '40px', borderRadius: '6px' }} />
      </div>
    </div>
  );
}

export function SkeletonColumn() {
  // We can't use hooks conditionally, so we import useTheme from context
  let isDark = false;
  try {
    const el = document.documentElement;
    isDark = el.classList.contains('dark');
  } catch {}

  const t = {
    zoneBg: isDark ? '#0f172a' : '#f8fafc',
    zoneBorder: isDark ? '#1e293b' : '#e2e8f0',
  };

  return (
    <div style={{ flex: 1, minWidth: '280px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', padding: '0 4px' }}>
        <div className="skeleton" style={{ height: '10px', width: '10px', borderRadius: '50%' }} />
        <div className="skeleton" style={{ height: '16px', width: '80px', borderRadius: '6px' }} />
      </div>
      <div style={{ borderRadius: '12px', border: `1px solid ${t.zoneBorder}`, backgroundColor: t.zoneBg, padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SkeletonCard isDark={isDark} />
        <SkeletonCard isDark={isDark} />
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="lg" />
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#64748b' }}>Loading...</p>
      </div>
    </div>
  );
}
