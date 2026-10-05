import React, { useState } from 'react';
import { Send, CheckCircle2, Users, Calendar, Mail, Phone, Building, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { CateringInquiry } from '../types';

export const CateringForm: React.FC = () => {
  const [formData, setFormData] = useState<CateringInquiry>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    serviceDate: '',
    headcount: 25,
    cateringType: 'office_lunch_drop',
    dietaryNotes: '',
  });

  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Estimated price calculation based on package
  const pricePerHead = {
    office_lunch_drop: 550,
    buffet_spread: 850,
    executive_bento: 700,
    tea_and_pastries: 350,
  }[formData.cateringType];

  const estimatedTotal = formData.headcount * pricePerHead;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.workEmail.trim() || !formData.phoneNumber.trim()) {
      setErrorMsg('Please provide your name, email, and Kenyan contact number.');
      return;
    }

    setIsSubmitting(true);
    // Simulate submission to kitchen manager
    setTimeout(() => {
      const randomCode = 'KRN-' + Math.floor(1000 + Math.random() * 9000);
      setSubmittedReference(randomCode);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="catering" className="py-12 sm:py-16 lg:py-20 bg-[#F3EFEA] border-t border-[#2C332D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto pb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C85A32]">
            Group & Office Feasts
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F3D24] mt-1">
            Corporate Catering & Office Lunch Drops
          </h2>
          <p className="text-sm text-[#2C332D]/80 mt-2">
            Serving corporate parks, embassies, banks, and schools across Karen, Langata, and Rongai. 
            Hot, farm-fresh meals delivered insulated to your boardroom or boardroom buffet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Value Prop & Package Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-2xl bg-white border border-[#2C332D]/10 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1F3D24]">
                Why Karen Offices Trust Us
              </h3>

              <div className="space-y-3 text-xs text-[#2C332D]/85">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1F3D24] block">Hot Insulated Delivery</strong>
                    <span>Delivered in food-grade thermal carriers; arrived piping hot at your designated lunch hour.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1F3D24] block">Dietary Inclusivity</strong>
                    <span>Clearly labeled individual meal boxes for GF, vegan, and vegetarian colleagues with zero cross-contamination.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1F3D24] block">Direct Farm Sourcing</strong>
                    <span>Real Mt. Kenya beef, free-range chicken, and crisp hydroponic greens from Karen farms.</span>
                  </div>
                </div>
              </div>

              {/* Estimate Preview */}
              <div className="pt-4 border-t border-[#2C332D]/10 bg-[#FAF8F5] p-3.5 rounded-xl space-y-1">
                <span className="text-xs text-[#2C332D]/70 block">Estimated Quote Guide</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono tabular-nums text-xl font-bold text-[#C85A32]">
                    Ksh {estimatedTotal.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#2C332D]/70">
                    for {formData.headcount} people (~Ksh {pricePerHead}/head)
                  </span>
                </div>
                <span className="text-[10px] text-[#2C332D]/50 block">
                  *Final invoice includes eco-friendly packaging and Karen area delivery.
                </span>
              </div>
            </div>

            {/* Direct Line */}
            <div className="p-4 rounded-xl bg-white border border-[#2C332D]/10 text-xs space-y-1">
              <span className="font-bold text-[#1F3D24] block">Catering Inquiries Hotline:</span>
              <p className="text-[#2C332D]/75">
                Call/WhatsApp: <strong>+254 722 000 000</strong> · orders@thedailyscoopkaren.co.ke
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#2C332D]/10 p-6 sm:p-8 shadow-sm">
            {submittedReference ? (
              <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1F3D24]">
                  Inquiry Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#2C332D]/80 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Our Karen kitchen coordinator will contact you at <strong>{formData.phoneNumber}</strong> within 2 hours to confirm your custom menu and delivery time slot.
                </p>

                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#2C332D]/10 inline-block text-xs">
                  <span className="text-[#2C332D]/60 block">Inquiry Reference Code:</span>
                  <span className="font-mono text-base font-bold text-[#C85A32]">
                    {submittedReference}
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedReference(null);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        workEmail: '',
                        phoneNumber: '',
                        serviceDate: '',
                        headcount: 25,
                        cateringType: 'office_lunch_drop',
                        dietaryNotes: '',
                      });
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-[#1F3D24] bg-[#F3EFEA] hover:bg-[#E8E2D9] rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <h3 className="font-serif text-lg font-bold text-[#1F3D24]">
                  Request an Office Catering Proposal
                </h3>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C332D] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wanjiku Muthoni"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C332D] mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Karen Office Park Hub"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C332D] mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="wanjiku@company.co.ke"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C332D] mb-1">
                      Phone Number (M-Pesa / Calls) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 7..."
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                {/* Package Type & Service Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C332D] mb-1">
                      Catering Package Type
                    </label>
                    <select
                      value={formData.cateringType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cateringType: e.target.value as CateringInquiry['cateringType'],
                        })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] bg-white"
                    >
                      <option value="office_lunch_drop">Individual Office Lunch Drops (Ksh 550/ea)</option>
                      <option value="buffet_spread">Executive Hot Buffet Setup (Ksh 850/ea)</option>
                      <option value="executive_bento">Healthy Gourmet Bento Bowls (Ksh 700/ea)</option>
                      <option value="tea_and_pastries">Morning Spiced Chai & Mandazi (Ksh 350/ea)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C332D] mb-1">
                      Target Date / Weekly Schedule
                    </label>
                    <input
                      type="date"
                      value={formData.serviceDate}
                      onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] bg-white"
                    />
                  </div>
                </div>

                {/* Headcount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-[#2C332D]">
                      Estimated Headcount
                    </label>
                    <span className="font-mono tabular-nums text-xs font-bold text-[#C85A32] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#2C332D]/10">
                      {formData.headcount} Guests / Colleagues
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={formData.headcount}
                    onChange={(e) => setFormData({ ...formData, headcount: parseInt(e.target.value) })}
                    className="w-full accent-[#C85A32] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#2C332D]/50 mt-0.5">
                    <span>10 (Minimum)</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150+ (Custom quote)</span>
                  </div>
                </div>

                {/* Dietary Requirements or Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#2C332D] mb-1">
                    Dietary Requirements or Delivery Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 5 vegetarian, 2 gluten-free, delivery by 12:15 PM sharp to 2nd Floor."
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#2C332D]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#C85A32] hover:bg-[#B24E29] text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Catering Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
