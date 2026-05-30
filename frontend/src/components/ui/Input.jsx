import { classNames } from '../../utils/helpers';

export default function Input({
  label,
  error,
  id,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={classNames(
          'w-full h-11 rounded-lg border px-4 text-sm transition-all duration-150',
          'bg-white text-slate-900 placeholder-slate-400',
          'dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500'
            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-600 dark:focus:border-blue-500',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
