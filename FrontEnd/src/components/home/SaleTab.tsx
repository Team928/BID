import Hot from './sale/Hot';
import Live from './sale/Live';
import Soon from './sale/Soon';
import DeadLine from './sale/deadLine';

const SaleTab = () => {
  return (
    <div className="">
      {/* #TODO 추후 실제 데이터로 수정해야 함 */}
      <Hot />
      <DeadLine />
      <Soon />
      <Live />
    </div>
  );
};

export default SaleTab;
