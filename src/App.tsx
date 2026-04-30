/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  PenTool, 
  BarChart, 
  Users, 
  Palette, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState, useRef, useEffect, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Sparkle component for background effect
const Sparkles = () => {
  const [sparkles, setSparkles] = useState<{ id: number, top: string, left: string, size: number, delay: number }[]>([]);

  useEffect(() => {
    // Optimized number of particles for performance vs visual balance
    const generated = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1.5,
      delay: Math.random() * 5,
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0.6, 1, 0],
            scale: [0, 1.1, 0.9, 1.3, 0],
            transition: {
              delay: sparkle.delay,
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            position: 'absolute',
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            filter: 'blur(0.5px)',
            boxShadow: '0 0 12px 1px #3b82f6',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  );
};
const BlurText = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-4">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(20px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const ExperienceRow = ({ 
  company, 
  period, 
  role, 
  detail, 
  imageUrl,
  index 
}: { 
  company: string; 
  period: string; 
  role: string; 
  detail: string; 
  imageUrl?: string;
  index: number 
}) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row gap-8 items-center py-12 border-b border-white/10 ${isEven ? "" : "md:flex-row-reverse"}`}
    >
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <Badge className="liquid-glass-strong px-4 py-1">{period}</Badge>
          <span className="text-primary font-medium">{company}</span>
        </div>
        <h3 className="text-3xl font-heading italic">{role}</h3>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {detail}
        </p>
      </div>
      <div className="flex-1 w-full flex justify-center">
        <div className="liquid-glass w-full max-w-sm aspect-video relative flex items-center justify-center group overflow-hidden border-white/5 bg-white/[0.05]">
           {imageUrl ? (
             <img 
               src={imageUrl} 
               alt={`${company} logo/photo`}
               referrerPolicy="no-referrer"
               className="w-full h-full object-cover group-hover:scale-110 brightness-110 transition-all duration-700"
             />
           ) : (
             <>
               <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
               <span className="text-4xl font-heading italic text-white/20 group-hover:text-primary/40 transition-colors uppercase tracking-widest text-center">
                 {company.split(' ')[0]}
               </span>
             </>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ icon: Icon, title, description, progress, index }: { icon: any, title: string, description: string, progress: number, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <Card className="liquid-glass h-full border-none bg-transparent">
      <CardContent className="p-8 space-y-4">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: (index * 0.1) + 0.3 
          }}
          className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary"
        >
          <Icon size={24} />
        </motion.div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-primary">
            <span>Proficiency</span>
            <span>{progress}%</span>
          </div>
          <div className="bg-white/10 rounded-full h-2 w-full overflow-hidden mt-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-blue-500 h-full rounded-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Education", href: "#education" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="liquid-glass px-6 py-3 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="font-heading italic text-2xl text-white">PBL.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a 
              href="#contact" 
              className={cn(buttonVariants({ variant: "default" }), "liquid-glass-strong hover:scale-105 transition-transform px-6 py-2 h-auto")}
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 md:hidden"
          >
            <div className="liquid-glass p-6 gap-4 flex flex-col">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className={cn(buttonVariants({ variant: "default" }), "liquid-glass-strong w-full mt-2 flex items-center justify-center")}
                onClick={() => setIsOpen(false)}
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const VisualMeMarquee = () => {
  const row1 = [
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553195/row-1-1_locf3f.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553359/row-1-2_mpn4ja.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553403/row-1-3-1_c0gh9b.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553436/row-1-4_ie9xyq.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553460/row-1-5-1_drrkrv.jpg",
  ];
  
  const row2 = [
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553493/row-2-1_bqcfhv.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553522/row-2-2_pkdhex.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553543/row-2-3-1_up12rs.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553647/row-2-4_t0oaul.jpg",
    "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553670/row-2-5-1_o2uphx.jpg",
  ];
  
  return (
    <div className="w-full overflow-hidden bg-white/[0.02] border-y border-white/5 py-20 relative space-y-8">
      {/* Decorative gradients for edges */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />
      
      {/* Visual Me Header (Subtle) */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="uppercase tracking-[0.3em] font-bold" style={{ fontSize: '18px', color: '#b7f3ff' }}>Visual Me</h2>
      </div>

      {/* Row 1: Left to Right */}
      <div className="flex">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-6 items-center px-6 will-change-transform"
        >
          {/* Use fewer clones for performance */}
          {[...row1, ...row1].map((img, idx) => (
            <div key={idx} className="w-80 h-60 rounded-2xl overflow-hidden liquid-glass border-white/10 shrink-0 group transform-gpu">
              <img 
                src={img} 
                alt="Marketing Visual" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Right to Left */}
      <div className="flex">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-6 items-center px-6 will-change-transform"
        >
          {[...row2, ...row2].map((img, idx) => (
            <div key={idx} className="w-80 h-60 rounded-2xl overflow-hidden liquid-glass border-white/10 shrink-0 group transform-gpu">
              <img 
                src={img} 
                alt="Creative Visual" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Case Study Expanded Data
const MOSSY_CONTENT = {
  mainHeading: "MOSSY - Healthy Skin for Vietnamese",
  philosophy: "MOSSY is inspired by moss - a small but resilient plant. The brand follows the 'Clean Beauty' trend, providing vegan, safe, cruelty-free, and environmentally friendly products. Packaging uses reusable glass and recycled paper.",
  products: [
    { name: "Centella Asiatica Serum", detail: "Centella asiatica, heartleaf, B5. Uses: Supports acne reduction, skin recovery.", image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777553949/rau-ma_yaugtj.jpg" },
    { name: "Sea Grapes Serum", detail: "Sea grapes extract rich in Vitamin C. Uses: Deep hydration, collagen production.", image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554114/sea-grape_lxflhx.jpg" },
    { name: "Tropaeolum Majus Serum", detail: "Nasturtium extract. Uses: Brightening, revitalizing tired skin.", image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554162/tropae_foseqc.jpg" },
    { name: "Mangosteen Peel Serum", detail: "Mangosteen peel extract. Uses: Anti-aging, environmental protection.", image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554209/mango_duu1bc.jpg" }
  ],
  audience: "Positioning: Mid-range brand (Mid-brand), competing with Cocoon, Simple. Target audience: Gen Z & Millennials (18-30 years old), students, office workers who prefer a green lifestyle.",
  strategy: [
    { title: "Product", content: "4 vegan serum lines, CGMP standard, alcohol-free, paraben-free." },
    { title: "Price", content: "Penetration pricing strategy, affordable (189,000 VND - 249,000 VND / 30ml)." },
    { title: "Place", content: "Multi-channel Online (Website, Shopee, TikTok Shop) and Offline (Guardian, Hasaki)." },
    { title: "Promotion", content: "Implementing campaign '#landakhoechonguoiViet', collaborating with Beauty KOLs/KOCs, 'Refill & Save' bottle exchange program (10% discount)." }
  ],
  viewMoreUrl: "https://drive.google.com/file/d/1siOE5FX_sEnMADD-r5TLR9yE5TIn2M9j/view?usp=sharing",
  websiteUrl: "https://mossy-original.lovable.app"
};

const QUAN_RUOT_CONTENT = {
  mainHeading: "QUAN RUOT - Startup SEO & Content Strategy",
  philosophy: "An SEO and content development project for Quan Ruot - a startup connecting diners with unique local eateries. Focused on building an SEO-optimized article system to attract organic traffic through niche keywords about Saigon cuisine.",
  itemHeading: "Featured SEO Articles",
  products: [
    { 
      name: "6 Extremely Delicious Street Food Stalls in Saigon Loved by Locals", 
      detail: "Discover long-standing sidewalk eateries with characteristic flavors of Saigon that not everyone knows about.", 
      image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554248/6-quan-an_uff7ph.png",
      url: "https://quanruot.com/6-quan-an-via-he-cuc-ngon-o-sai-gon-duoc-nguoi-dia-phuong-yeu-thich_bm"
    },
    { 
      name: "Dish Suggestions for a Romantic Date: 12 Delicious Dishes for a Memorable Evening", 
      detail: "A guide to selecting delicate dishes for dates, creating a romantic atmosphere and unforgettable memories.", 
      image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554272/goi-y_alakez.png",
      url: "https://quanruot.com/goi-y-mon-an-cho-buoi-hen-ho-lang-man-giup-buoi-toi-them-dang-nho_bm"
    },
    { 
      name: "Restaurant Selection Tips for First-Time Tourists: 10 Experiences You Shouldn't Miss", 
      detail: "Guiding tourists on how to find and choose safe, delicious, and authentic local eateries.", 
      image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554298/meo-chon_vabsqn.png",
      url: "https://quanruot.com/meo-chon-quan-an-nha-hang-cho-khach-du-lich-lan-dau_bm"
    },
    { 
      name: "Top 10 Most Popular Delicious Restaurants in Thu Duc 2026 - What to Eat in Thu Duc?", 
      detail: "Detailed review of the 10 'hottest' dining spots in Thu Duc, with criteria for delicious, healthy, and affordable.", 
      image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554325/top-10_o4bvgz.png",
      url: "https://quanruot.com/top-10-quan-an-ngon-thu-duc_bm"
    },
    { 
      name: "Top 7 Famous Late-Night Eateries in Saigon Open Until 3-4 AM - Addictive Food!", 
      detail: "List of famous late-night eateries, perfect for foodies looking for a meal after curfew.", 
      image: "https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554368/top-7_ybmv46.png",
      url: "https://quanruot.com/top-7-quan-an-khuya-noi-tieng-sai-gon_bm"
    }
  ],
  audience: "Young people, tourists, and food enthusiasts in Ho Chi Minh City looking for quality and authentic dining experiences.",
  strategy: [
    { title: "SEO Keyword Research", content: "Researching niche keywords about local cuisine, dining locations by area and time (e.g., late-night eating, Thu Duc snacks)." },
    { title: "Content Optimization", content: "On-page optimization, SEO-standard article structure, optimizing mobile reading experience, and visual imagery." },
    { title: "Engagement Strategy", content: "Logical placement of CTAs to convert readers into Quan Ruot application users." }
  ],
  visitText: "Visit Article",
  websiteUrl: "https://quanruot.com"
};

const CaseStudyModal = ({ isOpen, onClose, study }: { isOpen: boolean, onClose: () => void, study: any }) => {
  if (!study) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto liquid-glass bg-[#020617]/50 border-white/10 rounded-[2rem] relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 rounded-full liquid-glass flex items-center justify-center hover:scale-110 transition-transform z-10"
            >
              <X size={24} />
            </button>

            <div className="relative h-[40vh] w-full">
              <img 
                src={study.imageUrl} 
                className="w-full h-full object-cover opacity-40" 
                alt={study.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                  Featured Case Study
                </span>
                <h2 className="text-5xl md:text-7xl font-heading italic text-white leading-tight">
                  {study.fullContent?.mainHeading || study.title}
                </h2>
              </div>
            </div>

            <div className="p-12 space-y-20 font-body">
              {/* Philosophy */}
              <section className="flex flex-col md:flex-row gap-12 items-start">
                <div className="max-w-3xl flex-1">
                  <h3 className="text-2xl font-heading italic mb-6 text-primary">
                    Project Philosophy
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                    {study.fullContent?.philosophy}
                  </p>
                </div>
                {(study.fullContent?.viewMoreUrl || study.fullContent?.websiteUrl) && (
                  <div className="w-full md:w-auto shrink-0 flex flex-col gap-4">
                    {study.fullContent?.websiteUrl && (
                      <a 
                        href={study.fullContent.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary/10 border border-primary/30 text-primary px-8 py-4 flex items-center justify-center gap-3 hover:bg-primary/20 hover:scale-105 rounded-full transition-all group"
                      >
                        <span className="font-bold tracking-widest text-sm">
                          VISIT WEBSITE
                        </span>
                        <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                    {study.fullContent?.viewMoreUrl && (
                      <a 
                        href={study.fullContent.viewMoreUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="liquid-glass-strong px-8 py-4 flex items-center justify-center gap-3 hover:scale-105 transition-transform group"
                      >
                        <span className="font-bold tracking-widest text-sm">
                          VIEW FULL PROJECT
                        </span>
                        <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                    <p className="text-[10px] text-center text-white/40 uppercase tracking-[0.2em] mt-2">
                       Detailed Strategy & Assets
                    </p>
                  </div>
                )}
              </section>

              {/* Products/Articles Grid */}
              <section className="space-y-10">
                <h3 className="text-2xl font-heading italic text-primary">
                  {study.fullContent?.itemHeading || "Product Line"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {study.fullContent?.products.map((p: any, i: number) => {
                    const CardContent = (
                      <>
                        {p.image && (
                          <div className="aspect-[16/9] overflow-hidden">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 font-body" 
                            />
                          </div>
                        )}
                        <div className="p-8">
                          <h4 className="text-xl font-bold mb-3">{p.name}</h4>
                          <p className="text-muted-foreground font-body mb-6">{p.detail}</p>
                          {p.url && (
                            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mt-auto">
                              <span>{study.fullContent?.visitText || "Visit Project"}</span>
                              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </div>
                      </>
                    );

                    const cardClass = "group overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-all flex flex-col h-full";

                    if (p.url) {
                      return (
                        <a 
                          key={i} 
                          href={p.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={cardClass}
                        >
                          {CardContent}
                        </a>
                      );
                    }

                    return (
                      <div key={i} className={cardClass}>
                        {CardContent}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Audience */}
              <section className="p-10 rounded-3xl bg-primary/5 border border-primary/10">
                <h3 className="text-2xl font-heading italic mb-6 text-primary">Target Audience & Positioning</h3>
                <p className="text-xl text-white/80 leading-relaxed italic">
                  "{study.fullContent?.audience}"
                </p>
              </section>

              {/* 4P Strategy */}
              <section className="space-y-10">
                <h3 className="text-2xl font-heading italic text-primary">4P Marketing Strategy</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {study.fullContent?.strategy.map((s: any, i: number) => (
                    <div key={i} className="p-8 rounded-2xl liquid-glass border-white/5">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-4">{s.title}</span>
                      <p className="text-lg text-white/90">{s.content}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-10 border-t border-white/5 flex justify-center">
                <Button variant="ghost" onClick={onClose} className="text-muted-foreground gap-2">
                  <X size={16} /> Close Article
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:baolancontact@gmail.com?subject=Contact from Portfolio - ${formData.name}&body=${encodeURIComponent(formData.message)} (Email: ${formData.email})`;
    window.location.href = mailto;
  };

  return (
    <div ref={containerRef} className="min-h-screen selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <Sparkles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="liquid-glass px-6 py-2 text-primary font-medium tracking-wide uppercase text-[14px]">
              Digital Marketer
            </Badge>
          </motion.div>

          <h1 className="text-6xl md:text-[122px] font-heading italic leading-tight text-glow relative inline-block py-8 px-4">
            <BlurText text="Phương Bảo Lân" />
            <motion.div
              animate={{ 
                x: [0, 40, 0, -40, 0],
                y: [0, -20, -40, -20, 0],
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute pointer-events-none bg-primary/30 backdrop-blur-xl border-2 border-primary/50 rounded-full px-5 py-2 text-sm md:text-lg font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] z-[100] whitespace-nowrap flex items-center justify-center"
              style={{ top: '-10px', right: '10%' }}
            >
              2004
            </motion.div>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-[20px] text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed"
          >
            Marketing student specializing in <span className="text-white">Content, SEO, and Communication Management</span>. 
            Turning data and words into excellent customer experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <a 
              href="#experience" 
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "liquid-glass-strong h-14 px-10 text-lg hover:scale-105 transition-transform flex items-center justify-center")}
              style={{ fontSize: '15px' }}
            >
              View Portfolio
            </a>
            <a 
              href="#contact" 
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-14 px-10 text-lg border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center")}
              style={{ fontSize: '15px' }}
            >
              Contact Now
            </a>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
          className="absolute -bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none transform-gpu" 
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none transform-gpu" 
        />
      </section>

      <VisualMeMarquee />

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4 text-center">
            <div className="flex items-center gap-3">
              <div className="title-line" />
              <h2 className="uppercase tracking-widest text-primary font-bold" style={{ fontSize: '16px' }}>Expertise</h2>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading italic text-left">Skills &<br />Expertise</h2>
            <p className="text-muted-foreground text-xl max-w-md text-left">
              Combining creative thinking with data analysis to optimize marketing performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCard 
              index={0}
              icon={PenTool}
              title="Content Writing"
              description="EN/VN content creation, SEO optimization, and e-commerce descriptions."
              progress={90}
            />
            <SkillCard 
              index={1}
              icon={BarChart}
              title="Performance & Ads"
              description="Google Ads, KPI analysis, and campaign optimization based on data."
              progress={80}
            />
            <SkillCard 
              index={2}
              icon={Users}
              title="Team Management"
              description="Managed 25-40 seeding collaborators, optimizing workflow."
              progress={85}
            />
            <SkillCard 
              index={3}
              icon={Palette}
              title="Design & Tools"
              description="Canva, CapCut, and basic Adobe Photoshop."
              progress={65}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="title-line" />
            <h2 className="uppercase tracking-widest text-primary font-bold" style={{ fontSize: '16px' }}>Experience</h2>
          </div>
          <h2 className="text-5xl md:text-7xl font-heading italic mb-20 text-center">Work Experience</h2>
          
          <div className="space-y-0">
            <ExperienceRow 
              index={0}
              company="Ecombset"
              period="2026 - Present"
              role="Content Marketing (Part-time)"
              detail="Produced 30-60 EN captions per shift, analyzed user insights, managed platforms, and wrote SEO-standard product descriptions."
              imageUrl="https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554412/ecombest_ewniti.png"
            />
            <ExperienceRow 
              index={1}
              company="YBOX VN"
              period="08/2025 - 12/2025"
              role="Seeding Manager Intern"
              detail="Managed 3 Team Leaders and 25-40 collaborators. Improved KPI by 10-15% in 2 months, reduced turnover rate by 20%."
              imageUrl="https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554489/Ybox_rmnyns.png"
            />
            <ExperienceRow 
              index={2}
              company="Bellsystem24 VN"
              period="10/2023 - 10/2024"
              role="Customer Service Representative - HDBank"
              detail="Consulted and processed financial service requests, developed operations documents and team training procedures."
              imageUrl="https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554512/bellsystem_gmzneh.png"
            />
            <ExperienceRow 
              index={3}
              company="Minh Phúc Transformation"
              period="11/2022 - 08/2023"
              role="Customer Service Representative - VNPT"
              detail="Handled technical issues and customer complaints for network, Wi-Fi, and landline services for thousands of clients."
              imageUrl="https://res.cloudinary.com/dxrwnn7ry/image/upload/v1777554541/MP-telecom_vaffnd.jpg"
            />
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="title-line" />
              <h2 className="uppercase tracking-widest text-primary font-bold" style={{ fontSize: '15px' }}>Showcase</h2>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading italic">Case Studies</h2>
            <p className="text-muted-foreground text-xl max-w-xl">
              Exploring the intersection of data-driven SEO and strategic brand identity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Building Brand Creativity",
                category: "MOSSY ORGANIC",
                description: "Founded and positioned MOSSY, a vegan cosmetic brand. Focused on the message 'Healthy skin for Vietnamese' with a strategy to launch 4 natural extract product lines.",
                imageUrl: "/PORTFOLIO-TACN-ST6-MOSS.jpg",
                tags: ["BRAND STRATEGY", "PRODUCT DEVELOPMENT", "4P MARKETING"],
                fullContent: MOSSY_CONTENT
              },
              {
                title: "SEO Freelance Strategy",
                category: "QUAN RUOT STARTUP",
                description: "Developed content strategies and SEO optimization for the food startup Quan Ruot. Built an article system attracting thousands of organic visits, increasing brand awareness for the platform.",
                imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200", // Replace with your uploaded image filename, e.g. "quan-ruot-hero.jpg"
                tags: ["SEO STRATEGY", "CONTENT MARKETING", "COPYWRITING"],
                fullContent: QUAN_RUOT_CONTENT
              }
            ].map((study, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCaseStudy(study)}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl liquid-glass mb-8 border border-white/10 group-hover:border-primary/50 group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] transition-all duration-500 ring-1 ring-white/5">
                  <img 
                    src={study.imageUrl} 
                    alt={study.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#3b82f6] font-bold block mb-1">{study.category}</span>
                      <h3 className="text-3xl font-heading italic text-white">{study.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 px-2">
                  <p className="text-muted-foreground text-lg leading-relaxed font-body">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {study.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest text-white/40 border border-white/20 px-3 py-1 rounded-full group-hover:border-primary/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal 
        isOpen={!!selectedCaseStudy} 
        onClose={() => setSelectedCaseStudy(null)} 
        study={selectedCaseStudy} 
      />

      {/* Education & Certs */}
      <section id="education" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="liquid-glass p-12 space-y-10"
            >
              <h2 className="text-4xl md:text-6xl font-heading italic">Education</h2>
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-primary text-sm font-semibold tracking-widest uppercase">
                    <span>2020 - 2023</span>
                    <Badge variant="outline" className="text-white border-white/20">GPA 3.8/4.0</Badge>
                  </div>
                  <h4 className="text-2xl font-bold">Ho Chi Minh City College of Economics</h4>
                  <p className="text-muted-foreground text-lg">Marketing Major - Graduated with High Honors.</p>
                </div>
                <div className="space-y-4 pt-10 border-t border-white/5">
                   <span className="text-primary text-sm font-semibold tracking-widest uppercase">2018 - 2020</span>
                  <h4 className="text-2xl font-bold">Industrial University of Ho Chi Minh City</h4>
                  <p className="text-muted-foreground text-lg">Chemical Engineering Major (General Studies Phase).</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="liquid-glass p-12 space-y-10 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-4xl md:text-6xl font-heading italic mb-10">Certifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Google Ads Display Certification (06/2025)",
                    "Soft Skills Training - ITD",
                    "Office Applications - Bach Khoa",
                    "English Proficiency B1"
                  ].map((cert, i) => (
                    <motion.div 
                      key={i} 
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <p className="font-medium group-hover:text-primary transition-colors">{cert}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 pt-12 border-t border-white/5">
                <p className="text-5xl font-heading italic opacity-20 select-none">
                  Always Learning.<br />Always Growing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-6xl md:text-8xl font-heading italic">Let's work together.</h2>
            <p className="text-muted-foreground text-xl">Ready for new challenges in Ho Chi Minh City.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-8 md:col-span-1">
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email</p>
                    <a href="mailto:baolancontact@gmail.com" className="text-lg hover:text-primary transition-colors">baolancontact@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone</p>
                    <a href="tel:0879433844" className="text-lg hover:text-primary transition-colors">0879433844</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Location</p>
                    <p className="text-lg">Ho Chi Minh City, Vietnam</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="liquid-glass p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Full Name</label>
                    <Input 
                      required
                      placeholder="John Doe" 
                      className="liquid-glass border-white/10 focus:border-primary/50" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Email</label>
                    <Input 
                      required
                      type="email" 
                      placeholder="example@gmail.com" 
                      className="liquid-glass border-white/10 focus:border-primary/50"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Message</label>
                  <Textarea 
                    required
                    placeholder="I'd like to discuss an upcoming marketing project..." 
                    rows={5} 
                    className="liquid-glass border-white/10 focus:border-primary/50 resize-none" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="liquid-glass-strong w-full h-14 text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-heading italic text-2xl">Phương Bảo Lân.</span>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Marketing Portfolio. Crafted with passion by PBL.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">Behance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
