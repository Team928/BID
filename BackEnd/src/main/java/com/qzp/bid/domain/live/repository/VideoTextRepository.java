package com.qzp.bid.domain.live.repository;

import com.qzp.bid.domain.live.entity.VideoText;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoTextRepository extends JpaRepository<VideoText, Long> {
    
    Optional<VideoText> findByVideoId(Long videoId);
}
