package com.qzp.bid.domain.deal.mapper;

import com.qzp.bid.domain.deal.dto.DealRes;
import com.qzp.bid.domain.deal.entity.Deal;
import com.qzp.bid.domain.deal.entity.Image;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DealMapper {

    @Named("images")
    static List<String> mapImages(List<Image> images) {
        return images.stream()
            .map(Image::getImagePath)
            .collect(Collectors.toList());
    }

    @Mapping(source = "writer.nickname", target = "writer")
    @Mapping(source = "images", target = "images", qualifiedByName = "images")
    DealRes toDealRes(Deal deal);
}
