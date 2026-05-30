import { ClipboardList } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = ClipboardList,
  title = 'No tasks yet',
  description = 'Create your first task to get started.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="rounded-2xl bg-slate-100 dark:bg-slate-800/60 p-5 mb-6">
        <Icon className="h-12 w-12 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
        {title}
      </h3>
      <p className="text-[15px] text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
