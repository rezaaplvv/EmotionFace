"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function WebcamView({ onEmotionDetected }) {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // 1. Load Models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        console.log("⏳ Memuat model...");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        console.log("✅ Model Siap!");
        setModelsLoaded(true);
      } catch (error) {
        console.error("❌ Gagal load model:", error);
      }
    };
    loadModels();
  }, []);

  // 2. Start Camera dengan FIX IPHONE
  useEffect(() => {
    if (modelsLoaded) {
      navigator.mediaDevices
        .getUserMedia({ 
          video: { 
            facingMode: "user", // Memastikan kamera depan
          } 
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            
            // --- FIX IPHONE: Paksa Play ---
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch(e => console.error("Play error:", e));
            };
            
            setIsReady(true);
          }
        })
        .catch((err) => {
            console.error("❌ Gagal kamera:", err);
            // Fallback jika facingMode user gagal, coba default
            if(err.name === "OverconstrainedError") {
                 navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                    if(videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.onloadedmetadata = () => {
                           videoRef.current.play();
                        }
                        setIsReady(true);
                    }
                 })
            }
        });
    }
  }, [modelsLoaded]);

  // 3. Loop Deteksi
  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4 && !videoRef.current.paused && !videoRef.current.ended) {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const maxExpression = Object.keys(expressions).reduce((a, b) => 
            expressions[a] > expressions[b] ? a : b
          );

          if (onEmotionDetected) {
            onEmotionDetected(maxExpression);
          }
        }
      }
    }, 500); 
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-8 border-4 border-white/20 rounded-2xl overflow-hidden shadow-2xl">
      {/* Loading Overlay */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20 text-white">
          <p className="animate-pulse">
            {modelsLoaded ? "📷 Menyiapkan Kamera..." : "🧠 Memuat Otak AI..."}
          </p>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline // WAJIB ADA UNTUK IPHONE
        webkit-playsinline="true" // DUKUNGAN iOS LAMA
        onPlay={handleVideoOnPlay}
        width="720"
        height="560"
        className="w-full h-auto transform scale-x-[-1]" 
      />
    </div>
  );
}