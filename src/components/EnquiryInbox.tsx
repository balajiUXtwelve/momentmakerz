/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, Calendar, MapPin, Trash2, CheckCircle, Database, MessageSquare } from 'lucide-react';
import { InquirySubmission } from '../types';

interface EnquiryInboxProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: InquirySubmission[];
  setSubmissions: React.Dispatch<React.SetStateAction<InquirySubmission[]>>;
}

export default function EnquiryInbox({ isOpen, onClose, submissions, setSubmissions }: EnquiryInboxProps) {
  const [filter, setFilter] = useState<'All' | 'New' | 'Replied' | 'Archived'>('All');

  // Seed demo submissions if empty so the user has immediately visible entries
  const seedDemoSubmissions = () => {
    const demoItems: InquirySubmission[] = [
      {
        id: 'demo-1',
        name: 'Kabir & Sanya',
        email: 'kabir.sanya@gmail.com',
        phone: '+91 98765 43210',
        eventDate: '2026-11-20',
        location: 'Umaid Bhawan Palace, Jodhpur',
        message: 'Looking for cinematic, candid photography for our 3-day palace wedding. We want a documentary style that highlights real emotions and royal heritage.',
        submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'New',
      },
      {
        id: 'demo-2',
        name: 'Siddharth & Megha',
        email: 'sid.megha.wedding@yahoo.com',
        phone: '+91 88776 55443',
        eventDate: '2026-12-14',
        location: 'W Goa beach resort, Vagator',
        message: 'Pre-wedding photoshoot on the Vagator cliffs + 2-day beach wedding coverage. We love your high-contrast black and white frames!',
        submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'Replied',
      },
    ];

    setSubmissions(demoItems);
    localStorage.setItem('moment_makerz_inquiries', JSON.stringify(demoItems));
  };

  const handleUpdateStatus = (id: string, newStatus: 'New' | 'Replied' | 'Archived') => {
    const updated = submissions.map((sub) =>
      sub.id === id ? { ...sub, status: newStatus } : sub
    );
    setSubmissions(updated);
    localStorage.setItem('moment_makerz_inquiries', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    const updated = submissions.filter((sub) => sub.id !== id);
    setSubmissions(updated);
    localStorage.setItem('moment_makerz_inquiries', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all inquiries?')) {
      setSubmissions([]);
      localStorage.removeItem('moment_makerz_inquiries');
    }
  };

  const filtered = submissions.filter((sub) => {
    if (filter === 'All') return true;
    return sub.status === filter;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Sliding Inbox Drawer */}
          <motion.div
            id="admin-inbox-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-neutral-900 border-l border-white/10 shadow-2xl z-50 flex flex-col text-white"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-neutral-400" />
                  <span>Enquiry Inbox</span>
                </h2>
                <p className="text-xs font-sans text-neutral-400 mt-0.5">
                  Manage active client booking inquiries ({submissions.length})
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close Inbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="px-6 py-4 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 border-b border-white/5">
              <div className="flex gap-1.5 overflow-x-auto">
                {(['All', 'New', 'Replied', 'Archived'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-[10px] tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                      filter === status
                        ? 'bg-white text-black font-semibold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {submissions.length === 0 && (
                  <button
                    onClick={seedDemoSubmissions}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-850 hover:bg-neutral-800 border border-white/10 rounded-full text-[10px] tracking-wider uppercase text-neutral-300 transition-all cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Seed Demo</span>
                  </button>
                )}
                {submissions.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/40 border border-red-900/50 rounded-full text-[10px] tracking-wider uppercase text-red-300 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Submissions List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filtered.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <Mail className="w-12 h-12 text-neutral-600 mx-auto stroke-1" />
                  <div className="space-y-1">
                    <p className="text-sm text-neutral-300 font-medium">No inquiries found</p>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                      {submissions.length === 0
                        ? 'Submit a client booking form on the contact page, or click "Seed Demo" above to explore the interface.'
                        : `No inquiries match the "${filter}" filter status.`}
                    </p>
                  </div>
                </div>
              ) : (
                filtered.map((sub) => (
                  <motion.div
                    key={sub.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-neutral-950 rounded-xl border border-white/5 space-y-4 relative"
                  >
                    {/* Top Row: Name and Date badge */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-serif text-lg tracking-tight">{sub.name}</h4>
                        <span className="font-mono text-[9px] text-neutral-500">
                          SUBMITTED: {new Date(sub.submittedAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Status Tag Select */}
                      <select
                        value={sub.status}
                        onChange={(e) => handleUpdateStatus(sub.id, e.target.value as any)}
                        className="bg-neutral-900 text-[10px] uppercase font-mono border border-white/10 text-neutral-300 rounded px-2 py-1 outline-none cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Replied">Replied</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>

                    {/* Metadata chips */}
                    <div className="grid grid-cols-2 gap-3 text-xs border-y border-white/5 py-3 text-neutral-300 font-sans">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Date: {sub.eventDate || 'Not Specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Loc: {sub.location || 'Not Specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="truncate">{sub.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="truncate">{sub.email}</span>
                      </div>
                    </div>

                    {/* Inquiry Message */}
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed whitespace-pre-line bg-neutral-900/50 p-3 rounded border border-white/[0.02]">
                      "{sub.message}"
                    </p>

                    {/* Actions panel */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-2">
                        {sub.status !== 'Replied' && (
                          <button
                            onClick={() => handleUpdateStatus(sub.id, 'Replied')}
                            className="flex items-center gap-1 text-[10px] tracking-wider uppercase font-semibold text-green-400 hover:text-green-300 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Mark Replied</span>
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-white/5 rounded transition-all cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
