import { useState, useEffect } from 'react';
import inkubatorImg from './Inkubator.png';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap,
  Sprout, 
  Cpu, 
  Smartphone, 
  Thermometer, 
  Droplets, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Microscope,
  Menu,
  X,
  Mail,
  ArrowRight,
  Activity,
  Send
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- Mock Data for Simulator ---
const generateSimData = () => Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  temp: 28 + Math.sin(i / 4) * 2 + Math.random() * 0.5,
  humidity: 75 + Math.cos(i / 6) * 5 + Math.random() * 1,
  progress: Math.min(100, (i / 20) * 100).toFixed(0)
}));

const SIM_DATA = generateSimData();

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Sprout className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Velo<span className="text-indigo-400">Ferment</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-80">
          <a href="#tech" className="hover:text-indigo-400 transition-colors">Teknologi</a>
          <a href="#specs" className="hover:text-indigo-400 transition-colors">Spesifikasi</a>
          <a href="#dashboard" className="hover:text-indigo-400 transition-colors">Simulasi</a>
          <a href="#invest" className="hover:text-indigo-400 transition-colors">Investasi</a>
          <button 
            onClick={() => window.location.href = 'mailto:Veloferment@gmail.com'}
            className="bg-primary text-white px-5 py-2 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
          >
            Mulai Sekarang
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass p-6 md:hidden flex flex-col gap-4 text-center border-t border-white/5"
          >
            <a href="#tech" onClick={() => setIsOpen(false)}>Teknologi</a>
            <a href="#specs" onClick={() => setIsOpen(false)}>Spesifikasi</a>
            <a href="#dashboard" onClick={() => setIsOpen(false)}>Simulasi</a>
            <a href="#invest" onClick={() => setIsOpen(false)}>Investasi</a>
            <button className="bg-primary text-bg-dark px-5 py-3 rounded-xl font-bold">Konsultasi</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DashboardSimulator = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section */}
      <div className="lg:col-span-2 glass rounded-3xl p-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="text-primary w-5 h-5" />
              Monitoring Real-time
            </h3>
            <p className="text-xs opacity-50 font-mono">Siklus: Batch #1024-A</p>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] uppercase font-bold rounded-full border border-green-500/30">
               Active
             </span>
          </div>
        </div>
        
        <div className="h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SIM_DATA}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} tickMargin={10} />
              <YAxis stroke="#ffffff30" fontSize={10} />
              <Tooltip 
                contentStyle={{ background: '#0a0a0f', border: '1px solid #ffffff20', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                itemStyle={{ color: '#6366f1' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#6366f1" fillOpacity={1} fill="url(#colorTemp)" />
              <Line type="monotone" dataKey="humidity" stroke="#a855f7" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs opacity-70 text-indigo-400">Temperatur (°C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-xs opacity-70 text-purple-400">Kelembapan (%)</span>
          </div>
        </div>
      </div>

      {/* Stats Column */}
      <div className="flex flex-col gap-6">
        <div className="glass rounded-3xl p-6 bg-primary/5 border-primary/20">
          <div className="flex justify-between items-center mb-4 text-primary">
            <span className="text-xs font-bold uppercase tracking-wider">Progress Fermentasi</span>
            <span className="text-2xl font-mono">82%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '82%' }}
               transition={{ duration: 2, ease: "easeOut" }}
               className="h-full bg-primary shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
          </div>
          <p className="text-[10px] mt-4 opacity-40 leading-relaxed italic">
            *AI Prediksi: Matang dalam 4 jam 12 menit berdasarkan Logika Fuzzy Sugeno.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
             <Thermometer className="text-primary w-4 h-4 mb-2" />
             <span className="text-[10px] opacity-40 uppercase">Suhu Ruang</span>
             <span className="text-xl font-mono">30.2°C</span>
          </div>
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
             <Droplets className="text-accent w-4 h-4 mb-2" />
             <span className="text-[10px] opacity-40 uppercase">Kelembapan</span>
             <span className="text-xl font-mono">78%</span>
          </div>
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
             <Cpu className="text-slate-400 w-4 h-4 mb-2" />
             <span className="text-[10px] opacity-40 uppercase">Load CPU</span>
             <span className="text-xl font-mono">12%</span>
          </div>
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
             <Smartphone className="text-slate-400 w-4 h-4 mb-2" />
             <span className="text-[10px] opacity-40 uppercase">Status IoT</span>
             <span className="text-xl font-mono text-green-400">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) + ' WIB';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Mesh Gradients from theme */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-[20%] right-[10%] w-[30%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full glass text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-indigo-400 border border-primary/20 inline-block mb-6">
              Industrial Grade IoT Solution
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.2] md:leading-[1.1]">
              Elevasi Produksi Tempe <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                dengan Presisi Digital.
              </span>
            </h1>
            <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-lg opacity-60 mb-10 md:mb-12 leading-relaxed">
              Tinggalkan metode tradisional yang tidak terukur. VeloFerment menghadirkan standardisasi mutu, efisiensi waktu, dan kontrol penuh produksi UMKM melalui AI & IoT.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.location.href = 'mailto:Veloferment@gmail.com'}
                className="w-full sm:w-auto bg-primary text-white px-8 md:px-10 py-4 rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)]">
                Konsultasi Pemasangan
              </button>
              <button 
                onClick={() => window.open('https://youtu.be/NwT5XTgk0Tw?si=lF9FK0LFihE_Jls1', '_blank')}
                className="w-full sm:w-auto glass px-8 md:px-10 py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 transition-all border-white/5">
                Lihat Demo Alat
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Metrics Strip */}
      <section className="border-y border-white/5 py-8 md:py-12 bg-white/2 backdrop-blur-sm">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {[
            { label: "Akurasi Waktu", val: "99.2%", icon: Clock },
            { label: "Efisiensi Energi", val: "35%", icon: Zap },
            { label: "Teknologi AI", val: "Fuzzy Logic", icon: Cpu },
            { label: "Jaringan", val: "Global IoT", icon: Activity }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 group">
              <item.icon className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xl md:text-2xl font-bold text-white font-mono tracking-tight">{item.val}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator Section */}
      <section id="dashboard" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-xl">
               <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">Kontrol Penuh <br/>di Genggaman.</h2>
               <p className="text-sm md:text-base opacity-50">Monitoring status produksi, riwayat temperatur, dan prediksi matang secara real-time melalui dashboard interaktif.</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="glass px-5 md:px-6 py-3 md:py-4 rounded-2xl border border-primary/20">
                 <span className="text-[9px] md:text-[10px] uppercase font-bold text-primary block mb-1">Live Monitor</span>
                 <span className="text-sm md:text-lg font-mono">{formattedTime}</span>
              </div>
            </div>
          </div>
          
          <DashboardSimulator />
        </div>
      </section>

      {/* Features Bento */}
      <section id="specs" className="py-16 md:py-24 bg-white/2">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass rounded-3xl p-8 md:p-10 flex flex-col justify-end min-h-[250px] md:min-h-[300px] group transition-all hover:bg-white/10">
              <Cpu className="w-10 h-10 md:w-12 md:h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-2xl font-bold mb-4">Otak Cerdas Sugeno</h3>
              <p className="text-sm md:text-base opacity-50 max-w-md">Algoritma Fuzzy Logic Sugeno yang dikembangkan di Universitas Diponegoro (UNDIP) untuk pemrosesan variabel lingkungan yang dinamis.</p>
            </div>
            
            <div className="glass rounded-3xl p-8 md:p-10 flex flex-col justify-end min-h-[250px] bg-accent/5 border-accent/20 transition-all hover:bg-accent/10">
              <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-accent mb-6" />
              <h3 className="text-xl md:text-2xl font-bold mb-4">Higienitas Industri</h3>
              <p className="text-sm md:text-base opacity-50">Standardisasi ruang fermentasi yang menekan risiko kontaminasi bakteri liar hingga 95%.</p>
            </div>

            <div className="glass rounded-3xl p-8 md:p-10 flex flex-col justify-end min-h-[250px] transition-all hover:bg-white/10">
               <div className="flex items-center gap-3 mb-6">
                 <Smartphone className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                 <Send className="w-6 h-6 md:w-8 md:h-8 text-primary opacity-50" />
               </div>
               <h3 className="text-xl md:text-2xl font-bold mb-4">Smart App & Telegram</h3>
               <p className="text-sm md:text-base opacity-50">Monitoring realtime jauh lebih mudah melalui integrasi Bot Telegram. Notifikasi instan langsung ke ponsel Anda.</p>
            </div>

            <div className="md:col-span-2 glass rounded-3xl p-8 md:p-10 flex flex-col justify-end min-h-[250px] md:min-h-[300px] transition-all hover:bg-white/10">
               <div className="flex justify-between items-start mb-6">
                 <Zap className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                 <div className="text-right">
                    <span className="block text-3xl md:text-4xl font-mono font-bold">1.5 jt</span>
                    <span className="text-[10px] opacity-40 uppercase">Rasio Investasi</span>
                 </div>
               </div>
               <h3 className="text-xl md:text-2xl font-bold mb-4">Efisiensi yang Terukur</h3>
               <p className="text-sm md:text-base opacity-50 max-w-md">Kalkulasi ROI yang cepat melalui peningkatan kapasitas produksi UMKM dan pengurangan produk gagal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Science Background */}
      <section id="tech" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <Microscope className="w-32 h-32 md:w-64 md:h-64" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">Proven Technology</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">Berbasis Riset Akademik yang Tervalidasi.</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Universitas Diponegoro</h4>
                      <p className="text-sm opacity-50">Dikembangkan berdasarkan publikasi di Jurnal Ilmiah Transient UNDIP.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Analisis Fuzzy Sugeno</h4>
                      <p className="text-sm opacity-50">Menjamin ketepatan waktu fermentasi yang tidak bisa dicapai secara manual.</p>
                    </div>
                  </div>
                </div>
                
                <a 
                  href="https://ejournal3.undip.ac.id/index.php/transient/article/view/40925" 
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-10 text-primary font-bold hover:gap-4 transition-all"
                >
                  Baca Publikasi Riset <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="relative group">
                <div className="aspect-[4/3] glass rounded-3xl overflow-hidden shadow-2xl relative border-primary/20 bg-white/5 ring-1 ring-white/10">
                  <img 
                    src={inkubatorImg}
                    alt="Inkubator VeloFerment Industrial" 
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Industrial Grade</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/30 blur-[60px] rounded-full -z-10 group-hover:bg-primary/50 transition-colors" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/30 blur-[60px] rounded-full -z-10 group-hover:bg-accent/50 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Investment */}
      <section id="invest" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">Investasi Cerdas UMKM.</h2>
            <p className="text-sm md:text-base opacity-50">Solusi terjangkau untuk standardisasi kapasitas produksi tinggi.</p>
          </div>
          
          <div className="glass rounded-[2rem] p-8 md:p-12 border-primary/30 relative overflow-hidden text-center group">
             <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 block">Paket Instalasi Panel</span>
             <div className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 font-mono text-glow text-indigo-400">
                Rp 1.5jt<span className="text-base md:text-lg opacity-40 font-sans font-medium text-white">/ m²</span>
             </div>
             <p className="text-xs md:text-sm opacity-60 mb-8 md:mb-10 max-w-md mx-auto">
                Harga sudah mencakup unit panel kontrol, sensor industri, dan sistem monitoring cloud selamanya.
             </p>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm font-medium mb-10 md:mb-12 text-left bg-white/5 p-5 md:p-6 rounded-2xl">
               <li className="flex items-center gap-3">
                 <ShieldCheck className="text-primary w-4 h-4" /> Garansi Perangkat 1 Tahun
               </li>
               <li className="flex items-center gap-3">
                 <ShieldCheck className="text-primary w-4 h-4" /> Monitoring IoT Lifetime
               </li>
               <li className="flex items-center gap-3">
                 <ShieldCheck className="text-primary w-4 h-4" /> Kalibrasi Sensor Presisi
               </li>
               <li className="flex items-center gap-3">
                 <ShieldCheck className="text-primary w-4 h-4" /> FREE Maintenance 6 Bulan
               </li>
             </ul>
             <button 
                onClick={() => window.location.href = 'mailto:Veloferment@gmail.com'}
                className="w-full bg-primary text-white py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:scale-[1.02] transition-transform">
                Pesan Unit Sekarang
             </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-12 md:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-6 md:mb-8">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Sprout className="text-white w-5 h-5 fill-current" />
                </div>
                <span className="text-xl font-bold tracking-tighter text-white">
                  Velo<span className="text-indigo-400">Ferment</span>
                </span>
              </div>
              <p className="opacity-40 leading-relaxed text-sm max-w-xs">
                Membangun masa depan industri pangan tradisional melalui inovasi teknologi IoT dan kecerdasan buatan. Proudly founded in Indonesia.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:gap-10">
              <div>
                <h5 className="font-bold mb-4 md:mb-6 text-sm">Navigasi</h5>
                <ul className="space-y-3 md:space-y-4 text-sm opacity-50 font-medium">
                  <li><a href="#" className="hover:text-primary">Beranda</a></li>
                  <li><a href="#tech" className="hover:text-primary">Teknologi</a></li>
                  <li><a href="#specs" className="hover:text-primary">Spesifikasi</a></li>
                  <li><a href="#invest" className="hover:text-primary">Investasi</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4 md:mb-6 text-sm">Kontak</h5>
                <ul className="space-y-3 md:space-y-4 text-sm opacity-50 font-medium font-mono">
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4" /> veloferment@gmail.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] uppercase font-bold tracking-widest opacity-20 border-t border-white/5 pt-10 text-center">
            <span>&copy; 2026 Veloferment. All Rights Reserved.</span>
            <span>Solusi Rekayasa untuk Industri Makanan Terintegrasi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
