import { cn } from '@/utils/cn';
import Checkbox from '@/components/atoms/Checkbox';
import { PERMISSION_GROUPS, Permission } from '@/utils/permissions';

interface PermissionMatrixProps {
    value: string[]; // Array of permission keys
    onChange: (value: string[]) => void;
}

export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ value, onChange }) => {
    const handleToggle = (permissionKey: string) => {
        const newValue = value.includes(permissionKey)
            ? value.filter(k => k !== permissionKey)
            : [...value, permissionKey];
        onChange(newValue);
    };

    const handleGroupToggle = (groupName: string, checked: boolean) => {
        const group = PERMISSION_GROUPS.find(g => g.name === groupName);
        if (!group) return;

        const groupKeys = group.permissions.map(p => p.key);
        let newValue = [...value];

        if (checked) {
            // Add all group keys that aren't already there
            groupKeys.forEach(key => {
                if (!newValue.includes(key)) {
                    newValue.push(key);
                }
            });
        } else {
            // Remove all group keys
            newValue = newValue.filter(key => !groupKeys.includes(key as Permission));
        }

        onChange(newValue);
    };

    const isGroupAllSelected = (groupName: string) => {
        const group = PERMISSION_GROUPS.find(g => g.name === groupName);
        if (!group) return false;
        return group.permissions.every(p => value.includes(p.key));
    };

    const isGroupSomeSelected = (groupName: string) => {
        const group = PERMISSION_GROUPS.find(g => g.name === groupName);
        if (!group) return false;
        const selectedCount = group.permissions.filter(p => value.includes(p.key)).length;
        return selectedCount > 0 && selectedCount < group.permissions.length;
    };

    return (
        <div className="space-y-6">
            {PERMISSION_GROUPS.map((group) => (
                <div key={group.name} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">{group.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select All</span>
                            <Checkbox
                                checked={isGroupAllSelected(group.name)}
                                onChange={(e) => handleGroupToggle(group.name, e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {group.permissions.map((perm) => (
                            <label 
                                key={perm.key} 
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group",
                                    value.includes(perm.key) 
                                        ? "bg-primary/5 border-primary/20" 
                                        : "bg-transparent border-slate-100 dark:border-slate-800 hover:border-primary/30"
                                )}
                            >
                                <Checkbox
                                    checked={value.includes(perm.key)}
                                    onChange={() => handleToggle(perm.key)}
                                />
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "text-sm font-bold transition-colors",
                                        value.includes(perm.key) ? "text-primary" : "text-slate-700 dark:text-slate-300 group-hover:text-primary"
                                    )}>
                                        {perm.label}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                        {perm.key}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
