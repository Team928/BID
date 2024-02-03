import Modal from "@/components/@common/Modal"
const ConfirmModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
    
    return (
        <Modal width="300px" height="auto" title="" onClose={onClose}>
            <div className="text-center px-4 pb-6">
                <p className="font-bold text-lg">
                    거래를 확정하시겠습니까?
                </p>
                <p className="text-BID_SUB_GRAY py-4">
                    거래 확정하시면 포인트 결제 및 지급이 진행됩니다.
                </p>
                <div className="flex justify-center space-x-4 py-2">
                    <button className="border border-BID_MAIN px-6 py-2 font-bold text-BID_MAIN rounded-lg" onClick={onConfirm}>확인</button>
                    <button className="text-BID_SUB_GRAY border border-BID_SUB_GRAY px-6 py-2 font-bold rounded-lg" onClick={onClose}>취소</button>
                </div>
            </div>
        </Modal>
    )
    
}


export default ConfirmModal