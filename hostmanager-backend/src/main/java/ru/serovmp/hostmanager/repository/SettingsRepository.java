package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.entity.Setting;

import java.util.Set;

@Repository
public interface SettingsRepository extends JpaRepository<Setting, Long> {
    @Query(value = "SELECT * FROM settings WHERE user_id = :userId", nativeQuery = true)
    Set<Setting> findByUserId(@Param("userId") long userId);
}
