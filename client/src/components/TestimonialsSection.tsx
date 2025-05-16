import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaVolumeMute, FaVolumeUp, FaPlay, FaPause } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Depoimentos em vídeo no formato story
const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    videoUrl: "https://placehold.co/600x800/9C4D8F/FFF.mp4", // URL do vídeo placeholder
    name: "Ana Carolina",
    service: "Mudança Residencial",
    thumbnail: "https://placehold.co/600x800/9C4D8F/FFF.png" // Thumbnail do vídeo
  },
  {
    id: 2,
    videoUrl: "https://placehold.co/600x800/FF5500/FFF.mp4",
    name: "Fernanda Oliveira",
    service: "Mudança Comercial",
    thumbnail: "https://placehold.co/600x800/FF5500/FFF.png"
  },
  {
    id: 3,
    videoUrl: "https://placehold.co/600x800/9C4D8F/FFF.mp4",
    name: "Juliana Santos",
    service: "Mudança Longa Distância",
    thumbnail: "https://placehold.co/600x800/9C4D8F/FFF.png"
  },
  {
    id: 4,
    videoUrl: "https://placehold.co/600x800/FF5500/FFF.mp4",
    name: "Mariana Costa",
    service: "Mudança Residencial",
    thumbnail: "https://placehold.co/600x800/FF5500/FFF.png"
  },
  {
    id: 5,
    videoUrl: "https://placehold.co/600x800/9C4D8F/FFF.mp4",
    name: "Patrícia Mendes",
    service: "Mudança Comercial",
    thumbnail: "https://placehold.co/600x800/9C4D8F/FFF.png"
  }
];

// Interface para definir a estrutura de cada vídeo depoimento
interface VideoTestimonial {
  id: number;
  videoUrl: string;
  name: string;
  service: string;
  thumbnail: string;
}

// Props para o componente VideoStory
interface VideoStoryProps {
  video: VideoTestimonial;
  isActive: boolean;
  onClick: () => void;
}

// Componente para exibir um vídeo individual no formato story
const VideoStory: React.FC<VideoStoryProps> = ({ video, isActive, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Gerenciar reprodução do vídeo quando ele se torna ativo
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        // Tentar reproduzir o vídeo quando se torna ativo
        const playPromise = videoRef.current.play();
        
        // Tratamento para diferentes navegadores
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              // Auto-play foi bloqueado pelo navegador
              setIsPlaying(false);
            });
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  // Alternar entre play/pause
  const togglePlayPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error: Error) => {
          // Em caso de erro, não fazemos nada pois o estado será atualizado pelo onPlay/onPause
          console.log("Erro ao tentar reproduzir vídeo:", error.message);
        });
      }
    }
  };

  // Alternar áudio
  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Interface para adicionar propriedades específicas do navegador
  interface HTMLVideoElementWithFullscreen extends HTMLVideoElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }

  interface DocumentWithFullscreen extends Document {
    webkitFullscreenElement?: Element;
    msFullscreenElement?: Element;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  }

  // Alternar tela cheia
  const toggleFullscreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const videoElement = videoRef.current as HTMLVideoElementWithFullscreen;
      const doc = document as DocumentWithFullscreen;
      
      if (!isFullscreen) {
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
          videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
          videoElement.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    }
  };

  // Atualizar estado de tela cheia
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as DocumentWithFullscreen;
      setIsFullscreen(
        !!doc.fullscreenElement || 
        !!doc.webkitFullscreenElement || 
        !!doc.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      className={`video-story-container ${isActive ? 'scale-100' : 'scale-95 opacity-70'} 
                  transition-all duration-300 cursor-pointer relative rounded-lg overflow-hidden
                  aspect-[9/16] w-full max-h-[70vh]`}
      onClick={onClick}
    >
      {/* Thumbnail (exibida enquanto o vídeo não é carregado) */}
      <div className="absolute inset-0 bg-cover bg-center z-0" 
           style={{ backgroundImage: `url(${video.thumbnail})` }}>
      </div>
      
      {/* Vídeo */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={video.videoUrl}
        muted={isMuted}
        playsInline
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Informações do cliente */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h4 className="font-bold text-lg">{video.name}</h4>
        <p className="text-sm opacity-90">{video.service}</p>
      </div>
      
      {/* Controles */}
      {isActive && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-black/20 text-white hover:bg-black/40 rounded-full h-8 w-8"
            onClick={togglePlayPause}
          >
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-black/20 text-white hover:bg-black/40 rounded-full h-8 w-8"
            onClick={toggleMute}
          >
            {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-black/20 text-white hover:bg-black/40 rounded-full h-8 w-8"
            onClick={toggleFullscreen}
          >
            <FaExpand size={14} />
          </Button>
        </div>
      )}
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Ajustar quantidade de vídeos visíveis com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Navegar para o vídeo anterior
  const prevVideo = () => {
    setActiveIndex((prev) => 
      prev === 0 ? videoTestimonials.length - 1 : prev - 1
    );
  };

  // Navegar para o próximo vídeo
  const nextVideo = () => {
    setActiveIndex((prev) => 
      prev === videoTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  // Obter os vídeos visíveis (no máximo 3)
  const getVisibleVideos = () => {
    // Certificar que temos vídeos suficientes nos dois lados para transição suave
    const videos = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % videoTestimonials.length;
      videos.push(videoTestimonials[index]);
    }
    return videos;
  };

  return (
    <section id="depoimentos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-[#343A40] max-w-2xl mx-auto">
            Assista depoimentos em vídeo de clientes que confiaram na Papaléguas Mudanças para realizar seus serviços.
          </p>
        </div>
        
        <div className="testimonial-video-carousel relative">
          {/* Navegação */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 z-10 md:-translate-x-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevVideo}
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
            >
              <FaChevronLeft />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 z-10 md:translate-x-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextVideo}
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
            >
              <FaChevronRight />
            </Button>
          </div>
          
          {/* Container de vídeos */}
          <div className="relative px-10">
            <div className={`grid grid-cols-1 ${
                visibleCount === 1 ? 'md:grid-cols-1' : 
                visibleCount === 2 ? 'md:grid-cols-2' : 
                'md:grid-cols-2 lg:grid-cols-3'
              } gap-4 md:gap-6`}>
              {getVisibleVideos().map((video, index) => (
                <VideoStory 
                  key={video.id} 
                  video={video} 
                  isActive={index === 0}
                  onClick={() => setActiveIndex((activeIndex + index) % videoTestimonials.length)}
                />
              ))}
            </div>
          </div>
          
          {/* Indicadores (quantos vídeos existem) */}
          <div className="flex justify-center mt-8">
            {videoTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                  // Verificar se este índice está visível atualmente
                  Array.from({ length: visibleCount }, (_, i) => 
                    (activeIndex + i) % videoTestimonials.length
                  ).includes(index)
                    ? "bg-primary" 
                    : "bg-[#E9ECEF]"
                }`}
                aria-label={`Depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
