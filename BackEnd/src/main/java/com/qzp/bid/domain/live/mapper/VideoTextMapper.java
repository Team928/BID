package com.qzp.bid.domain.live.mapper;

import com.qzp.bid.domain.live.dto.VideoTextRes;
import com.qzp.bid.domain.live.entity.VideoText;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VideoTextMapper {

    @Mapping(source = "video.id", target = "videoId")
    VideoTextRes videoTextToVideoTextRes(VideoText videoText);

}
