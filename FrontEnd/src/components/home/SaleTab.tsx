import Hot from './sale/Hot';
import Live from './sale/Live';
import SaleSoon from './sale/SaleSoon';
import DeadLine from './sale/DeadLine';

const SaleTab = () => {
  return (
    <div>
      <Hot />
      <DeadLine />
      <SaleSoon />
      <Live />
    </div>
  );
};

export default SaleTab;
