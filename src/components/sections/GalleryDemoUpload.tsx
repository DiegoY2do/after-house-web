'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryDemoUpload() {
  const t = useTranslations('GalleryDemo');
  const locale = useLocale();

  // Estados para gestionar archivos, previsualizaciones, progreso y modal
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; isVideo: boolean }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_VIDEO_DURATION = 60; // segundos (1 minuto)

  // --- GESTIÓN DE DRAG & DROP ---
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  // --- GESTIÓN DE SELECCIÓN POR CLIC ---
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  // --- LÓGICA DE PROCESAMIENTO Y VALIDACIÓN ---
  
  // Obtener duración del video (Promise)
  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise(resolve => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = () => resolve(0);
    });
  };

  const processFiles = async (newFiles: File[]) => {
    for (const file of newFiles) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) continue;

      // Validar duración de video (Max 60s)
      if (file.type.startsWith('video/')) {
        const duration = await getVideoDuration(file);
        if (duration > MAX_VIDEO_DURATION) {
          alert(`El video no puede superar los ${MAX_VIDEO_DURATION} segundos.`);
          continue;
        }
      }

      // Añadir a la lista de archivos reales
      setFiles(prev => [...prev, file]);
      
      // Añadir a la lista de previsualizaciones
      setPreviews(prev => [
        ...prev, 
        { url: URL.createObjectURL(file), isVideo: file.type.startsWith('video/') }
      ]);
    }
  };

  // Eliminar un archivo específico de la lista antes de subir
  const removeFile = (indexToRemove: number) => {
    // Revocar la URL para liberar memoria
    URL.revokeObjectURL(previews[indexToRemove].url);
    
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setPreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // --- SUBIDA REAL AL SERVIDOR PHP (Hostinger) ---
  const handleUpload = () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    // Añadimos los archivos al FormData con el mismo nombre que espera tu PHP
    files.forEach(file => formData.append('images[]', file));

    const xhr = new XMLHttpRequest();
    // Apuntamos a la ruta donde estará tu PHP en Hostinger
    xhr.open('POST', 'https://afterhouse.com.mx/php/upload_images.php', true);

    // Rastrear el progreso real de la subida
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    };

    // Respuesta del servidor
    xhr.onload = function() {
      if (xhr.status === 200 && xhr.responseText.trim() === 'success') {
        // Todo salió perfecto
        setIsUploading(false);
        setShowSuccessModal(true);
        setFiles([]); 
        setPreviews(prevPreviews => {
          prevPreviews.forEach(p => URL.revokeObjectURL(p.url));
          return [];
        });
      } else {
        // El PHP devolvió un error
        setIsUploading(false);
        alert(locale === 'es' ? 'Hubo un error al procesar las imágenes en el servidor.' : 'Server processing error.');
      }
    };

    // Error de conexión
    xhr.onerror = () => {
      setIsUploading(false);
      alert(locale === 'es' ? 'Error de conexión. Revisa tu internet.' : 'Connection error.');
    };

    // Enviar la petición
    xhr.send(formData);
  };

  // Resetear estado para subir más fotos desde el modal
  const handleReset = () => {
    setShowSuccessModal(false);
    setProgress(0);
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen w-full bg-[#080808]">
      
      {/* 1. COLUMNA IZQUIERDA: Contexto Visual */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden pt-20 md:pt-0">
        
        {/* Imagen de fondo con escala animada */}
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
            alt="Upload Demo"
            fill
            className="object-cover grayscale opacity-40"
            priority
          />
        </motion.div>
        
        {/* Degradado para fundir a negro y mejorar lectura */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent md:bg-gradient-to-r" />

        {/* Textos Informativos */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 w-full max-w-md"
        >
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-4">
            {t('upTitle1')} <br />
            <span className="italic text-after-gold">{t('upTitle2')}</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base font-light font-inter leading-relaxed">
            {t('upDesc')}
          </p>
        </motion.div>
      </div>

      {/* 2. COLUMNA DERECHA: Zona Interactiva de Carga */}
      <div className="w-full md:w-1/2 bg-[#080808] flex flex-col justify-center items-center p-6 md:p-16 border-t md:border-t-0 md:border-l border-white/10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Zona Drag & Drop / Clic */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer relative group ${isDragging || files.length > 0 ? 'border-after-gold bg-after-gold/5' : 'border-white/20 hover:border-after-gold bg-[#080808]/30'}`}
          >
            {/* Input de archivo oculto */}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileInput}
              multiple 
              accept="image/*,video/*" 
              className="hidden" 
            />
            
            <div className="pointer-events-none flex flex-col items-center">
              {/* Icono + Plus */}
              <svg className={`w-8 h-8 mb-4 transition-colors ${isDragging || files.length > 0 ? 'text-after-gold' : 'text-white/40 group-hover:text-after-gold'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
              </svg>
              
              {/* Título de estado */}
              <p className={`font-inter text-sm tracking-[0.2em] uppercase mb-1 font-medium ${files.length > 0 ? 'text-after-gold' : 'text-white/80'}`}>
                {files.length > 0 ? `${files.length} archivo(s) listo(s)` : t('upSelect')}
              </p>
              
              {/* Subtítulo descriptivo (Ocultar si hay archivos) */}
              {files.length === 0 && (
                <p className="text-white/40 font-inter text-xs font-light tracking-wide">
                  {t('upDrag')}
                </p>
              )}
            </div>
          </div>

          {/* Grid de Previsualizaciones (Con botón X SIEMPRE VISIBLE) */}
          {previews.length > 0 && !isUploading && (
            <div className="mt-6 grid grid-cols-4 gap-3">
              {previews.map((file, idx) => (
                <div key={idx} className="relative aspect-square border border-white/10 overflow-hidden rounded-sm bg-white/5">
                  {file.isVideo ? (
                    <>
                      <video src={file.url} className="w-full h-full object-cover opacity-70" muted />
                      <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </>
                  ) : (
                    <Image src={file.url} alt={`preview-${idx}`} fill className="object-cover" />
                  )}
                  
                  {/* Botón de borrar (X) */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                    className="absolute top-1 right-1 bg-black/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-after-gold transition-colors z-10 shadow-md"
                    title="Eliminar archivo"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sección de Progreso de Subida */}
          {isUploading && (
            <div className="mt-6 border border-white/10 bg-white/[0.02] p-4 rounded-sm">
              <div className="flex justify-between text-[10px] tracking-[0.2em] text-white/40 mb-2 uppercase font-inter font-medium">
                <span>{t('upProgress')}</span>
                <span className="text-after-gold">{progress}%</span>
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-after-gold h-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          )}

          {/* Botones de Acción Finales */}
          <div className="mt-8 flex flex-col gap-4 relative">
            <button 
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading} 
              className="w-full bg-white/10 text-white/50 py-4 uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold hover:bg-after-gold hover:text-black transition-colors duration-300 disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white/50 disabled:cursor-not-allowed font-inter border border-white/5 rounded-sm"
            >
              {isUploading ? 'PROCESANDO...' : t('upBtnSubir')}
            </button>
            <Link 
              href={`/${locale}/gallery?evento=invitados&t=${Date.now()}`}
              className="w-full text-center text-white/30 text-[9px] md:text-[10px] uppercase tracking-[0.3em] hover:text-after-gold transition-colors font-inter py-2 border-b border-transparent hover:border-after-gold/30 pb-1"
            >
              {t('btnGaleria')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 3. MODAL DE ÉXITO (AnimatePresence para animar salida) */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-[#080808] border border-white/10 p-8 md:p-12 max-w-sm w-full mx-4 text-center rounded-sm shadow-2xl relative"
            >
              {/* Icono Check de Éxito */}
              <div className="w-20 h-20 bg-after-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-after-gold border border-after-gold/20">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              {/* Textos del Modal */}
              <h2 className="font-playfair text-2xl md:text-3xl text-white mb-3 italic">
                {t('modalSuccessTitle')}
              </h2>
              <p className="text-white/40 text-sm font-light mb-8 leading-relaxed font-inter">
                {t('modalSuccessDesc')}
              </p>

              {/* Acciones del Modal */}
              <div className="flex flex-col gap-4">
                <Link 
                  href={`/${locale}/gallery?evento=invitados&t=${Date.now()}`}
                  className="bg-after-gold text-[#080808] py-4 px-6 hover:bg-white transition duration-300 text-[10px] tracking-[0.3em] uppercase font-bold text-center w-full font-inter rounded-sm shadow-lg"
                >
                  {t('btnGaleria')}
                </Link>
                <button 
                  onClick={handleReset}
                  className="text-white/40 hover:text-after-gold py-2 text-[9px] tracking-[0.3em] uppercase transition-colors font-inter font-medium border-b border-transparent hover:border-after-gold/20 pb-1"
                >
                  {t('btnSubirMas')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}