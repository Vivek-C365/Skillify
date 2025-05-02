import React from 'react';

export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16 mb-2" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  );
};

export const CourseCardSkeleton = () => {
  return (
    <div className="flex items-center p-4">
      <Skeleton className="w-6 h-6 mr-4" />
      <Skeleton className="w-12 h-12 rounded mr-3" />
      <div className="flex-1">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="text-right">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};

export const InstructorCardSkeleton = () => {
  return (
    <div className="flex items-center p-4">
      <Skeleton className="w-6 h-6 mr-4" />
      <Skeleton className="w-12 h-12 rounded-full mr-3" />
      <div className="flex-1">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="text-right">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}; 