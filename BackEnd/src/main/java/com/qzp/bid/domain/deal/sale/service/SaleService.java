package com.qzp.bid.domain.deal.sale.service;

import com.qzp.bid.domain.deal.dto.SearchParam;
import com.qzp.bid.domain.deal.sale.dto.SaleListPage;
import com.qzp.bid.domain.deal.sale.dto.SaleReq;
import com.qzp.bid.domain.deal.sale.dto.SaleRes;
import com.qzp.bid.domain.deal.sale.dto.SaleUpdateReq;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface SaleService {

    void createSale(SaleReq saleReq, List<MultipartFile> photos);

    SaleRes getSale(Long saleId);

    void updateSale(Long saleId, SaleUpdateReq saleUpdateReq);

    void deleteSale(Long saleId);

    SaleListPage getSales(SearchParam searchParam);
}
