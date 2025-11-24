import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({
    months: 4,
    days: 27,
    hours: 9,
    minutes: 1
  });

  const [selectedVideo, setSelectedVideo] = useState({
    id: 'eOJpb7ZCxQY',
    title: 'Datos claves sobre las Elecciones Generales 2026'
  });

  const videos = [
    {
      id: 'eOJpb7ZCxQY',
      title: 'Datos claves sobre las Elecciones Generales 2026',
      label: 'Datos claves'
    },
    {
      id: '0QeTxLP9EmU',
      title: 'Principales cambios normativos',
      label: 'Principales cambios normativos'
    },
    {
      id: 'tg0UXVd14pc',
      title: 'Requisitos para el Voto Digital',
      label: 'Requisitos para el Voto Digital'
    },
    {
      id: 'L6ykzeczm3I',
      title: 'Jefe de la ONPE comparte 3 datos clave',
      label: 'Jefe de la ONPE comparte 3 datos clave'
    },
    {
      id: '_7VL9RIpnzU',
      title: 'Distritos electorales',
      label: 'Distritos electorales'
    }
  ];

  useEffect(() => {
    const targetDate = new Date('2026-04-12T07:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setCountdown({
          months,
          days: remainingDays,
          hours,
          minutes
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-poppins overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4 animate-slide-in-left">
              <img
                src="https://ext.same-assets.com/3536222468/1072281264.svg"
                alt="ONPE Logo"
                className="h-14 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Countdown */}
            <div className="text-center animate-slide-in-right">
              <p className="text-sm font-semibold mb-2 text-gray-700">Faltan:</p>
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-onpe-blue/20 rounded-xl px-4 py-3 min-w-[75px] hover:-translate-y-2 hover:shadow-2xl hover:shadow-onpe-blue/40 shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-onpe-blue drop-shadow-sm">{String(countdown.months).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-600 font-medium">Meses</div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-onpe-blue/20 rounded-xl px-4 py-3 min-w-[75px] hover:-translate-y-2 hover:shadow-2xl hover:shadow-onpe-blue/40 shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-onpe-blue drop-shadow-sm">{String(countdown.days).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-600 font-medium">Días</div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-onpe-blue/20 rounded-xl px-4 py-3 min-w-[75px] hover:-translate-y-2 hover:shadow-2xl hover:shadow-onpe-blue/40 shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-onpe-blue drop-shadow-sm">{String(countdown.hours).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-600 font-medium">Horas</div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-onpe-blue/20 rounded-xl px-4 py-3 min-w-[75px] hover:-translate-y-2 hover:shadow-2xl hover:shadow-onpe-blue/40 shadow-lg transition-all duration-300">
                  <div className="text-2xl font-bold text-onpe-blue drop-shadow-sm">{String(countdown.minutes).padStart(2, '0')}</div>
                  <div className="text-xs text-gray-600 font-medium">Minutos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-onpe-dark shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-1">
              <a href="#" className="text-white px-6 py-4 hover:bg-onpe-blue transition-all duration-300 text-sm font-medium relative group">
                <span className="relative z-10">Inicio</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onpe-red group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-white px-6 py-4 hover:bg-onpe-blue transition-all duration-300 text-sm font-medium relative group">
                <span className="relative z-10">Para electores</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onpe-red group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-white px-6 py-4 hover:bg-onpe-blue transition-all duration-300 text-sm font-medium relative group">
                <span className="relative z-10">La organización</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onpe-red group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-white px-6 py-4 hover:bg-onpe-blue transition-all duration-300 text-sm font-medium relative group">
                <span className="relative z-10">Acerca del proceso</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onpe-red group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-white px-6 py-4 hover:bg-onpe-blue transition-all duration-300 text-sm font-medium relative group">
                <span className="relative z-10">Lo nuevo</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onpe-red group-hover:w-full transition-all duration-300"></span>
              </a>
              <button onClick={() => navigate('/login')} className="text-white px-6 py-4 hover:bg-onpe-blue transition-all duration-300 text-sm font-medium relative group">
                <span className="relative z-10">Voto Digital</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-onpe-red group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-onpe-blue via-onpe-dark to-onpe-blue animate-gradient" style={{ backgroundSize: '400% 400%' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-onpe-blue via-onpe-dark to-onpe-blue opacity-90"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white z-10 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Elecciones</span><br />
                  <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Generales</span><br />
                  <span className="inline-block animate-fade-in-up bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent" style={{ animationDelay: '0.3s' }}>2026</span>
                </h1>
                <p className="text-xl mb-8 text-gray-100 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Todo lo que debes saber sobre las elecciones a realizarse el 12 de abril de 2026.
                </p>
                <a href="https://youtu.be/1l0783CZRWA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-onpe-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-2xl animate-fade-in-up group" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Conoce la cédula
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-onpe-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <img
                  src="https://ext.same-assets.com/3536222468/1793460604.png"
                  alt="Hero Illustration"
                  className="w-full h-auto relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
          {/* Decorative pattern animado */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(255,255,255,.1)_35px,rgba(255,255,255,.1)_70px)]"></div>
          </div>
          {/* Partículas flotantes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </section>

        {/* ¿Qué elegiremos? Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-onpe-dark text-center mb-4 animate-fade-in-up">
              ¿Qué elegiremos en estas<br />Elecciones Generales 2026?
            </h2>
            <p className="text-center text-gray-700 mb-16 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Estas son las autoridades por las cuales votaremos en las próximas Elecciones Generales 2026.
            </p>

            <div className="flex flex-wrap justify-center items-end gap-8">
              {[
                { src: 'https://ext.same-assets.com/3536222468/2489534146.png', alt: 'Presidente', delay: '0.1s' },
                { src: 'https://ext.same-assets.com/3536222468/2733763157.png', alt: 'Vicepresidentes', delay: '0.2s' },
                { src: 'https://ext.same-assets.com/3536222468/160987966.png', alt: 'Senadores', delay: '0.3s' },
                { src: 'https://ext.same-assets.com/3536222468/2626431238.png', alt: 'Diputados', delay: '0.4s' },
                { src: 'https://ext.same-assets.com/3536222468/3354953076.png', alt: 'Parlamento Andino', delay: '0.5s' }
              ].map((item, index) => (
                <div key={index} className="text-center group" style={{ animationDelay: item.delay }}>
                  <div className="relative inline-block hover:-translate-y-4 hover:shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 bg-onpe-blue/10 rounded-full blur-xl group-hover:bg-onpe-blue/20 transition-all duration-500 scale-0 group-hover:scale-110"></div>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="mx-auto mb-2 relative z-10 hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                      style={{ width: '174px', height: '179px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 shadow-xl">
              {/* Tabs */}
              <div className="grid grid-cols-2">
                <div className="bg-gradient-to-r from-gray-400 to-gray-500 py-4 px-6 text-center border-r border-gray-300 relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider relative z-10">ACERCA DE</span>
                </div>
                <div className="bg-gradient-to-r from-onpe-blue to-onpe-dark py-4 px-6 text-center relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-onpe-dark to-onpe-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider relative z-10">LO QUE DEBES SABER</span>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-10 border-r border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white transition-all duration-500">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-3 font-semibold">ACERCA DE</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-onpe-dark mb-4 leading-tight bg-gradient-to-r from-onpe-dark to-onpe-blue bg-clip-text text-transparent">
                    Conoce más sobre el proceso electoral 2026
                  </h3>
                  <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                    Estar informados es fundamental para una democracia saludable, ¿Quieres conocer más sobre este importante proceso electoral?
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-onpe-blue text-sm font-semibold hover:text-onpe-dark transition-all duration-300 group">
                    Saber más
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                <div className="p-8 md:p-10 bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50/30 hover:to-white transition-all duration-500">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-3 font-semibold">LO QUE DEBES SABER</p>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-tight">
                    Algunos puntos importantes sobre estas elecciones 2026
                  </h3>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    Las Elecciones Generales se realizarán el <strong className="text-onpe-blue">Domingo 12 de abril de 2026 de 7 a. m. a 5 p. m.</strong>
                  </p>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    Donde más de 27 millones de peruanos elegirán quienes tomaron los siguientes cargos:
                  </p>
                  <p className="text-sm text-gray-900 font-semibold bg-gradient-to-r from-onpe-blue to-onpe-dark bg-clip-text text-transparent">
                    Presidente, vicepresidentes, senadores, diputados y titulares del parlamento andino.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-onpe-dark text-center mb-16 animate-fade-in-up">
              Revisa nuestro material informativo
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-3">
                <div className="text-lg font-semibold text-onpe-dark mb-6 bg-gradient-to-r from-onpe-blue to-onpe-dark bg-clip-text text-transparent">Conoce más sobre las EG 2026</div>
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo({ id: video.id, title: video.title })}
                    className={`w-full text-left p-4 bg-white border-l-4 rounded-lg hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl ${
                      selectedVideo.id === video.id
                        ? 'border-onpe-blue bg-gradient-to-r from-blue-50 to-white shadow-lg scale-105'
                        : 'border-transparent hover:border-onpe-blue/50'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="font-medium text-gray-800 group-hover:text-onpe-blue transition-colors duration-300">{video.label}</div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-2 animate-fade-in">
                <h3 className="text-2xl font-bold text-onpe-dark mb-6 bg-gradient-to-r from-onpe-dark to-onpe-blue bg-clip-text text-transparent">
                  {selectedVideo.title}
                </h3>
                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-2xl hover:scale-105 transition-transform duration-500">
                  <iframe
                    key={selectedVideo.id}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl"
                  ></iframe>
                </div>
                <a href="https://www.youtube.com/@onpeprensa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-onpe-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-onpe-red/40 shadow-xl group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  Suscríbete a nuestro canal de YouTube
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Downloadable Materials */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-onpe-dark text-center mb-12 bg-gradient-to-r from-onpe-dark to-onpe-blue bg-clip-text text-transparent animate-fade-in-up">Materiales descargables</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Presidenciales', desc: 'Conoce más sobre el proceso electoral', delay: '0.1s' },
                { title: 'Congresales', desc: 'Conoce más sobre el proceso electoral', delay: '0.2s' },
                { title: 'Parlamento Andino', desc: 'Conoce más sobre el proceso electoral', delay: '0.3s' },
                { title: 'Voto digital', desc: 'Conoce todo acerca del voto digital', delay: '0.4s' }
              ].map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="border-2 border-gray-200 rounded-xl p-8 hover:border-onpe-blue transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl bg-white shadow-lg hover:shadow-2xl relative overflow-hidden"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-onpe-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex justify-center mb-6 relative z-10">
                    <div className="p-4 bg-gradient-to-br from-onpe-blue/10 to-onpe-dark/10 rounded-full group-hover:scale-110 transition-transform duration-500">
                      <img
                        src="https://ext.same-assets.com/3536222468/795822502.png"
                        alt="PDF Icon"
                        className="group-hover:scale-110 transition-transform duration-500"
                        style={{ width: '48px', height: '48px' }}
                      />
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-center mb-2 text-onpe-dark group-hover:text-onpe-blue transition-colors duration-300 relative z-10">{item.title}</h4>
                  <p className="text-gray-600 text-center text-sm relative z-10">{item.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-onpe-blue to-onpe-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 relative overflow-hidden bg-gradient-to-br from-onpe-blue via-onpe-dark to-onpe-blue animate-gradient" style={{ backgroundSize: '400% 400%' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-onpe-blue via-onpe-dark to-onpe-blue opacity-95"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white text-center md:text-left animate-fade-in-up">
                <p className="text-2xl font-bold mb-2 drop-shadow-lg">Boletín informativo</p>
                <p className="text-lg text-gray-100">Tu derecho es estar informado de primera mano.</p>
              </div>
              <a href="#" className="bg-white text-onpe-blue px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-2xl group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="flex items-center gap-2">
                  Suscríbete a la ONPE aquí
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
            }}></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-onpe-dark to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="animate-fade-in-up">
              <h4 className="font-bold text-xl mb-6 text-onpe-blue">Oficina central</h4>
              <p className="text-gray-300 mb-2 hover:text-white transition-colors duration-300">Jr. Washington 1894, Cercado de Lima</p>
              <p className="text-gray-300 hover:text-white transition-colors duration-300">Lunes a viernes de 8:30 a. m. a 5:00 p. m.</p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-bold text-xl mb-6 text-onpe-blue">Contáctanos:</h4>
              <p className="text-gray-300 mb-2 hover:text-white transition-colors duration-300 cursor-pointer">informes@onpe.gob.pe</p>
              <p className="text-gray-300 mb-2 hover:text-white transition-colors duration-300 cursor-pointer">(01)4170630</p>
              <p className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center gap-2">
                <img
                  src="https://ext.same-assets.com/3536222468/2484976572.svg"
                  alt="WhatsApp"
                  className="hover:scale-110 transition-transform duration-300"
                  style={{ width: '18px', height: '18px' }}
                />
                Whatsapp: 995 404 991
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h4 className="font-bold text-xl mb-6 text-onpe-blue">Síguenos:</h4>
              <div className="flex gap-4">
                {[
                  { src: 'https://ext.same-assets.com/3536222468/1577194571.svg', alt: 'Facebook' },
                  { src: 'https://ext.same-assets.com/3536222468/1505071152.svg', alt: 'Twitter/X' },
                  { src: 'https://ext.same-assets.com/3536222468/3416355903.svg', alt: 'TikTok' },
                  { src: 'https://ext.same-assets.com/3536222468/2136811271.svg', alt: 'Instagram' },
                  { src: 'https://ext.same-assets.com/3536222468/362232716.svg', alt: 'YouTube' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="p-3 bg-white/10 rounded-full hover:bg-onpe-blue hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-onpe-blue/40 group"
                  >
                    <img
                      src={social.src}
                      alt={social.alt}
                      className="group-hover:scale-110 transition-transform duration-300"
                      style={{ width: '24px', height: '24px' }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;


