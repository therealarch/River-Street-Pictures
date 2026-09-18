import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, Phone, Clock, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Video Production']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [timeline, setTimeline] = useState('1–2 months');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const services = [
    'Video Production',
    'Real Estate Walkthrough',
    'Graphic & Brand Identity',
    'Print & Packaging',
    'Web Design & Build',
    'Full Digital Package',
  ];

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262626]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8 shadow-card-hover max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#5C5C5C] hover:text-[#262626] rounded-[6px] hover:bg-[#EFEFEF] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FF4C00]/10 text-[#FF4C00] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-[22px] font-bold text-[#262626]">
              Inquiry Dispatched
            </h3>
            <p className="text-[14px] text-[#5C5C5C] max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-[#262626]">{name || 'there'}</span>. A lead producer at River Street Pictures will review your brief and reply within 24 hours.
            </p>
            <div className="p-4 bg-[#F9F9F9] rounded-[8px] border border-[#E5E5E5] text-left text-[13px] text-[#5C5C5C] space-y-1">
              <div><strong className="text-[#262626]">Services:</strong> {selectedServices.join(', ')}</div>
              <div><strong className="text-[#262626]">Target Timeline:</strong> {timeline}</div>
            </div>
            <button
              onClick={handleReset}
              className="w-full mt-4 px-5 py-3 text-[14px] font-semibold text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary hover:opacity-95"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#FF4C00] font-bold block mb-1">
                Start a Collaboration
              </span>
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#262626] tracking-tight">
                Get in Touch
              </h3>
              <p className="text-[13px] text-[#5C5C5C] mt-1">
                Tell us about your next video, design, or web project.
              </p>
            </div>

            {/* Service Selection Pills */}
            <div>
              <label className="block text-[12px] uppercase font-mono tracking-wider text-[#262626] font-bold mb-2">
                What are you looking to produce?
              </label>
              <div className="flex flex-wrap gap-2">
                {services.map((srv) => {
                  const active = selectedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                        active
                          ? 'bg-[#FF4C00] text-[#FFFFFF] shadow-sm'
                          : 'bg-[#EFEFEF] text-[#262626] hover:bg-[#E5E5E5]'
                      }`}
                    >
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sharp Underline Inputs (per design.md §4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-mono text-[#5C5C5C] mb-1">
                  Your Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-minimal w-full py-1.5 text-[14px] placeholder:text-[#5C5C5C]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-[#5C5C5C] mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-minimal w-full py-1.5 text-[14px] placeholder:text-[#5C5C5C]/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-mono text-[#5C5C5C] mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Studio"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-minimal w-full py-1.5 text-[14px] placeholder:text-[#5C5C5C]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-mono text-[#5C5C5C] mb-1">
                  Target Launch
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="input-minimal w-full py-1.5 text-[14px] bg-transparent text-[#262626]"
                >
                  <option value="Urgent (< 3 weeks)">Urgent (&lt; 3 weeks)</option>
                  <option value="1–2 months">1–2 months</option>
                  <option value="3–6 months">3–6 months</option>
                  <option value="Exploratory">Exploratory / Ongoing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-mono text-[#5C5C5C] mb-1">
                Project Scope / Notes
              </label>
              <textarea
                rows={3}
                placeholder="Share a brief overview of deliverables, goals, or references..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-minimal w-full py-1.5 text-[14px] placeholder:text-[#5C5C5C]/40 resize-none"
              />
            </div>

            {/* Direct Studio Details */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-[12px] text-[#5C5C5C]">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#FF4C00]" />
                <span>hello@riverstreetpictures.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF4C00]" />
                <span>Typical response: &lt; 24h</span>
              </div>
            </div>

            {/* Primary Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 text-[14px] font-semibold text-[#FFFFFF] bg-[#FF4C00] rounded-[10px] shadow-btn-primary hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting...' : 'Send Project Inquiry'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
