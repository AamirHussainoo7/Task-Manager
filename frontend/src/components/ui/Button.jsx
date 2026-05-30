import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const variantStyles = {
  primary: { backgroundColor: '#2563eb', color: '#fff', border: 'none', boxShadow: '0 1px 2px rgba(37,99,235,0.2)' },
  secondary: (isDark) => ({
    backgroundColor: isDark ? '#1e293b' : '#fff',
    color: isDark ? '#cbd5e1' : '#475569',
    border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
  }),
  ghost: (isDark) => ({
    backgroundColor: 'transparent',
    color: isDark ? '#cbd5e1' : '#475569',
    border: 'none',
  }),
  danger: { backgroundColor: '#dc2626', color: '#fff', border: 'none', boxShadow: '0 1px 2px rgba(220,38,38,0.2)' },
};

const sizeStyles = {
  xs: { padding: '6px 10px', fontSize: '12px', borderRadius: '8px', gap: '6px' },
  sm: { padding: '8px 14px', fontSize: '13px', borderRadius: '8px', gap: '6px' },
  md: { padding: '10px 20px', fontSize: '14px', borderRadius: '8px', gap: '8px' },
  lg: { padding: '12px 24px', fontSize: '15px', borderRadius: '12px', gap: '8px' },
};

export default function Button({
  children, variant = 'primary', size = 'md', loading = false, disabled = false,
  className = '', type = 'button', onClick, ...props
}) {
  const { isDark } = useTheme();
  const vsRaw = variantStyles[variant] || variantStyles.primary;
  const vs = typeof vsRaw === 'function' ? vsRaw(isDark) : vsRaw;
  const ss = sizeStyles[size] || sizeStyles.md;

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.5 : 1,
        transition: 'all 0.15s',
        ...vs,
        ...ss,
      }}
      {...props}
    >
      {loading && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 0.8s linear infinite' }} />}
      {children}
    </motion.button>
  );
}
