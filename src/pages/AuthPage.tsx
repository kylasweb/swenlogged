
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const AuthPage = () => {
  const { session, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-4">
             <div className="flex justify-center space-x-2">
              <Skeleton className="h-10 w-1/2 rounded-md" />
              <Skeleton className="h-10 w-1/2 rounded-md" />
            </div>
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (session) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
