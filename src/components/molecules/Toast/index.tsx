import { cn } from '@/utils/cn';
import { Toast as ToastType, ToastVariant } from '@/hooks/useToast';
import { Icon } from '@/components/atoms/Icon';

interface ToastProps extends ToastType {
    onClose: () => void;
}

const variantStyles: Record<ToastVariant, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
    success: <Icon name="success" className="h-5 w-5 text-green-400" />,
    error: <Icon name="error" className="h-5 w-5 text-red-400" />,
    warning: <Icon name="warning" className="h-5 w-5 text-yellow-400" />,
    info: <Icon name="info" className="h-5 w-5 text-blue-400" />,
};

export const Toast: React.FC<ToastProps> = ({ title, description, variant, onClose }) => {
    return (
        <div
            className={cn(
                'fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300',
                variantStyles[variant]
            )}
            role="alert"
        >
            <div className="flex items-start">
                <div className="flex-shrink-0">{variantIcons[variant]}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium">{title}</p>
                    {description && (
                        <p className="mt-1 text-sm opacity-90">{description}</p>
                    )}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                    <button
                        type="button"
                        className="inline-flex rounded-md opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <Icon name="close" className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ToastContainer: React.FC<{
    toasts: ToastType[];
    removeToast: (id: string) => void;
}> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
};