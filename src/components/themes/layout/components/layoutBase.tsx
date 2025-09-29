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


  return (
    <LayoutContext.Provider value={{ type }}>

       <main className={className}>{children}</main>
    </LayoutContext.Provider>
  );
};

export default LayoutBase;
