"use client";

import React from 'react';
import { Icon } from "@/components/atoms/Icon";
import { FilterSelect } from "@/components/molecules/FilterSelect";
import SearchBar from "@/components/molecules/SearchBar";
import { TableContainer, THead, TBody, TR, TH, TD } from "@/components/molecules/Table";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { airtableService } from "@/services/airtableService";

const MOCK_REPORTS = [
    { id: '1', student: 'Alice Tan', type: 'Term Report', year: 2023, term: 'Term 3', subject: 'Science', level: 'P5', status: 'Published' },
    { id: '2', student: 'Bob Lim', type: 'Trial Report', year: 2023, term: 'Oct', subject: 'Math', level: 'S2', status: 'Pending' },
    { id: '3', student: 'Charlie Ang', type: 'Term Report', year: 2023, term: 'Term 3', subject: 'English', level: 'P6', status: 'Draft' },
    { id: '4', student: 'David See', type: 'Term Report', year: 2023, term: 'Term 3', subject: 'Math', level: 'P5', status: 'Published' },
    { id: '5', student: 'Eve Low', type: 'Trial Report', year: 2023, term: 'Nov', subject: 'Science', level: 'S1', status: 'Declined' },
];

export default function ReportsPage() {
    const [isExporting, setIsExporting] = React.useState(false);

    const handleAirtableExport = async () => {
        setIsExporting(true);
        await airtableService.exportData('Reports', MOCK_REPORTS);
        setIsExporting(false);
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-fade-in">
            <div className="flex flex-col gap-6 mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight uppercase">Report Card Pipeline</h1>
                        <p className="text-slate-500 text-base font-medium">
                            Automated delivery of Term and Trial Reports to Airtable.
                        </p>
                    </div>
                    <Button 
                        onClick={handleAirtableExport}
                        isLoading={isExporting}
                        className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black shadow-xl flex items-center gap-2 group transform hover:scale-105 transition-all"
                    >
                        <Icon name="cloud_upload" className="text-xl" />
                        EXPORT TO AIRTABLE
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="md:col-span-2">
                        <SearchBar onSearch={() => { }} placeholder="Search by student name..." />
                    </div>
                    <FilterSelect options={[{ label: 'Year 2023', value: '2023' }, { label: 'Year 2024', value: '2024' }]} placeholder="Year" />
                    <FilterSelect options={[{ label: 'Term 3', value: 't3' }, { label: 'Term 4', value: 't4' }]} placeholder="Term" />
                    <FilterSelect options={[{ label: 'Science', value: 'sci' }, { label: 'Math', value: 'math' }]} placeholder="Subject" />
                    <FilterSelect options={[{ label: 'Primary 5', value: 'p5' }, { label: 'Secondary 2', value: 's2' }]} placeholder="Level" />
                </div>

                {/* Reports Table */}
                <TableContainer className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <THead className="bg-slate-50/50 dark:bg-slate-800/50">
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Student</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Type</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Year/Term</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Subject/Level</TH>
                        <TH className="text-left px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</TH>
                        <TH className="text-right px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Actions</TH>
                    </THead>
                    <TBody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {MOCK_REPORTS.map((report) => (
                            <TR key={report.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                                <TD className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-500">
                                            {report.student[0]}
                                        </div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{report.student}</p>
                                    </div>
                                </TD>
                                <TD className="px-6 py-4">
                                    <p className="text-xs font-bold text-slate-500 uppercase">{report.type}</p>
                                </TD>
                                <TD className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                    {report.year} / {report.term}
                                </TD>
                                <TD className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="primary" className="bg-primary/5 text-primary border-primary/10 text-xs">{report.subject}</Badge>
                                        <span className="text-xs text-slate-400">{report.level}</span>
                                    </div>
                                </TD>
                                <TD className="px-6 py-4">
                                    <Badge
                                        variant={report.status === 'Published' ? 'success' : report.status === 'Pending' ? 'warning' : report.status === 'Declined' ? 'danger' : 'default'}
                                        className="text-xs"
                                    >
                                        {report.status}
                                    </Badge>
                                </TD>
                                <TD className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary transition-all">
                                            <Icon name="visibility" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-all">
                                            <Icon name="file_download" />
                                        </button>
                                    </div>
                                </TD>
                            </TR>
                        ))}
                    </TBody>
                </TableContainer>
            </div>
        </div>
    );
}
