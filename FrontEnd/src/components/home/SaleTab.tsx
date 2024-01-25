import Hot from './sale/Hot';
import Live from './sale/Live';
import SaleSoon from './sale/SaleSoon';
import DeadLine from './sale/DeadLine';

const SaleTab = () => {
  return (
    <div className="">
      {/* #TODO 추후 실제 데이터로 수정해야 함 */}
      <Hot />
      <DeadLine />
      <SaleSoon />
      <Live />
    </div>
  );
};

export default SaleTab;
