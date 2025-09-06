
import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { userRole, loading, session } = useAuth();

  if (loading) {
    return (
       <div className="flex flex-col space-y-3 p-10">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!session || userRole !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
