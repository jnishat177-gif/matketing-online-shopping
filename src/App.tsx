/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, Suspense, lazy, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MarketingBanner } from './components/MarketingBanner';
import { Header } from './components/Header';
import { RoleSwitcher } from './components/RoleSwitcher';
import { CustomerStorefront } from './components/CustomerStorefront';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { DeliveryDashboard } from './components/DeliveryDashboard';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { DownloadProjectModal } from './components/DownloadProjectModal';
import { AlertTriangle, RotateCcw, ShieldCheck } from 'lucide-react';

const ProjectHub = lazy(() =>
  import('./components/ProjectHub').then((mod) => ({ default: mod.ProjectHub }))
);
const ThesisReportView = lazy(() =>
  import('./components/ThesisReportView').then((mod) => ({ default: mod.ThesisReportView }))
);

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class AppErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Unexpected rendering error occurred.',
    };
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // Ignore storage access restrictions
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-slate-900">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-extrabold text-slate-900">Something went wrong</h1>
            <p className="text-xs text-slate-500 leading-relaxed break-words">
              {this.state.message}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Reset & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainLayout: React.FC = () => {
  const { role, setRole } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="no-print">
        {/* 1. Real-Time Marketing Flash Sale Banner Ticker */}
        <MarketingBanner />

        {/* 2. Top Bar Navigation Contract */}
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        />

        {/* 3. Multi-Role Switcher Bar */}
        <RoleSwitcher />
      </div>

      {/* 4. Active Role View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        <Suspense
          fallback={
            <div className="py-16 text-center text-xs font-semibold text-slate-500">
              Loading module...
            </div>
          }
        >
          {role === 'customer' && <CustomerStorefront searchQuery={searchQuery} />}
          {role === 'seller' && <SellerDashboard />}
          {role === 'admin' && <AdminDashboard />}
          {role === 'delivery' && <DeliveryDashboard />}
          {role === 'cse_hub' && <ProjectHub />}
          {role === 'thesis_report' && <ThesisReportView />}
        </Suspense>
      </main>

      {/* 5. Drawers and Modals */}
      <CartDrawer />
      <PaymentModal />
      <OrderTrackingModal />
      <DownloadProjectModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />

      {/* 6. Professional Footer */}
      <footer className="no-print bg-white border-t border-slate-200 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-emerald-800 text-amber-300 font-black flex items-center justify-center text-xs">
                  M
                </span>
                <span className="font-extrabold text-slate-900 text-sm">MarketingHub Online Platform</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Real-Time Marketing & Multi-Vendor E-Commerce Platform for Grocery, Cosmetics, Furniture, Electronics, Ladies Fashion & Bangladeshi Crafts.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Marketplace Modules</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><button onClick={() => setRole('customer')} className="hover:text-emerald-800 cursor-pointer">Customer Storefront</button></li>
                <li><button onClick={() => setRole('seller')} className="hover:text-emerald-800 cursor-pointer">Seller Merchant Portal</button></li>
                <li><button onClick={() => setRole('admin')} className="hover:text-emerald-800 cursor-pointer">Super Admin Console</button></li>
                <li><button onClick={() => setRole('delivery')} className="hover:text-emerald-800 cursor-pointer">Courier Logistics Hub</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Payment Partners</h5>
              <div className="space-y-1.5 text-[11px]">
                <p className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#D12053]" /> bKash Merchant Checkout API
                </p>
                <p className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#F7941D]" /> Nagad Online Gateway
                </p>
                <p className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-700" /> Cash on Delivery (COD)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Academic Architecture</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Designed as a complete CSE Final Year Project featuring 20 relational database tables, Django Channels WebSockets, and DRF APIs.
              </p>
              <button
                onClick={() => setRole('cse_hub')}
                className="text-indigo-800 font-bold hover:underline cursor-pointer text-[11px] block pt-1"
              >
                Open Project Defense Hub →
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} MarketingHub Online Platform · Built for CSE Final Year Project.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>TLS 1.3 256-bit Encrypted Payments</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppErrorBoundary>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </AppErrorBoundary>
  );
}
