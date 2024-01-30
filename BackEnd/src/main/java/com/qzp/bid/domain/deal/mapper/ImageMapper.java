package com.qzp.bid.domain.deal.mapper;

import com.qzp.bid.domain.deal.dto.ImageDto;
import com.qzp.bid.domain.deal.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageMapper {

    Image ImageDtoToImage(ImageDto imageDto);
}
