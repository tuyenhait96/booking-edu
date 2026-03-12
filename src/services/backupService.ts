
export interface BackupSnapshot {
    id: string;
    version: string;
    createdAt: string;
    size: string;
    status: 'completed' | 'failed' | 'in_progress';
    createdBy: string;
}

class BackupService {
    private snapshots: BackupSnapshot[] = [
        {
            id: 'snap-001',
            version: 'v1.4.2',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            size: '124 MB',
            status: 'completed',
            createdBy: 'System (Automated)'
        },
        {
            id: 'snap-002',
            version: 'v1.4.1',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            size: '122 MB',
            status: 'completed',
            createdBy: 'Admin (Manual)'
        }
    ];

    async getSnapshots(): Promise<BackupSnapshot[]> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve([...this.snapshots]), 500);
        });
    }

    async triggerBackup(): Promise<BackupSnapshot> {
        // Simulate backup process
        const newBackup: BackupSnapshot = {
            id: `snap-${Math.floor(Math.random() * 1000)}`,
            version: 'v1.4.3',
            createdAt: new Date().toISOString(),
            size: '0 MB',
            status: 'in_progress',
            createdBy: 'Super Admin'
        };
        
        this.snapshots.unshift(newBackup);
        
        // Simulate completion after 2 seconds
        setTimeout(() => {
            const index = this.snapshots.findIndex(s => s.id === newBackup.id);
            if (index !== -1) {
                this.snapshots[index] = {
                    ...this.snapshots[index],
                    size: '125 MB',
                    status: 'completed'
                };
            }
        }, 2000);

        return newBackup;
    }

    async restoreSnapshot(id: string): Promise<boolean> {
        console.log(`Restoring database to snapshot: ${id}`);
        // Simulate restoration process
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 3000);
        });
    }
}

export const backupService = new BackupService();
