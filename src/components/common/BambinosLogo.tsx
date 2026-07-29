import React from 'react';

interface BambinosLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BambinosLogo: React.FC<BambinosLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md'
}) => {
  const heights = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Ligne modifiée avec votre chemin d'image à la place du png */}
      <img 
        src="/uploads/images/favicon.ico" 
        alt="Bambinos Logo" 
        className={`${heights[size]} w-auto shrink-0`} 
      />
    </div>
  );
};
