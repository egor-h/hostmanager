package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.entity.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
}
