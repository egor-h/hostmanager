package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.serovmp.hostmanager.entity.Subnet;

public interface SubnetsRepository extends JpaRepository<Subnet, Long> {

}
