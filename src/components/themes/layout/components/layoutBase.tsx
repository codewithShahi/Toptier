'use client'
import { LayoutContext } from '@hooks/useLayout'
import type { LayoutContextProps } from '@hooks/useLayout'
import type { CommonProps } from '@src/@types/common'
import { useAppSelector } from "@lib/redux/store";
import AgencyDisabled from '@components/core/agencyDisabled/agencyDisabled';
import LoadingSpinner from '@components/core/Spinner';

type LayoutBaseProps = CommonProps & LayoutContextProps

const LayoutBase = (props: LayoutBaseProps) => {
  const { children, className, type } = props;

  const { data, loading, error } = useAppSelector((state) => state.appData);
  const appDataStatus = data?.app


  return (
    <LayoutContext.Provider value={{ type }}>
      {loading ? (
        // ⏳ Show loading spinner while fetching
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
          <LoadingSpinner size={26} />
        </div>
      ) : error ? (
        // ❌ Show disabled state if API errored
        // <AgencyDisabled  />
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Error Loading Application</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">There was an error loading the application data. Please try again later.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Error Details: Failed to parse URL </p>
        </div>
      ) : appDataStatus ? (
        // ✅ Agency active → show app
        <main className={className}>{children}</main>
      ) : (
        // 🚫 Agency inactive → disabled state
        <AgencyDisabled />
      )}
       {/* <main className={className}>{children}</main> */}
    </LayoutContext.Provider>
  );
};

export default LayoutBase;
