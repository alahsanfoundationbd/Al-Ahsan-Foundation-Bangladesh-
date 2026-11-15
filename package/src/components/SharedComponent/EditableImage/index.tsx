'use client';

import React, { useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { useSite } from '@/app/context/SiteContext';
import { Icon } from '@iconify/react/dist/iconify.js';

interface EditableImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  className?: string;
  containerClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const { isAdmin, images, uploadAndSetImage } = useSite();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Check if this image has a dynamic custom upload
  const activeSrc = images[src] || src;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadAndSetImage(src, file);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative group ${containerClassName}`}>
      <Image
        {...props}
        src={activeSrc}
        alt={alt}
        className={`${className} transition-opacity duration-200 ${uploading ? 'opacity-40' : ''}`}
      />

      {isAdmin && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="ছবি পরিবর্তন করতে ট্যাপ করুন (অ্যাডমিন মোড)"
            className="absolute top-2 right-2 z-30 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-emerald-600/90 hover:bg-emerald-700 backdrop-blur-sm rounded-full shadow-lg transition-transform transform group-hover:scale-105"
          >
            <Icon icon="ion:camera-outline" className="text-sm" />
            <span>ছবি পরিবর্তন</span>
          </button>
        </>
      )}

      {uploading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 text-white text-xs font-semibold rounded">
          <Icon icon="ion:load-c" className="animate-spin text-lg mr-1.5" />
          আপলোড হচ্ছে...
        </div>
      )}
    </div>
  );
};
